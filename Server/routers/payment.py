from fastapi import APIRouter, HTTPException
from schemas import Payment
from databases import payment_collect
from datetime import datetime
from telemetry import tracer, meter
import logging
from pytz import timezone

router = APIRouter()

payment_error_counter = meter.create_counter(
    name="app_payment_failures_count",
    description="Counts number of failed payments",
    unit="1"
)

@router.post("/payment")
async def payment(Pay: Payment):
    logging.info("payment endpoint is called %s", Pay.amount)

    card_number = str(Pay.cardNumber)
    if len(card_number) != 16 or not card_number.isdigit():
        logging.error("Payment storage failed: Improper CardNumber")
        payment_error_counter.add(1, {"endpoint": "payment", "reason": "Improper CardNumber"})
        raise HTTPException(status_code=410, detail="Card number must be exactly 16 digits and numeric")

    cvv = str(Pay.cvv)
    if len(cvv) != 3 or not cvv.isdigit():
        logging.error("Payment storage failed: Improper CVV")
        payment_error_counter.add(1, {"endpoint": "payment", "reason": "Improper CVV"})
        raise HTTPException(status_code=411, detail="CVV must be exactly 3 digits and numeric")

    try:
        pay = Pay.model_dump()

        with tracer.start_as_current_span("process_payment") as span:
            span.set_attribute("user_id", pay.get("user_id", "unknown"))
            span.set_attribute("amount", pay.get("amount", 0))

        pay["status"] = "success"
        india_tz = timezone("Asia/Kolkata")
        # pay["timestamp"] = datetime.now(india_tz).strftime("%Y-%m-%d %A, %H:%M")
        # Add year and month directly into the timestamp string
        pay["timestamp"] = datetime.now(india_tz).strftime("%d-%m-%Y %A, %I:%M %p")

        result = await payment_collect.insert_one(pay)

        if result.inserted_id:
            return {"Msg": "Payment stored in the DB"}
        else:
            logging.error("Payment storage failed for: %s", pay)
            payment_error_counter.add(1, {"endpoint": "payment", "reason": "insert_failed"})
            raise HTTPException(status_code=500, detail="Failed to store payment")

    except Exception as e:
        logging.exception("Exception occurred while storing payment: %s", e)
        payment_error_counter.add(1, {"endpoint": "payment", "reason": "exception"})
        raise HTTPException(status_code=500, detail="Internal server error")