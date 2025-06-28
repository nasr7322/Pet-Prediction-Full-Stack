from fastapi import FastAPI
from prediction.controller.endpoints import router

pet_prediction_app = FastAPI()

pet_prediction_app.include_router(router, prefix="/api")