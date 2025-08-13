from fastapi import APIRouter
from app.services.genieacs.devices import Genie

router = APIRouter(
    prefix="/genie",
    tags=["GENIE"]
)

@router.get("/devices")
async def get_all():
    '''
    Retorna informações de todos os dispositivos conectados ao GENIE
    '''
    return await Genie.get_all_devices()

@router.get("/devices/{mac_address}")
async def get_by_mac(mac_address: str):
    '''
    Retorna informações de um disposivo específico. Para isso informe o endereço MAC do dispositivo ao final da url.
    '''
    return await Genie.get_device_by_mac(mac_address=mac_address)
