from pydantic import BaseModel

class ClassificationResult(BaseModel):
    cls_name: str
    is_pet: bool

class DetectionResult(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    conf: float
    label: str

class SegmentationResult(BaseModel):
    seg_mask: list[list[int]]

class FullPredictionResult(BaseModel):
    classification: ClassificationResult
    detection: list[DetectionResult]
    segmentation: SegmentationResult

    class Config:
        arbitrary_types_allowed = True

