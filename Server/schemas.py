from pydantic import BaseModel, EmailStr
from datetime import datetime

class Payment(BaseModel):
    cardholderName: str
    cardNumber: str
    expiryDate: str
    cvv: str
    amount: float

class Transaction(BaseModel):
    id : str
    amount : float
    status : str
    timestamp : datetime 

class Signup(BaseModel):
    name : str
    email : EmailStr
    password : str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str