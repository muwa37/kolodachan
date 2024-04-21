from pydantic import BaseModel


class File(BaseModel):
    name: str
    full_link: str
    compressed_link: str
    mime_type: str
    size: int
