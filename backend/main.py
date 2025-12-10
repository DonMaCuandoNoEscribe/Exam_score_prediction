"""
FastAPI application for Student Score Prediction.
"""
import json
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from schemas import (
    PredictionRequest,
    PredictionResponse,
    HealthResponse,
    ErrorResponse,
)
from model_service import model_service, get_category


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model at startup."""
    # Determine paths relative to this file
    base_path = Path(__file__).parent
    model_path = base_path / ".." / "model" / "model.joblib"
    config_path = base_path / ".." / "model" / "feature_config.json"
    
    # Load the model
    model_service.load(str(model_path), str(config_path))
    print(f"✓ Model loaded successfully (version {model_service.get_version()})")
    
    yield
    
    # Cleanup (if needed)
    print("Shutting down...")


app = FastAPI(
    title="Student Score Predictor API",
    description="API for predicting student exam scores based on study habits and demographics",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", response_model=HealthResponse, tags=["Health"])
def health():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        model_loaded=model_service.is_loaded,
        model_version=model_service.get_version(),
    )


@app.get("/features/schema", tags=["Features"])
def get_schema():
    """Return feature definitions from feature_config.json."""
    if not model_service.is_loaded:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return model_service.get_feature_config()


@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
def predict(request: PredictionRequest):
    """
    Predict student exam score based on input features.
    
    Returns the predicted score, score category, and model version.
    """
    if not model_service.is_loaded:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Convert Pydantic model to dict
        features = request.features.model_dump()
        
        # Make prediction
        predicted_score = model_service.predict(features)
        
        # Clamp score to valid range
        predicted_score = max(0.0, min(100.0, predicted_score))
        
        # Get category
        score_category = get_category(predicted_score)
        
        return PredictionResponse(
            predicted_score=round(predicted_score, 2),
            score_category=score_category,
            model_version=model_service.get_version(),
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


# Mount static files for frontend - MUST BE LAST
frontend_path = Path(__file__).parent / ".." / "frontend"
if frontend_path.exists():
    app.mount("/", StaticFiles(directory=str(frontend_path), html=True), name="frontend")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

