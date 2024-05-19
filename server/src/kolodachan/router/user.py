from typing import Annotated

import bcrypt
from fastapi import APIRouter, Body, Depends, HTTPException, Request
from kolodachan.database import PostgreInterface
from kolodachan.dependences.security import get_current_active_user
from kolodachan.models.user import UserCreate, UserRecieve

router = APIRouter(prefix='/api/v1/user', tags=['user'])


@router.post('/create')
async def user_registration(
    request: Request,
    current_user: Annotated[UserRecieve,
                            Depends(get_current_active_user)],
    user: UserCreate = Body(...)):

    if not current_user.role == 'superadmin':
        raise HTTPException(status_code=403)
    db: PostgreInterface = request.app.state.db
    user.password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt(14))
    await db.user.create(user)
