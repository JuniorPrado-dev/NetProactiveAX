import asyncio
import uvicorn
from fastapi import FastAPI
from app.api.v1.routes.genieacs import router as genie_routers

app = FastAPI()

app.include_router(genie_routers)

@app.get("/")
async def root():
    return {"message": "API is working!..."}

async def main():
    # Configura o servidor UVicorn para rodar em um event loop separado
    config = uvicorn.Config(app, host="0.0.0.0", port=5000, log_level="info") # critical

    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())