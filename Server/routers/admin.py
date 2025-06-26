from fastapi import APIRouter, HTTPException
import logging
from telemetry import tracer,meter
router = APIRouter()

# Create a counter for error simulations
error_counter = meter.create_counter(
    name="app_error_simulation_count",
    description="Counts the number of error simulations triggered",
    unit="1"
)


@router.post("/admin")
async def admin():
    with tracer.start_as_current_span("admin_error") as span :  
        span.set_attribute("error.type", "simulated")
        span.set_attribute("service.name", "fastapi-admin")      
        logging.error("Simulated error for observability")
        error_counter.add(2, {"error_type": "simulated", "service": "fastapi-admin"})
        raise HTTPException(status_code=403, detail="Simulated failure")

    
@router.get("/admin/health")
async def health_check():
    return {"status": "ok", "db": "ok", "payments": "ok"}
