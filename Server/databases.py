from motor.motor_asyncio import AsyncIOMotorClient

MongoDB = ""
client = AsyncIOMotorClient(MongoDB)
db = client['payment_db']
user_collect = db["users"]  
payment_collect = db['payments']
