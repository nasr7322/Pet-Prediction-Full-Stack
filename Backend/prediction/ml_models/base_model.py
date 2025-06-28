from abc import ABC, abstractmethod
from typing import Any, TypeVar, Generic

# Generic types for input and output
InputType = TypeVar('InputType')
OutputType = TypeVar('OutputType')

class BaseModel(ABC, Generic[InputType, OutputType]):
    """
    Abstract base class for all ML models.
    Provides a common interface for model loading, input processing, and prediction.
    """
    def __init__(self, model_path: str = None):
        self.model_path = model_path
        self.model = None
        self._load_model()

    @abstractmethod
    def _load_model(self) -> None:
        pass

    @abstractmethod
    def process_input(self, input_data: InputType) -> Any:
        pass

    @abstractmethod
    def predict(self, processed_input: Any) -> OutputType:
        pass

    def __call__(self, input_data: InputType) -> OutputType:
        processed_input = self.process_input(input_data)
        return self.predict(processed_input)