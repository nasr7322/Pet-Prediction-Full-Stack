from service.models.base_model import BaseModel
from domain.domain import ClassificationResult
import torch
from torchvision.models import resnet50
import requests
from PIL import Image

import torchvision.transforms as T

class ResNet50ClassificationModel(BaseModel[Image.Image, ClassificationResult]):
    
    def __init__(self, model_path: str = "artifacts/resnet50_imagenet.pth"):
        self.class_names = self._load_class_names()
        super().__init__(model_path)

    def _load_model(self):
        self.model = resnet50(weights=None)
        self.model.load_state_dict(torch.load(self.model_path, map_location="cpu"))
        self.model.eval()

    def _load_class_names(self):
        url = "https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt"
        return requests.get(url).text.splitlines()

    def process_input(self, input_data: Image.Image):
        transform = T.Compose([T.Resize((224, 224)), T.ToTensor()])
        return transform(input_data).unsqueeze(0)

    def is_pet(self, id):
        dog_classes = set(range(151, 269))
        cat_classes = set(range(281, 286))
        pet_classes = dog_classes | cat_classes
        return id in pet_classes

    def predict(self, processed_input):
        with torch.no_grad():
            output = self.model(processed_input)
            cls_id = output.argmax(dim=1).item()
            cls_name = self.class_names[cls_id]
        return ClassificationResult(cls_name=cls_name, is_pet=self.is_pet(cls_id))