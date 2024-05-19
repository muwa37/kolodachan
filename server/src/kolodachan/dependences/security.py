from typing import Annotated

from fastapi import Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer
from kolodachan.database.postgre_interface import PostgreInterface
from kolodachan.models import UserRecieve

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/token")


async def get_current_user(
    request: Request,
    token: Annotated[str, Depends(oauth2_scheme)],
):
    print(token)
    db: PostgreInterface = request.app.state.db
    user = await db.user.get_by_session(token)
    if not user:
        print('not_user')
        raise HTTPException(status_code=401)
    return user


async def get_current_active_user(
        user: Annotated[UserRecieve,
                        Depends(get_current_user)]) -> UserRecieve:
    if not user.is_active:
        print('not_active')
        raise HTTPException(status_code=401)
    return user
