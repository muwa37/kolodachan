from pydantic import BaseModel


class File(BaseModel):
    name: str
    full_link: str
    compressed_link: str
    extension: str
    size: int
