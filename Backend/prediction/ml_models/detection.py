from prediction.ml_models.base_model import BaseModel
from prediction.models.domain import DetectionResult
from ultralytics import YOLO
from PIL import Image
import os

class YOLODetectionModel(BaseModel[Image.Image, list[DetectionResult]]):
    def __init__(self, model_path: str = "../artifacts/yolov5su.pt"):
        model_path = os.path.join(os.path.dirname(__file__), model_path)
        super().__init__(model_path)

    def _load_model(self):
        self.model = YOLO(self.model_path)

    def process_input(self, input_data: Image.Image):
        return input_data

    def predict(self, processed_input):
        results = self.model.predict(processed_input, conf=0.5)[0].boxes
        detection_results = []
        for detection in results:
            x1, y1, x2, y2 = detection.xyxy[0]
            conf = detection.conf[0].item()
            label = self.model.model.names[detection.cls[0].item()]
            detection_results.append(
                DetectionResult(
                    x1=x1,
                    y1=y1,
                    x2=x2,
                    y2=y2,
                    conf=conf,
                    label=label
                )
            )
        return detection_results