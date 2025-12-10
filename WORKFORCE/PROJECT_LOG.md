# Project Log

## Status Dashboard

| Team | Status | Current Task | Blocker |
|------|--------|--------------|---------|
| Data Science | Active | Feature Engineering | None |
| Backend | Ready | Can start (API_SPEC.md done) | Awaiting model.joblib |
| Frontend | Ready | Can start (UI_SPEC.md done) | Awaiting API endpoints |
| Integration | Waiting | - | Needs all teams |

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Frontend | Vanilla JS (HTML/CSS/JS) | Full control, learn fundamentals |
| Backend | FastAPI | Modern, fast, auto-docs |
| Deployment | HF Spaces + Docker | Learn both HF ecosystem and Docker |
| Model Format | .joblib | Standard for scikit-learn |

---

## Specs Created

- [x] `SPECS/API_SPEC.md` - Backend API contract
- [x] `SPECS/UI_SPEC.md` - Frontend requirements
- [x] `SPECS/DEPLOYMENT_SPEC.md` - HF Spaces + Docker setup

---

## Next Actions

1. **Data Science:** Complete feature engineering & model training
2. **Backend:** Set up FastAPI project structure
3. **Frontend:** Set up HTML/CSS/JS structure

---

## Handoffs

| Date | From | To | Item |
|------|------|-----|------|
| Dec 10 | Orchestrator | All Teams | Architecture decisions |
| Dec 10 | Orchestrator | Backend | API_SPEC.md |
| Dec 10 | Orchestrator | Frontend | UI_SPEC.md |
| Dec 10 | Orchestrator | All Teams | DEPLOYMENT_SPEC.md |

---

*Last Updated: December 10, 2025*
