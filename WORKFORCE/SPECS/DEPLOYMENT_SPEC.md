# Deployment Specification

## Platform: Hugging Face Spaces (Docker SDK)

**URL Pattern:** `huggingface.co/spaces/USERNAME/student-score-predictor`  
**Cost:** Free  
**SDK:** Docker

---

## Architecture

```
HUGGING FACE SPACES (Docker Container)
┌─────────────────────────────────────────────────────┐
│                                                      │
│   Frontend (Static)    →    Backend (FastAPI)       │
│   HTML/CSS/JS               Python + Pydantic       │
│        │                          │                 │
│        └──────── HTTP ────────────┘                 │
│                    │                                │
│              ML Model (.joblib)                     │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Project Structure

```
student-score-predictor/
├── Dockerfile                # Docker configuration
├── requirements.txt          # Python dependencies
├── README.md                 # HF Spaces readme (with metadata)
│
├── backend/
│   ├── main.py               # FastAPI app
│   ├── schemas.py            # Pydantic models
│   └── model_service.py      # Model loading & prediction
│
├── frontend/
│   ├── index.html            # Main HTML
│   ├── styles.css            # Styling
│   └── app.js                # JavaScript logic
│
└── model/
    ├── model.joblib          # Trained ML model
    └── feature_config.json   # Feature definitions
```

---

## Key Files

### Dockerfile

```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port (HF Spaces uses 7860)
EXPOSE 7860

# Run FastAPI (serves both API and static frontend)
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "7860"]
```

### requirements.txt

```
fastapi>=0.104.0
uvicorn>=0.24.0
pydantic>=2.5.0
pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.3.0
joblib>=1.3.0
```

### README.md (HF Spaces Metadata)

```markdown
---
title: Student Score Predictor
emoji: 📊
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
---

# Student Exam Score Predictor

Predict student exam performance using machine learning.
```

---

## Setup Steps

### 1. Create Hugging Face Account
- Go to huggingface.co
- Sign up (free)
- Verify email

### 2. Create New Space
- Click "New Space"
- Name: `student-score-predictor`
- SDK: **Docker**
- Visibility: Public

### 3. Clone & Push Code
```bash
git clone https://huggingface.co/spaces/USERNAME/student-score-predictor
cd student-score-predictor
# Add your files
git add .
git commit -m "Initial commit"
git push
```

### 4. Automatic Build
- HF Spaces detects Dockerfile
- Builds container
- Deploys automatically
- Live at: `huggingface.co/spaces/USERNAME/student-score-predictor`

---

## Local Development

```bash
# Build Docker image
docker build -t student-predictor .

# Run container
docker run -p 7860:7860 student-predictor

# Access at http://localhost:7860
```

Or without Docker:
```bash
# Install dependencies
pip install -r requirements.txt

# Run FastAPI
uvicorn backend.main:app --reload --port 7860

# Access at http://localhost:7860
```

---

## Environment

- Python 3.10
- Port: 7860 (HF Spaces standard)
- Free CPU instance
- 16GB RAM limit
- Auto-sleep after inactivity

---

## FastAPI Serving Static Files

Backend serves both API and frontend:

```python
# backend/main.py
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# API routes
@app.post("/predict")
async def predict(...):
    ...

# Serve frontend (must be last)
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
```

---

*Version: 1.0.0*

