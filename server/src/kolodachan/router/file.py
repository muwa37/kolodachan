import os

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(prefix='/api/v1/file', tags=['file'])


@router.get('/', response_class=FileResponse)
async def get_file(name: str):
    path = f'files/{name}'
    dir = os.listdir('files')
    if name not in dir:
        raise HTTPException(status_code=404)
    return path
