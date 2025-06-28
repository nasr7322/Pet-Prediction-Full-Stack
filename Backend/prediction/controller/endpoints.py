from fastapi import APIRouter, UploadFile, File
from PIL import Image
from prediction.models.domain import SegmentationResult, ClassificationResult, DetectionResult, FullPredictionResult
from io import BytesIO
from prediction.service.PetPredictionService import PetPredictionService

router = APIRouter()

@router.post("/predict/full", response_model=FullPredictionResult)
async def predict_full(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().full_pet_prediction(image)

@router.post("/predict/classification", response_model=ClassificationResult)
async def predict_classification(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().classify(image)

@router.post("/predict/detection", response_model=list[DetectionResult])
async def predict_detection(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().detect(image)

@router.post("/predict/segmentation", response_model=SegmentationResult)
async def predict_segmentation(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().segment(image)