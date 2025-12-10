# ML Ops Team Instructions

## Mission
Export the trained model from Jupyter notebook into production-ready files that Backend can use.

---

## What You Need to Create

### 1. `model/model.joblib`

The complete sklearn pipeline (preprocessor + model) saved as a single file.

```python
import joblib
import os

# Create directory
os.makedirs('model', exist_ok=True)

# Save the FULL PIPELINE (not just the model!)
# This should include preprocessing + ElasticNet
joblib.dump(final_pipeline, 'model/model.joblib')

# Verify it works
loaded = joblib.load('model/model.joblib')
test_pred = loaded.predict(X_test[:1])
print(f"Test prediction: {test_pred[0]:.2f}")
```

### 2. `model/feature_config.json`

Feature definitions for the API to validate inputs.

```json
{
  "model_info": {
    "name": "student_score_predictor",
    "version": "1.0.0",
    "algorithm": "ElasticNet",
    "metrics": {
      "r2": 0.7291,
      "rmse": 9.75,
      "mae": 7.80
    }
  },
  "numerical_features": [
    {"name": "study_hours", "type": "float", "min": 0, "max": 24, "default": 5},
    {"name": "attendance_rate", "type": "float", "min": 0, "max": 100, "default": 80}
    // ... add all numerical features
  ],
  "categorical_features": [
    {"name": "study_method", "type": "string", "options": ["self-study", "group study", "online videos", "coaching"], "default": "self-study"}
    // ... add all categorical features
  ]
}
```

---

## Checklist

- [ ] Locate the final trained pipeline in notebook
- [ ] Ensure pipeline includes ALL preprocessing (scalers, encoders)
- [ ] Save as `model/model.joblib`
- [ ] Create `model/feature_config.json` with ALL feature definitions
- [ ] Test loading and predicting with sample data
- [ ] Test with `website_holdout_set.csv`
- [ ] Verify file sizes are reasonable (<50MB for joblib)

---

## Important Notes

1. **Save the PIPELINE, not just the model** - Preprocessing must be included
2. **Feature names must match** - Backend will use exact names from config
3. **Include defaults** - Frontend shows default values in form
4. **Test thoroughly** - Backend relies on this working correctly

---

## Handoff

Once complete:
1. Files are in `model/` directory
2. Notify Orchestrator
3. Backend team can begin integration

---

*Priority: HIGH - This unblocks Backend team*

