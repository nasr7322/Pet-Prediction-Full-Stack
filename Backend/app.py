from fastapi import FastAPI
from prediction.controller.endpoints import router
from auth.controller.endpoints import router as auth_router
from database import Base, engine


pet_prediction_app = FastAPI()
Base.metadata.create_all(bind=engine)

pet_prediction_app.include_router(auth_router, prefix="/api/auth")
pet_prediction_app.include_router(router, prefix="/api/predict")