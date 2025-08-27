import os
from motor.motor_asyncio import AsyncIOMotorClient

# Configuração do MongoDB
MONGO_USER = os.getenv("MONGO_APP_USER", "apiuser")
MONGO_PASSWORD = os.getenv("MONGO_APP_PASSWORD", "api123321")
MONGO_DB = os.getenv("MONGO_INITDB_DATABASE", "NetProactiveAXDB")
MONGO_HOST = "mongodb"  # nome do serviço do docker-compose
MONGO_PORT = 27017       # porta interna do container

# URI de conexão
MONGO_URI = f"mongodb://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}?authSource=admin"

# Cliente Mongo async
client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB]
