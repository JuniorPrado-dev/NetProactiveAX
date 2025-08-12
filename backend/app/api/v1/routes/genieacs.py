from fastapi import APIRouter
from app.services.genieacs.devices import get_device_by_mac, get_all_devices

router = APIRouter(
    prefix="/genie",
)

@router.get("/devices")
async def get_all():
    return await get_all_devices()

@router.get("/devices/{mac_address}")
async def get_by_mac(mac_address: str):
    return await get_device_by_mac(mac_address=mac_address)
