import asyncio

import uvicorn

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

async def main():
    # Configura o servidor UVicorn para rodar em um event loop separado
    config = uvicorn.Config(app, host="0.0.0.0", port=5000, log_level="info") # critical

    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())