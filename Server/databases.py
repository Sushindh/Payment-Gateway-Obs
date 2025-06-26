from motor.motor_asyncio import AsyncIOMotorClient

MongoDB = "mongodb+srv://da23bce1513:SbSjXKaYgNTHMjyj@cluster0.kymsbix.mongodb.net/"
client = AsyncIOMotorClient(MongoDB)
db = client['payment_db']
user_collect = db["users"]  
payment_collect = db['payments']