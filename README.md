# 🎓 Student Exam Score Predictor

Predict student exam performance using machine learning. Built as a portfolio project demonstrating end-to-end MLOps.

## 🚀 Live Demo

**Try it:** [Student Score Predictor](https://exam-score-prediction-yrci.onrender.com/)

## ✨ Features

- 🎯 **ML Model**: ElasticNet regression (R² = 0.73, MAE = 7.8)
- 🖥️ **Frontend**: Modern dark theme with animated UI
- ⚡ **Backend**: FastAPI serving predictions
- 🐳 **Deployment**: Docker on Render

## 📊 Model Details

| Metric | Value |
|--------|-------|
| Algorithm | ElasticNet |
| R² Score | 0.7291 |
| MAE | 7.80 |
| RMSE | 9.75 |
| Features | 29 (20 selected) |
| Training Data | 20,000 students |

## 🛠️ Tech Stack

- **ML**: Python, Scikit-learn, Pandas
- **Backend**: FastAPI, Pydantic, Uvicorn
- **Frontend**: HTML, CSS, JavaScript
- **Deploy**: Docker, Render

## 📁 Project Structure

```
├── backend/           # FastAPI application
│   ├── main.py        # API endpoints
│   ├── schemas.py     # Pydantic models
│   └── model_service.py
├── frontend/          # Web interface
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── model/             # Trained ML model
│   ├── model.joblib
│   └── feature_config.json
├── Dockerfile
└── requirements.txt
```

## 🏃 Run Locally

```bash
# Install dependencies
pip install -r requirements.txt

# Run the app
uvicorn backend.main:app --reload --port 8000

# Open http://localhost:8000
```

## 📦 Deploy to Render

1. Fork this repo
2. Create new Web Service on Render
3. Connect GitHub repo
4. Select Docker environment
5. Deploy!

## 📄 Dataset

Based on [Kaggle Exam Score Prediction Dataset](https://www.kaggle.com/datasets/kundanbedmutha/exam-score-prediction-dataset)

## 👤 Author

Built by [DonMaCuandoNoEscribe](https://github.com/DonMaCuandoNoEscribe)

---

*Portfolio project demonstrating MLOps best practices*
