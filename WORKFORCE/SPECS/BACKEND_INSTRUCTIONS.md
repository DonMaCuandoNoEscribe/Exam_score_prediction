# Backend Team Instructions

## Mission
Build FastAPI backend that serves ML predictions and static frontend files.

---

## Project Structure to Create

```
backend/
├── main.py              # FastAPI app + static file serving
├── schemas.py           # Pydantic request/response models
├── model_service.py     # Model loading + prediction logic
└── requirements.txt     # Dependencies
```

---

## Endpoints to Implement

### 1. `GET /health`
```python
@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": True,
        "model_version": "1.0.0"
    }
```

### 2. `GET /features/schema`
Return feature definitions from `model/feature_config.json`:
```python
@app.get("/features/schema")
def get_schema():
    return feature_config  # Load from JSON file
```

### 3. `POST /predict`
```python
@app.post("/predict")
def predict(features: StudentFeatures):
    prediction = model.predict(...)
    return {
        "predicted_score": prediction,
        "score_category": get_category(prediction),
        "model_version": "1.0.0"
    }
```

### 4. Static Files (Frontend)
```python
# MUST BE LAST - serves frontend
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
```

---

## Key Implementation Details

### Load Model at Startup
```python
import joblib
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model once at startup
    global model, feature_config
    model = joblib.load("model/model.joblib")
    feature_config = json.load(open("model/feature_config.json"))
    yield

app = FastAPI(lifespan=lifespan)
```

### Score Categories
```python
def get_category(score: float) -> str:
    if score >= 90: return "Excellent"
    if score >= 80: return "Good"
    if score >= 70: return "Average"
    if score >= 60: return "Below Average"
    return "Needs Improvement"
```

### CORS (for local development)
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Port Configuration

| Environment | Port |
|-------------|------|
| Local dev | 8000 |
| HF Spaces | 7860 |

Frontend expects backend at same origin (served by FastAPI).

---

## Dependencies (requirements.txt)

```
fastapi>=0.104.0
uvicorn>=0.24.0
pydantic>=2.5.0
pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.3.0
joblib>=1.3.0
python-multipart>=0.0.6
```

---

## Checklist

- [ ] Create `backend/` directory structure
- [ ] Implement all 3 API endpoints
- [ ] Load model from `model/model.joblib`
- [ ] Load feature config from `model/feature_config.json`
- [ ] Serve frontend from `frontend/` directory
- [ ] Test all endpoints locally
- [ ] Test with frontend (should auto-connect)

---

## Testing

```bash
# Start server
cd backend
uvicorn main:app --reload --port 8000

# Test endpoints
curl http://localhost:8000/health
curl http://localhost:8000/features/schema
curl -X POST http://localhost:8000/predict -H "Content-Type: application/json" -d '{"study_hours": 5, ...}'

# Frontend should work at http://localhost:8000
```

---

## Blockers

| Dependency | From | Status |
|------------|------|--------|
| `model/model.joblib` | ML Ops | Pending |
| `model/feature_config.json` | ML Ops | Pending |
| `frontend/*` | Frontend | ✅ Complete |

**Note:** You can start with mock model for development, then integrate real model when ML Ops delivers.

---

*Priority: HIGH - Frontend is waiting for API*

