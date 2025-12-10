# UI Specification

## Overview

Single-page web application for predicting student exam scores. Professional, modern, responsive.

---

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER                                                      │
│  Logo/Title: "Student Score Predictor"                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  MAIN CONTENT (Two Columns on Desktop)                       │
│  ┌─────────────────────────┐  ┌───────────────────────────┐ │
│  │     INPUT FORM          │  │     RESULTS PANEL         │ │
│  │                         │  │                           │ │
│  │  [Dynamic fields from   │  │  Predicted Score: 85      │ │
│  │   /features/schema]     │  │  Category: Good           │ │
│  │                         │  │                           │ │
│  │  [ PREDICT SCORE ]      │  │  (Empty until prediction) │ │
│  └─────────────────────────┘  └───────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  FOOTER                                                      │
│  © 2025 | Portfolio Project                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Components

### 1. Input Form

- **Dynamic fields** - Fetch from `GET /features/schema` on page load
- **Numerical inputs:** Number field with min/max validation
- **Categorical inputs:** Dropdown select with options from schema
- **Submit button:** "Predict Score" with loading state

### 2. Results Panel

| State | Display |
|-------|---------|
| Initial | Empty or placeholder text |
| Loading | Spinner + "Analyzing..." |
| Success | Score (large), Category (colored badge) |
| Error | Error message + retry option |

### 3. Header

- Title: "Student Score Predictor"
- Minimal, clean design

### 4. Footer

- Simple copyright
- Optional: link to GitHub repo

---

## States

1. **Initial** - Form empty, results hidden
2. **Filling** - User entering data
3. **Loading** - API call in progress, button disabled
4. **Success** - Show prediction results
5. **Error** - Show error message, allow retry

---

## Responsive Design

| Breakpoint | Layout |
|------------|--------|
| Desktop (>768px) | Two columns (form + results side by side) |
| Mobile (<768px) | Single column (form above results) |

---

## Design Guidelines

- **Style:** Professional, clean, trustworthy
- **Colors:** Use a cohesive palette (blues, grays, accent for CTA)
- **Typography:** Clean sans-serif font
- **Spacing:** Generous whitespace
- **Feedback:** Clear loading and error states

---

## API Integration

1. On page load: `GET /features/schema` → Build form dynamically
2. On submit: `POST /predict` with form data → Display results
3. Handle errors gracefully with user-friendly messages

---

## Dependencies

| Artifact | From | Status |
|----------|------|--------|
| `/features/schema` endpoint | Backend | Pending |
| `/predict` endpoint | Backend | Pending |

---

*Version: 1.0.0*

