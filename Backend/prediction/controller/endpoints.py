from fastapi import APIRouter, UploadFile, File, Depends
from PIL import Image
from prediction.domain.domain import SegmentationResult, ClassificationResult, DetectionResult, FullPredictionResult
from auth.service.auth_service import auth
from io import BytesIO
from prediction.service.PetPredictionService import PetPredictionService
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

router = APIRouter()

@router.post("/predict/full", response_model=FullPredictionResult)
async def predict_full(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user = auth(token, db)
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().full_pet_prediction(image)

@router.post("/classification", response_model=ClassificationResult)
async def predict_classification(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user = auth(token, db)
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().classify(image)

@router.post("/detection", response_model=list[DetectionResult])
async def predict_detection(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user = auth(token, db)
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().detect(image)

@router.post("/segmentation", response_model=SegmentationResult)
async def predict_segmentation(
    file: UploadFile = File(...),
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    user = auth(token, db)
    contents = await file.read()
    image = Image.open(BytesIO(contents)).convert("RGB")
    return PetPredictionService().segment(image)