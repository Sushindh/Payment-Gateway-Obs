from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers import payment, transactions, checkMongo, admin, signup, login
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

app = FastAPI()
FastAPIInstrumentor().instrument_app(app) 
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173"], # react front end
    allow_credentials = True, # authentication, cookies, header
    allow_methods = ["*"], #GET, PUT, POST, DELETE
    allow_headers = ["*"]
)

@app.get("/")
def read_root():
    try:
        # Example backend check, e.g., database connection or health check
        # Replace with actual backend check logic as needed
        # For demonstration, let's assume a function check_backend() returns True if OK
        if not checkMongo.check_Mongo():
            raise Exception("Backend service unavailable")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    return {"msg": "Payment API is up and running"}

app.include_router(admin.router)
app.include_router(signup.router)
app.include_router(login.router)
app.include_router(payment.router)
app.include_router(transactions.router)
app.include_router(checkMongo.router)
