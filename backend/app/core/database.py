###
from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_USER = os.getenv("MONGO_APP_USER", "appuser")
MONGO_PASSWORD = os.getenv("MONGO_APP_PASSWORD", "senhaApp")
MONGO_DB = os.getenv("MONGO_INIT_DB", "NetProactiveAX")
MONGO_HOST = os.getenv("MONGO_HOST", "mongodb")  # nome do serviço do docker-compose
MONGO_PORT = int(os.getenv("MONGO_PORT", 27017))

MONGO_URI = f"mongodb://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}?authSource=admin"

client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB]
