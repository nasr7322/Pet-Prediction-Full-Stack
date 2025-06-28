from prediction.models.domain import FullPredictionResult
from prediction.ml_models.classification import ResNet50ClassificationModel
from prediction.ml_models.detection import YOLODetectionModel
from prediction.ml_models.segmentation import DeepLabV3SegmentationModel
from PIL import Image

class PetPredictionService:
    def __init__(self):
        self.classification_model = ResNet50ClassificationModel()
        self.detection_model = YOLODetectionModel()
        self.segmentation_model = DeepLabV3SegmentationModel()
    
    def full_pet_prediction(self, image: Image.Image):
        # Classification
        result_cls = self.classification_model(image)

        # Check if classified as pet
        if not result_cls.is_pet:
            return FullPredictionResult(
                classification=result_cls,
                detection=None,
                segmentation=None
            )

        # Detection
        results_det = self.detection_model(image)
        
        # Segmentation
        result_seg = self.segmentation_model(image)

        return FullPredictionResult(
            classification=result_cls,
            detection=results_det,
            segmentation=result_seg
        )

    def classify(self, image: Image.Image):
        return self.classification_model(image)

    def detect(self, image: Image.Image):
        return self.detection_model(image)

    def segment(self, image: Image.Image):
        return self.segmentation_model(image)
