import asyncio
import uvicorn
from fastapi import FastAPI
from app.constants.metadata import tags_metadata
from app.api.v1.routes.genieacs import router as genie_routers
from app.core.database import check_mongo_connection
app = FastAPI(openapi_tags=tags_metadata)

app.include_router(genie_routers)

@app.get("/",tags=["Teste API"])
async def root():
    return {"message": "API is working!..."}

async def main():
    ok = await check_mongo_connection()
    if not ok:
        # Pode levantar exceção ou encerrar a app
        raise RuntimeError("Falha ao conectar ao MongoDB")
    
    # Configura o servidor UVicorn para rodar em um event loop separado
    config = uvicorn.Config(app, host="0.0.0.0", port=5000, log_level="info") # critical

    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())