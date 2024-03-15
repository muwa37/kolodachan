from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter(prefix='/file', tags=['file'])

@router.get('/', response_class=FileResponse)
async def get_file(name: str):
    path = f'../files/{name}'
    return path
