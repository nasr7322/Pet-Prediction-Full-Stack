from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from auth.service.auth_service import signup_user, login_user
from auth.domain.user_domain import UserCreate, UserLogin

router = APIRouter()

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    return signup_user(user, db)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(user, db)