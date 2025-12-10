# Student Exam Score Prediction - Project Details

## Overview

**Project:** Student Exam Score Predictor  
**Type:** Full-Stack ML Web Application  
**Purpose:** Portfolio project demonstrating end-to-end MLOps pipeline  
**Dataset:** [Kaggle - Exam Score Prediction](https://www.kaggle.com/datasets/kundanbedmutha/exam-score-prediction-dataset)  
**Deployment:** Hugging Face Spaces (Docker SDK) - Free

---

## Goals

1. Build a production-ready ML model that predicts student exam scores
2. Create a beautiful, professional web interface for predictions
3. Implement a complete MLOps pipeline with best practices

---

## Architecture

```
HUGGING FACE SPACES (Docker Container)
┌─────────────────────────────────────────────────────────┐
│                                                          │
│   ┌─────────────────────────────────────────────────┐   │
│   │              FRONTEND (Static)                   │   │
│   │              HTML / CSS / JavaScript             │   │
│   └─────────────────────┬───────────────────────────┘   │
│                         │ HTTP                           │
│   ┌─────────────────────▼───────────────────────────┐   │
│   │              BACKEND API                         │   │
│   │              FastAPI + Pydantic                  │   │
│   └─────────────────────┬───────────────────────────┘   │
│                         │                                │
│   ┌─────────────────────▼───────────────────────────┐   │
│   │              ML MODEL (.joblib)                  │   │
│   │              scikit-learn pipeline               │   │
│   └─────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
URL: huggingface.co/spaces/USERNAME/student-score-predictor
```

---

## Dataset

**Size:** 20,000 rows × 13 columns  
**Target:** `Exam_Score` (continuous)

Features include: Hours_Studied, Attendance, Previous_Scores, Sleep_Hours, Tutoring_Sessions, plus categorical factors like Parental_Involvement, Motivation_Level, School_Type, etc.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Data Science | Python, Pandas, Scikit-learn, Jupyter |
| Backend | FastAPI, Pydantic, Uvicorn |
| Frontend | HTML, CSS, JavaScript (Vanilla) |
| Containerization | Docker |
| Deployment | Hugging Face Spaces (Docker SDK) |

---

## Parallel Workstreams

Teams work **concurrently**, not sequentially. Only true dependencies block progress.

```
DATA SCIENCE ✅        ML OPS              BACKEND              FRONTEND
──────────────         ──────              ───────              ────────
[x] EDA                [ ] Export .joblib  [ ] API Design       [ ] UI Design
[x] Feature Eng        [ ] feature_config  [ ] Endpoints        [ ] Components  
[x] Model Train        [ ] Test inference  [ ] Validation       [ ] Forms
[x] Evaluation ───────────────────────────────► Integration     [ ] API Connect
                                                 │                     │
                                                 └─────────┬───────────┘
                                                           ▼
                                                    INTEGRATION
                                                    ───────────
                                                    [ ] E2E Test
                                                    [ ] Deploy
```

### Dependencies
- **ML Ops Export → Backend Integration**: Backend needs .joblib to integrate
- **API Endpoints → Frontend API Connect**: Frontend needs endpoints to call
- Everything else proceeds in parallel

### Current Status by Team

| Team | Status | Current Task | Blocker |
|------|--------|--------------|---------|
| Data Science | ✅ Complete | - | - |
| Frontend | ✅ Complete | - | - |
| ML Ops | Ready | Export model.joblib | None |
| Backend | Ready | FastAPI endpoints | Awaiting model.joblib |

---

## Final Model (ElasticNet)

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| R² Score | > 0.75 | 0.7291 | ⚠️ Close |
| MAE | < 10% | 7.80 | ✅ Met |
| RMSE | - | 9.75 | - |

- **Algorithm:** ElasticNet (L1+L2 regularization)
- **Features:** 29 total, 20 selected via L1
- **Interaction terms:** 3 of 6 engineered features used
- **Status:** Production-ready

---

## Decisions Made

1. **Frontend:** Vanilla JS (HTML/CSS/JS) - full control, learn web fundamentals
2. **Deployment:** Hugging Face Spaces with Docker SDK - learn both HF ecosystem and Docker
3. **Architecture:** Full-stack (FastAPI backend + static frontend in Docker container)

---

## References

- [Kaggle Dataset](https://www.kaggle.com/datasets/kundanbedmutha/exam-score-prediction-dataset)
- [FastAPI Docs](https://fastapi.tiangolo.com/)

---

*Last Updated: December 10, 2025*
