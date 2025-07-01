from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    name: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: int
    email: str
    name: str

class AuthResponse(BaseModel):
    access_token: str
    user: User