from app.core.database import db
from fastapi import HTTPException
from fastapi.encoders import jsonable_encoder


async def get_users():
    try:
        cursor = db["user"].find({})
        users = [doc async for doc in cursor]

        # Converte ObjectId e outros tipos não serializáveis
        return jsonable_encoder(users)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar usuários: {str(e)}")