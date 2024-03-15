import os

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(prefix='/file', tags=['file'])


@router.get('/', response_class=FileResponse)
async def get_file(name: str):
    path = f'../files/{name}'
    dir = os.listdir('../files')
    if name not in dir:
        raise HTTPException(status_code=404, detail='File does not exist')
    return path
