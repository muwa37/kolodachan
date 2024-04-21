from io import BytesIO
from mimetypes import guess_extension
from typing import List
from uuid import uuid4

from fastapi import UploadFile
from kolodachan.models import BoardRetrieve, File
from PIL import Image

Image.MAX_IMAGE_PIXELS = 49_000_000


class FileHandler:

    @staticmethod
    def validate_files(files: List[UploadFile], board: BoardRetrieve):
        # check size
        for file in files:
            if file.size > board.max_file_size:
                return False
            if file.content_type not in board.allowed_file_types:
                return False
        return True

    async def save_files(self, files: List[UploadFile]) -> List[File]:
        new_files = []
        for file in files:
            extension = guess_extension(file.content_type)
            file_binary = await file.read()
            link = uuid4()
            compressed_link = ''
            if 'image' in file.content_type:
                compressed_link = f'{link}S{extension}'
                self._save_tumbnail(file_binary, compressed_link)

            full_link = f'{link}{extension}'
            with open(f'files/{full_link}', 'wb') as f:
                f.write(file_binary)
            new_files.append(
                File(name=file.filename,
                     full_link=full_link,
                     compressed_link=compressed_link,
                     mime_type=file.content_type,
                     size=file.size))
        return new_files

    @staticmethod
    def _save_tumbnail(image: bytes, link: str):
        with Image.open(BytesIO(image)) as tumbnail:
            x, y = tumbnail.size
            x, y = int(x * 0.1), int(y * 0.1)
            tumbnail = tumbnail.resize((x, y))
            tumbnail.save(f'files/{link}', quality=10, optimize=True)
        return link
