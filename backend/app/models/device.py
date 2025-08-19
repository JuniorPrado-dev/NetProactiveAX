from fastapi import HTTPException, status

def device_serializer(device):
    _id = device.get("_id","not_found")
    virtualParameters = device.get("VirtualParameters","not_found")
    
    return {"_id":_id,"virtualParameters":virtualParameters}
