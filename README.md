# PetAI - Advanced Pet Detection Platform

A full-stack web application that uses cutting-edge AI models to detect, classify, and segment pets in images. Built with React TypeScript frontend and FastAPI Python backend.

## 🚀 Features

### AI-Powered Capabilities
- **Pet Classification**: Determine if an image contains a pet and identify the animal type
- **Pet Detection**: Locate pets with precise bounding boxes and confidence scores
- **Pet Segmentation**: Create pixel-perfect masks for advanced image editing

### User Experience
- **Modern UI**: Dark futuristic theme with gradient animations
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Processing**: Instant AI predictions with visual feedback
- **Secure Authentication**: JWT-based user authentication system
- **File Validation**: Comprehensive image format and size validation
- **Download Results**: Export processed images and JSON data

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **React Slick** for image carousels

### Backend
- **FastAPI** for high-performance API
- **PyTorch** and **Torchvision** for AI model inference
- **YOLO** (Ultralytics) for object detection
- **ResNet50** for image classification
- **DeepLabV3** for semantic segmentation
- **PostgreSQL** with SQLAlchemy ORM
- **JWT** authentication with bcrypt password hashing
- **Alembic** for database migrations

## 📋 Prerequisites

### Frontend
- Node.js 18+ and npm
- Modern web browser

### Backend
- Python 3.8+
- PostgreSQL database
- AI model weights (see setup instructions)

## 🚀 Installation & Setup

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Pet Prediction Full Stack/Backend"
   ```

2. **Create virtual environment**
   ```bash
   python -m venv KLA
   source KLA/bin/activate  # On Windows: KLA\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   Create a `.env` file in the Backend directory:
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   SECRET_KEY=your-secret-key-here
   ```

5. **Download AI Models**
   Place these model files in [`Backend/prediction/artifacts/`](Backend/prediction/artifacts/):
   - `resnet50_imagenet.pth` - For classification
   - `yolov5su.pt` - For detection
   - `deeplabv3_resnet50.pth` - For segmentation

6. **Database Setup**
   ```bash
   alembic upgrade head
   ```

7. **Run the server**
   ```bash
   uvicorn app:pet_prediction_app --reload
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd "../Frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the Frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
Pet Prediction Full Stack/
├── Frontend/                          # React TypeScript frontend
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── ui/                   # Generic UI components
│   │   │   ├── Layout.tsx            # Main layout component
│   │   │   ├── Navigation.tsx        # Navigation bar
│   │   │   └── ProtectedRoute.tsx    # Route protection
│   │   ├── pages/                    # Page components
│   │   │   ├── WebsiteFeatures.tsx   # Landing page
│   │   │   ├── AboutUs.tsx           # About page
│   │   │   ├── Authentication.tsx    # Login/signup
│   │   │   └── AIModel.tsx           # Main AI interface
│   │   ├── services/                 # API services
│   │   │   ├── api.ts               # Base API configuration
│   │   │   ├── authAPI.ts           # Authentication API
│   │   │   └── predictionAPI.ts     # AI prediction API
│   │   ├── utils/                   # Utility functions
│   │   │   ├── validation.ts        # File validation
│   │   │   ├── imageProcessing.ts   # Canvas operations
│   │   │   └── downloadHelpers.ts   # File downloads
│   │   ├── context/                 # React contexts
│   │   │   └── AuthContext.tsx      # Authentication state
│   │   ├── types/                   # TypeScript definitions
│   │   ├── config/                  # Configuration files
│   │   ├── content/                 # Static content
│   │   └── styles/                  # CSS styles
│   └── public/                      # Static assets
├── Backend/                         # FastAPI Python backend
│   ├── prediction/                  # AI prediction module
│   │   ├── ml_models/              # ML model implementations
│   │   │   ├── base_model.py       # Abstract base model
│   │   │   ├── classification.py   # ResNet50 classifier
│   │   │   ├── detection.py        # YOLO detector
│   │   │   └── segmentation.py     # DeepLabV3 segmenter
│   │   ├── service/                # Business logic
│   │   ├── controller/             # API endpoints
│   │   ├── domain/                 # Data models
│   │   └── artifacts/              # Model weights
│   ├── auth/                       # Authentication module
│   │   ├── service/               # Auth business logic
│   │   ├── controller/            # Auth endpoints
│   │   ├── domain/                # Auth data models
│   │   └── auth_utils.py          # JWT utilities
│   ├── models/                     # Database models
│   ├── migrations/                 # Database migrations
│   ├── database.py                 # Database configuration
│   └── app.py                      # Main application
└── README.md                       # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### AI Predictions (Protected)
- `POST /api/predict/classification` - Classify pet images
- `POST /api/predict/detection` - Detect pets with bounding boxes
- `POST /api/predict/segmentation` - Segment pets from background
- `POST /api/predict/full` - Complete analysis pipeline

## 🎯 Usage

1. **Registration**: Create an account or sign in
2. **Upload Image**: Select or drag-and-drop a pet image
3. **Choose Analysis**:
   - **Classify** to identify if the image contains a pet
   - **Detect** to locate pets with bounding boxes (requires pet classification first)
   - **Segment** to create pixel-perfect masks (requires pet classification first)
4. **View Results**: See AI predictions with visual overlays
5. **Download**: Export processed images and JSON data

## 🔒 Security Features

- **Input Validation**: File type, size, and magic byte verification
- **Authentication**: JWT tokens with secure password hashing
- **Protected Routes**: AI features require user authentication
- **CORS**: Configured for secure cross-origin requests

## 🎨 AI Models

### Classification Model
- **Architecture**: ResNet50 pre-trained on ImageNet
- **Purpose**: Determines if an image contains a pet
- **Output**: Class name and pet detection boolean

### Detection Model
- **Architecture**: YOLOv5 (Ultralytics)
- **Purpose**: Locates pets with bounding boxes
- **Output**: Coordinates, confidence scores, and labels

### Segmentation Model
- **Architecture**: DeepLabV3 with ResNet50 backbone
- **Purpose**: Creates pixel-level pet masks
- **Output**: Segmentation mask array

## 🚀 Deployment

The application is configured for deployment on platforms like:
- **Frontend**: Vercel
- **Backend**: Huggingface
- **Database**: PostgreSQL on Supabase

Environment variables need to be configured for production deployment.

## 📄 License

This project is an assessment for a full stack intern position at the Knights Lab.

---