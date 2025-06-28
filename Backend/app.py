from fastapi import FastAPI
from domain.domain import FullResponse, ClassificationResult, DetectionResult, SegmentationResult
from service.prediction import PetPredictionService
from fastapi import File, UploadFile
from io import BytesIO
from PIL import Image

pet_prediction_app = FastAPI()

@pet_prediction_app.get("/predict-full")
async def predict(file: UploadFile = File(...)) -> FullResponse:
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().full_pet_prediction(image)

@pet_prediction_app.get("/classify")
async def classify(file: UploadFile = File(...)) -> ClassificationResult:
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().classify(image)

@pet_prediction_app.get("/detect")
async def detect(file: UploadFile = File(...)) -> list[DetectionResult]:
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().detect(image)

@pet_prediction_app.get("/segment")
async def segment(file: UploadFile = File(...)) -> SegmentationResult:
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().segment(image)