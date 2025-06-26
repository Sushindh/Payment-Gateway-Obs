from fastapi import APIRouter,HTTPException
from databases import payment_collect
import logging
from telemetry import tracer, meter
router = APIRouter()

mongo_error_fetch = meter.create_counter(
    name = "app_data_fetch_error",
    description = "web not getting data from the database",
    unit = "1"
)

@router.get("/transactions")
async def transactions():
    with tracer.start_as_current_span("fetch_transactions"):
        try:
            data = await payment_collect.find().to_list(length=100)
        except Exception as e:
            logging.error("Error fetching transactions from MongoDB: %s", e)
            mongo_error_fetch.add(3,{"endpoint":"transaction","reason":"Data not fetched from database"})
            raise HTTPException(status_code=402, detail="Not fetched from mongoDB")

    res = []
    for i in data:
        res.append({
            "id" : str(i.get("_id")),
            "amount" : i.get("amount"),
            "status" : i.get("status","success"),
            "timestamp" : i.get("timestamp")    
        })
        

    return res