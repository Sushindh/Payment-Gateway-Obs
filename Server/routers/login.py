from fastapi import APIRouter, HTTPException
from databases import user_collect  
from schemas import LoginRequest

router = APIRouter()

@router.post("/login")
async def login_user(login: LoginRequest):
    user = await user_collect.find_one({"email": login.email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # NOTE: Passwords should be hashed in production — compare hash instead
    if user["password"] != login.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "user_id": str(user["_id"])}
