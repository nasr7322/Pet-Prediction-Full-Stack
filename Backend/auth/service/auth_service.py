from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from models import user as user_model
import auth.auth_utils as auth_utils

def signup_user(email: str, password: str, db: Session):
    db_user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = auth_utils.hash_password(password)
    new_user = user_model.User(email=email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = auth_utils.create_access_token({"sub": new_user.email})
    return token

def login_user(email: str, password: str, db: Session):
    db_user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if not db_user or not auth_utils.verify_password(password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = auth_utils.create_access_token({"sub": db_user.email})
    return token

def auth(token: str, db: Session):
    payload = auth_utils.decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    email = payload.get("sub")
    user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user