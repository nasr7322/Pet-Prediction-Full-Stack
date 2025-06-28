from typing import List
from pydantic import BaseModel
import torch
from PIL import Image
import numpy as np

class ImageForClassification(BaseModel):
    # Expected shape: [1, 3, 224, 224], dtype: torch.float32
    image: torch.Tensor

    class Config:
        arbitrary_types_allowed = True

class ClassificationResult(BaseModel):
    cls_name: str
    cls_id: int

class ImageForDetection(BaseModel):
    # Expected shape: [H, W], dtype: PIL.Image.Image in RGB
    image: Image.Image

    class Config:
        arbitrary_types_allowed = True

class DetectionResult(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    conf: float
    label: str

class ImageForSegmentation(BaseModel):
    # Expected shape: [1, 3, H, W], dtype: torch.float32
    image: torch.Tensor

    class Config:
        arbitrary_types_allowed = True

class SegmentationResult(BaseModel):
    # Expected shape: [H, W], dtype: np.ndarray
    seg_mask: List[List[int]]

    class Config:
        arbitrary_types_allowed = True

class FullResponce(BaseModel):
    classification: ClassificationResult
    is_pet: bool
    detection: list[DetectionResult]
    segmentation: SegmentationResult

    class Config:
        arbitrary_types_allowed = True

