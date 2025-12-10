"""
Pydantic schemas for request/response validation.
"""
from pydantic import BaseModel, Field
from typing import Literal


class StudentFeatures(BaseModel):
    """Input features for student score prediction."""
    
    # Numerical features
    age: int = Field(..., ge=17, le=24, description="Student age in years")
    study_hours: float = Field(..., ge=0.0, le=8.0, description="Daily study hours")
    class_attendance: float = Field(..., ge=40.0, le=100.0, description="Class attendance percentage (0-100)")
    sleep_hours: float = Field(..., ge=4.0, le=10.0, description="Daily sleep hours")
    
    # Categorical features
    gender: Literal["female", "other", "male"] = Field(..., description="Student gender")
    course: Literal["b.sc", "b.com", "b.tech", "ba", "bba", "diploma", "bca"] = Field(..., description="Course/subject enrolled")
    internet_access: Literal["yes", "no"] = Field(..., description="Internet access availability")
    sleep_quality: Literal["poor", "average", "good"] = Field(..., description="Quality of sleep")
    study_method: Literal["self-study", "group study", "online videos", "coaching", "mixed"] = Field(..., description="Primary study method")
    facility_rating: Literal["medium", "low", "high"] = Field(..., description="Rating of study facilities")
    exam_difficulty: Literal["easy", "moderate", "hard"] = Field(..., description="Perceived exam difficulty")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "age": 20,
                    "study_hours": 5.0,
                    "class_attendance": 85.0,
                    "sleep_hours": 7.5,
                    "gender": "male",
                    "course": "b.tech",
                    "internet_access": "yes",
                    "sleep_quality": "good",
                    "study_method": "self-study",
                    "facility_rating": "medium",
                    "exam_difficulty": "moderate"
                }
            ]
        }
    }


class PredictionRequest(BaseModel):
    """Request body for prediction endpoint."""
    features: StudentFeatures


class PredictionResponse(BaseModel):
    """Response from prediction endpoint."""
    predicted_score: float = Field(..., description="Predicted exam score (0-100)")
    score_category: str = Field(..., description="Performance category")
    model_version: str = Field(..., description="Model version used for prediction")


class HealthResponse(BaseModel):
    """Response from health check endpoint."""
    status: str = Field(default="healthy")
    model_loaded: bool = Field(..., description="Whether the model is loaded")
    model_version: str = Field(..., description="Model version")


class ErrorResponse(BaseModel):
    """Error response schema."""
    error: str
    message: str

