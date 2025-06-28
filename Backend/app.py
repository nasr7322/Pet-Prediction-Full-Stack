from fastapi import FastAPI
from domain.domain import FullResponce
from service.prediction import PetPredictionService
from fastapi import File, UploadFile
from io import BytesIO
from PIL import Image

pet_prediction_app = FastAPI()

@pet_prediction_app.get("/predict")
async def predict(file: UploadFile = File(...)) -> FullResponce:
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().full_pet_prediction(image)