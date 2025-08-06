import asyncio

import uvicorn

from app.core.start.main import create_tables
from app.main import app


async def main():
    # Inicializa o banco de dados
    await create_tables()

    # Configura o servidor UVicorn para rodar em um event loop separado
    config = uvicorn.Config(app, host="0.0.0.0", port=5000, log_level="info") # critical

    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())

    """
    log_level pode ter os seguintes valores:
        "critical": Registra apenas mensagens críticas.
        "error": Registra mensagens de erro e mensagens mais graves.
        "warning": Registra mensagens de aviso, erro e mensagens mais graves.
        "info": Registra mensagens informativas, de aviso, erro e mensagens mais graves.
        "debug": Registra mensagens de depuração, informativas, de aviso, erro e mensagens mais graves.
        "trace": Registra todas as mensagens, incluindo mensagens de rastreamento detalhadas.
    """
