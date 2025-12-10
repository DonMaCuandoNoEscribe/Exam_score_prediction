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
DATA SCIENCE          BACKEND              FRONTEND
─────────────         ───────              ────────
[x] EDA               [ ] API Design       [ ] UI Design
[ ] Feature Eng       [ ] Endpoints        [ ] Components  
[ ] Model Train       [ ] Validation       [ ] Forms
[ ] Export .joblib ──────► Integration     [ ] API Connect
                           │                     │
                           └─────────┬───────────┘
                                     ▼
                              INTEGRATION
                              ───────────
                              [ ] E2E Test
                              [ ] Deploy
```

### Dependencies
- **Model Export → Backend Integration**: Backend needs .joblib to integrate
- **API Endpoints → Frontend API Connect**: Frontend needs endpoints to call
- Everything else proceeds in parallel

### Current Status by Team

| Team | Status | Current Task | Blocker |
|------|--------|--------------|---------|
| Data Science | Active | Feature Engineering | None |
| Backend | Ready | Can start per API_SPEC.md | Awaiting model.joblib |
| Frontend | Ready | Can start per UI_SPEC.md | Awaiting API endpoints |

---

## Model Requirements

- **R² Score:** > 0.75
- **MAE:** < 10% of score range
- Algorithms to try: Linear Regression, Random Forest, XGBoost

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
