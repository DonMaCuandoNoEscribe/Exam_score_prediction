"""
Model loading and prediction service.
"""
import json
import joblib
import numpy as np
import pandas as pd
from pathlib import Path
from typing import Any
import sys


def create_interaction_features_production(df_raw):
    """
    Create interaction terms from raw data.
    This function replicates the one used during model training.
    """
    interactions = pd.DataFrame(index=df_raw.index)
    
    # 1. study_hours × sleep_hours (Study-rest balance)
    interactions['study_x_sleep'] = df_raw['study_hours'] * df_raw['sleep_hours']
    
    # 2. study_hours × class_attendance (Self-study + class engagement)
    interactions['study_x_attendance'] = df_raw['study_hours'] * df_raw['class_attendance']
    
    # 3. study_hours² (Diminishing returns on studying)
    interactions['study_squared'] = df_raw['study_hours'] ** 2
    
    # 4. sleep_hours × sleep_quality (Sleep effectiveness)
    sleep_quality_map = {'poor': 0, 'average': 1, 'good': 2}
    sleep_quality_num = df_raw['sleep_quality'].map(sleep_quality_map)
    interactions['sleep_x_quality'] = df_raw['sleep_hours'] * sleep_quality_num
    
    # 5. study_hours × exam_difficulty (Preparation vs challenge)
    difficulty_map = {'easy': 0, 'moderate': 1, 'hard': 2}
    difficulty_num = df_raw['exam_difficulty'].map(difficulty_map)
    interactions['study_x_difficulty'] = df_raw['study_hours'] * difficulty_num
    
    # 6. class_attendance × study_method (Learning style)
    method_map = {'self-study': 0, 'group study': 1, 'online videos': 2, 'coaching': 3, 'mixed': 4}
    method_num = df_raw['study_method'].map(method_map)
    interactions['attendance_x_method'] = df_raw['class_attendance'] * method_num
    
    return interactions


# Inject our function into __main__ so pickle can find it
import __main__
__main__.create_interaction_features_production = create_interaction_features_production


class ModelService:
    """Service for loading model and making predictions."""
    
    def __init__(self):
        self.model = None
        self.preprocessor = None
        self.scaler_interactions = None
        self.interaction_creator = None
        self.feature_config = None
        self.model_info = None
        self.is_loaded = False
    
    def load(self, model_path: str = "../model/model.joblib", config_path: str = "../model/feature_config.json"):
        """Load the model pipeline and feature configuration."""
        model_path = Path(model_path)
        config_path = Path(config_path)
        
        # Load model pipeline - the function is now available in __main__
        pipeline = joblib.load(model_path)
        
        self.model = pipeline['model']
        self.preprocessor = pipeline['preprocessor']
        self.scaler_interactions = pipeline['scaler_interactions']
        # Use our implementation for consistency
        self.interaction_creator = create_interaction_features_production
        self.model_info = pipeline.get('model_info', {})
        
        # Load feature configuration
        with open(config_path, 'r') as f:
            self.feature_config = json.load(f)
        
        self.is_loaded = True
        return self
    
    def get_version(self) -> str:
        """Get model version."""
        if self.model_info:
            return self.model_info.get('version', '1.0.0')
        return '1.0.0'
    
    def create_interaction_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create interaction features from raw data."""
        interactions = pd.DataFrame(index=df.index)
        
        # 1. study_hours × sleep_hours (Study-rest balance)
        interactions['study_x_sleep'] = df['study_hours'] * df['sleep_hours']
        
        # 2. study_hours × class_attendance (Self-study + class engagement)
        interactions['study_x_attendance'] = df['study_hours'] * df['class_attendance']
        
        # 3. study_hours² (Diminishing returns on studying)
        interactions['study_squared'] = df['study_hours'] ** 2
        
        # 4. sleep_hours × sleep_quality (Sleep effectiveness)
        sleep_quality_map = {'poor': 0, 'average': 1, 'good': 2}
        sleep_quality_num = df['sleep_quality'].map(sleep_quality_map)
        interactions['sleep_x_quality'] = df['sleep_hours'] * sleep_quality_num
        
        # 5. study_hours × exam_difficulty (Preparation vs challenge)
        difficulty_map = {'easy': 0, 'moderate': 1, 'hard': 2}
        difficulty_num = df['exam_difficulty'].map(difficulty_map)
        interactions['study_x_difficulty'] = df['study_hours'] * difficulty_num
        
        # 6. class_attendance × study_method (Learning style)
        method_map = {'self-study': 0, 'group study': 1, 'online videos': 2, 'coaching': 3, 'mixed': 4}
        method_num = df['study_method'].map(method_map)
        interactions['attendance_x_method'] = df['class_attendance'] * method_num
        
        return interactions
    
    def predict(self, features: dict) -> float:
        """Make a prediction from input features."""
        if not self.is_loaded:
            raise RuntimeError("Model not loaded. Call load() first.")
        
        # Convert to DataFrame
        df = pd.DataFrame([features])
        
        # Step 1: Apply main preprocessor (scaling + encoding)
        processed = self.preprocessor.transform(df)
        
        # Step 2: Create interaction features using our implementation
        interactions = self.create_interaction_features(df)
        
        # Step 3: Scale interaction features
        interactions_scaled = self.scaler_interactions.transform(interactions)
        
        # Step 4: Combine features
        final_features = np.hstack([processed, interactions_scaled])
        
        # Step 5: Make prediction
        prediction = self.model.predict(final_features)
        
        return float(prediction[0])
    
    def get_feature_config(self) -> dict:
        """Get the feature configuration."""
        return self.feature_config


def get_category(score: float) -> str:
    """Get score category based on predicted score."""
    if score >= 90:
        return "Excellent"
    if score >= 80:
        return "Good"
    if score >= 70:
        return "Average"
    if score >= 60:
        return "Below Average"
    return "Needs Improvement"


# Global model service instance
model_service = ModelService()

