from domain.domain import ImageForClassification, ClassificationResult, ImageForDetection, DetectionResult, ImageForSegmentation, SegmentationResult, FullResponce
from ultralytics import YOLO
from torchvision.models import resnet50
import torchvision.transforms as T
import torch
from torchvision.models.segmentation import deeplabv3_resnet50
import requests
from PIL import Image



class PetPredictionService:
    def __init__(self):
        classification_model_path = "models/resnet50_imagenet.pth"
        self.classification_model = self.load_cls_model(classification_model_path)
        self.classification_classes = self.load_clss()
        detection_model_path = "models/yolov5su.pt"
        self.detection_model = self.load_det_model(detection_model_path)
        segmentation_model_path = "models/deeplabv3_resnet50.pth"
        self.segmentation_model = self.load_seg_model(segmentation_model_path)

    def classify_image(self, image: ImageForClassification) -> ClassificationResult:
        with torch.no_grad():
            out_cls = self.classification_model(image.image)
            cls_id = out_cls.argmax(dim=1).item()
            cls_name = self.classification_classes[cls_id]
        return ClassificationResult(cls_name=cls_name, cls_id=cls_id)

    def detect_objects(self, image: ImageForDetection) -> list[DetectionResult]:
        detections = self.detection_model.predict(image.image, conf=0.5)[0].boxes
        detection_results = []
        for detection in detections:
            x1, y1, x2, y2 = detection.xyxy[0]
            conf = detection.conf[0].item()
            label = self.detection_model.model.names[detection.cls[0].item()]
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


    def segment_image(self, image: ImageForSegmentation) -> SegmentationResult:
        with torch.no_grad():
            seg_output = self.segmentation_model(image.image)["out"]
            seg_mask = torch.argmax(seg_output.squeeze(), dim=0).cpu().numpy()

        return SegmentationResult(seg_mask=seg_mask)
    
    def load_cls_model(self, model_path: str):
        cls_model = resnet50(weights=None)
        cls_model.load_state_dict(torch.load(model_path))
        cls_model.eval()
        return cls_model

    def load_det_model(self, model_path: str):
        det_model = YOLO(model_path)
        return det_model
    
    def load_seg_model(self, model_path: str):
        seg_model = deeplabv3_resnet50(weights=None, aux_loss=True)
        seg_model.load_state_dict(torch.load(model_path))
        seg_model.eval()
        return seg_model
    
    def load_clss(self):
        return requests.get("https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt").text.splitlines()
    
    def is_pet(self, id):
        dog_classes = set(range(151, 269))
        cat_classes = set(range(281, 286))
        pet_classes = dog_classes | cat_classes
        return id in pet_classes
    
    def full_pet_prediction(self, image: Image.Image):
        # Preprocess for classification
        input_cls = ImageForClassification(
            image=T.Compose([T.Resize((224, 224)), T.ToTensor()])(image).unsqueeze(0)
        )
        result_cls = self.classify_image(input_cls)

        # Check if classified as pet
        if not self.is_pet(result_cls.cls_id):
            return FullResponce(
                classification=result_cls,
                is_pet=False,
                detection=[],
                segmentation=SegmentationResult(seg_mask=[])
            )

        # Detection
        input_det = ImageForDetection(image=image)
        results_det = self.detect_objects(input_det)

        # Segmentation
        input_seg = ImageForSegmentation(
            image=T.ToTensor()(image).unsqueeze(0)
        )
        result_seg = self.segment_image(input_seg)

        return FullResponce(
            classification=result_cls,
            detection=results_det,
            segmentation=result_seg,
            is_pet=True
        )

# if __name__ == "__main__":
#     service = PetPredictionService()
#     image_path = "service/animals.jpeg"
#     image = Image.open(image_path).convert("RGB")
#     result = service.full_pet_prediction(image)
#     print(result)
