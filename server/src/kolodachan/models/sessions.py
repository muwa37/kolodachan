from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class SessionCreate(BaseModel):
    token: str
    user_uuid: UUID
    valid_until: datetime
