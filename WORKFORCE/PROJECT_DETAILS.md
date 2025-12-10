# Student Exam Score Prediction - Project Details

## Overview

**Project:** Student Exam Score Predictor  
**Type:** Full-Stack ML Web Application  
**Purpose:** Portfolio project demonstrating end-to-end MLOps pipeline  
**Dataset:** [Kaggle - Exam Score Prediction](https://www.kaggle.com/datasets/kundanbedmutha/exam-score-prediction-dataset)

---

## Goals

1. Build a production-ready ML model that predicts student exam scores
2. Create a beautiful, professional web interface for predictions
3. Implement a complete MLOps pipeline with best practices

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                              │
│           Beautiful form → Predicted score               │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTP
┌─────────────────────────▼───────────────────────────────┐
│                    BACKEND API                           │
│               FastAPI + Pydantic                         │
└─────────────────────────┬───────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────┐
│                    ML MODEL                              │
│            scikit-learn pipeline (.joblib)               │
└─────────────────────────────────────────────────────────┘
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
| Frontend | TBD (React or Vanilla JS) |
| Deployment | Docker, Cloud TBD |

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
| Backend | Waiting | - | Needs API_SPEC.md |
| Frontend | Waiting | - | Needs UI_SPEC.md |

---

## Model Requirements

- **R² Score:** > 0.75
- **MAE:** < 10% of score range
- Algorithms to try: Linear Regression, Random Forest, XGBoost

---

## Open Questions

1. Frontend framework: React vs Vanilla JS?
2. Deployment platform?
3. Model versioning strategy?

---

## References

- [Kaggle Dataset](https://www.kaggle.com/datasets/kundanbedmutha/exam-score-prediction-dataset)
- [FastAPI Docs](https://fastapi.tiangolo.com/)

---

*Last Updated: December 10, 2025*
