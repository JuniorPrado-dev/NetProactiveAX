import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError

# Configuração do logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuração do MongoDB
MONGO_USER = os.getenv("MONGO_APP_USER", "apiuser")
MONGO_PASSWORD = os.getenv("MONGO_APP_PASSWORD", "api123321")
MONGO_DB = os.getenv("MONGO_INITDB_DATABASE", "NetProactiveAXDB")
MONGO_HOST = "mongodb"  # nome do serviço do docker-compose
MONGO_PORT = 27017

# URI de conexão
MONGO_URI = (
    f"mongodb://{MONGO_USER}:{MONGO_PASSWORD}"
    f"@{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}?authSource=admin"
)

# Cliente Mongo async
client = AsyncIOMotorClient(MONGO_URI)
db = client[MONGO_DB]


async def check_mongo_connection():
    """Verifica se a conexão com o MongoDB está ativa"""
    try:
        await client.admin.command("ping")
        logger.info("✅ Conectado ao MongoDB com sucesso!")
        return True
    except PyMongoError as e:
        logger.error(f"❌ Erro ao conectar ao MongoDB: {e}")
        return False
