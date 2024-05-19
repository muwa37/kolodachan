import datetime
from os import getenv
from secrets import token_hex
from typing import Annotated

import bcrypt
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from kolodachan.database.postgre_interface import PostgreInterface
from kolodachan.models.sessions import SessionCreate
from kolodachan.models.user import UserRecieve

load_dotenv()
token_expire_days = int(getenv('TOKEN_EXPIRE_DAYS'))

router = APIRouter(prefix='/api/v1')


@router.post('/token')
async def login(
    from_data: Annotated[OAuth2PasswordRequestForm,
                         Depends()],
    request: Request,
):
    db: PostgreInterface = request.app.state.db
    user: UserRecieve = await db.user.get(from_data.username)

    if not user:
        raise HTTPException(status_code=401)
    print(user.hashed_password)
    if not bcrypt.checkpw(from_data.password.encode(), user.hashed_password):
        raise HTTPException(status_code=401)

    token = token_hex(48)
    valid_until = datetime.datetime.now(
        datetime.timezone.utc) + datetime.timedelta(days=token_expire_days)
    print(valid_until)
    naive = valid_until.replace(tzinfo=None)
    session = SessionCreate(token=token, user_uuid=user.pid, valid_until=naive)
    await db.session.create(session)

    return {'access_token': token, 'token_type': 'bearer'}
