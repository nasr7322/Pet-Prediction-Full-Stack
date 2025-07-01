from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from models import user as user_model
from auth.domain.user_domain import AuthResponse, User, UserCreate, UserLogin
import auth.auth_utils as auth_utils

def signup_user(user: UserCreate, db: Session)->AuthResponse:
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = auth_utils.hash_password(user.password)
    new_user = user_model.User(email=user.email, hashed_password=hashed_pw, name=user.name)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = auth_utils.create_access_token({"sub": new_user.email})
    new_user_response = User(id=new_user.id, email=new_user.email, name=new_user.name)
    return AuthResponse(access_token=token, user=new_user_response)

def login_user(user: UserLogin, db: Session)->AuthResponse:
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if not db_user or not auth_utils.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = auth_utils.create_access_token({"sub": db_user.email})
    user_response = User(id=db_user.id, email=db_user.email, name=db_user.name)
    return AuthResponse(access_token=token, user=user_response)

def auth(token: str, db: Session):
    payload = auth_utils.decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    email = payload.get("sub")
    user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user