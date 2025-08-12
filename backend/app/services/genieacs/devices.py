import httpx
import json
from fastapi import HTTPException
from app.constants.urls import BASE_URL_GENIE


async def get_all_devices():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{BASE_URL_GENIE}/devices")
            response.raise_for_status()
            return response.json()

        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Erro ao buscar dispositivos: {e.response.text}"
            )
        except httpx.RequestError as e:
            raise HTTPException(
                status_code=502,
                detail=f"Falha ao conectar ao serviço externo: {e}"
            )


async def get_device_by_mac(mac_address: str):
    query_obj = {
        "VirtualParameters.MACAddress._value": mac_address
    }

    params = {
        "query": json.dumps(query_obj)  # transforma dict em JSON string correta
    }
    async with httpx.AsyncClient() as client:
        try:
            # 🔹 Importante: não coloque o MAC no path, use apenas params
            response = await client.get(f"{BASE_URL_GENIE}/devices", params=params)
            response.raise_for_status()
            return response.json()

        except httpx.HTTPStatusError as e:
            if e.response.status_code == 404:
                raise HTTPException(status_code=404, detail="Dispositivo não encontrado")
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Erro ao buscar dispositivo: {e.response.text}"
            )
        except httpx.RequestError as e:
            raise HTTPException(
                status_code=502,
                detail=f"Falha ao conectar ao serviço externo: {e}"
            )
