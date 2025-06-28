from service.models.base_model import BaseModel
from domain.domain import SegmentationResult
from torchvision.models.segmentation import deeplabv3_resnet50
import torch
from PIL import Image

import torchvision.transforms as T

class DeepLabV3SegmentationModel(BaseModel[Image.Image, SegmentationResult]):
    def __init__(self, model_path: str = "artifacts/deeplabv3_resnet50.pth"):
        super().__init__(model_path)

    def _load_model(self):
        self.model = deeplabv3_resnet50(weights=None, aux_loss=True)
        self.model.load_state_dict(torch.load(self.model_path, map_location="cpu"))
        self.model.eval()

    def process_input(self, input_data: Image.Image):
        transform = T.ToTensor()(input_data).unsqueeze(0)
        return transform

    def predict(self, processed_input):
        with torch.no_grad():
            output = self.model(processed_input)["out"]
            seg_mask = torch.argmax(output.squeeze(), dim=0).cpu().numpy()
        return SegmentationResult(seg_mask=seg_mask)