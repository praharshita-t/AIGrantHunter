# AI Grant Opportunity Hunter
**Stop searching for grants. Let AI hunt them down for you.**

[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688.svg)](https://fastapi.tiangolo.com/)
[![LLM](https://img.shields.io/badge/LLM-Qwen2.5--14B--Instruct-orange.svg)](https://featherless.ai/)
[![Status](https://img.shields.io/badge/status-hackathon--build-brightgreen.svg)]()
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE)

---

## 🚨 The Problem

Every year, **billions of dollars in research grants go unclaimed** — not because researchers aren't qualified, but because:

- Funding opportunities are scattered across dozens of agency websites (NSF, ANRF, UKRI, and more)
- Eligibility criteria, deadlines, and required documents are buried in walls of text
- Researchers spend **hours per week** manually tracking and filtering grants instead of doing research
- Early-career researchers and students — who need funding the most — often don't have the time or institutional support to search effectively

**The result:** great research goes unfunded simply because the *discovery and paperwork* process is broken.

## 💡 Our Solution

**AI Grant Opportunity Hunter** is an end-to-end AI pipeline that automates the entire grant lifecycle — **Discover → Match → Plan** — turning a multi-day manual search into a single API call.

```
   🔎 DISCOVER              🧩 MATCH                   📋 PLAN
 Scrape live grants   →   AI-score relevance    →   Auto-generate checklists,
 from NSF, ANRF, UKRI     against researcher         urgency ranking &
                          interests                  outreach emails
```

Instead of a static grant database, this is a **living pipeline** — every grant that gets discovered is automatically scored, ranked, and turned into an actionable next step.

---

## ✨ What Makes This Stand Out

| | |
|---|---|
| 🤖 **Multi-agent AI system** | Not a single chatbot wrapper — three specialized agents (Extraction, Matching, Planning) each do one job well and hand off to the next |
| 🌐 **Real data, not mock data** | Actively scrapes **live** opportunities from NSF, ANRF, and UKRI — not a hardcoded demo dataset |
| 🎯 **Explainable scoring** | Every match comes with a `match_score`, `priority_score`, and a human-readable `why_this_grant` — no black-box ranking |
| ✉️ **Action, not just information** | Goes beyond "here are some grants" to generate the actual compliance checklist and draft outreach email needed to apply |
| 🔌 **Swappable LLM backend** | Built on an abstracted AI service layer — currently routed through Featherless.ai (Qwen2.5-14B-Instruct), but can plug into any OpenAI-compatible model in minutes |
| 🧱 **Production-shaped architecture** | Stateless REST API, environment-based secrets, and a real test suite — not a notebook hacked together in 24 hours |

---

## 🏗️ Architecture

```
┌─────────────┐     ┌────────────────────┐     ┌─────────────────────┐
│   Frontend  │───▶│   FastAPI Backend   │───▶│   Featherless.ai      │
│  (frontend/)│     │    (backend/app.py) │     │  Qwen2.5-14B-Instruct │
└─────────────┘     └─────────┬──────────┘     └─────────────────────┘
                              │
              ┌───────────────┼────────────────┐
              ▼               ▼                ▼
      ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
      │  Extraction   │ │   Matching    │ │   Planning    │
      │  Agent        │ │   Agent       │ │   Agent       │
      │  (llm.py)     │ │ (embeddings.py)│ │ (checklist.py)│
      │               │ │               │ │               │
      │ Structures    │ │ Semantic +    │ │ Checklists,   │
      │ raw scraped   │ │ keyword       │ │ urgency,      │
      │ grant data    │ │ scoring       │ │ outreach email│
      └───────────────┘ └───────────────┘ └───────────────┘
              ▲
              │
      ┌───────────────┐
      │  data/         │
      │  NSF · ANRF ·  │
      │  UKRI scrapers │
      └───────────────┘
```

---

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/grants/discover` | Scrapes and lists live grant opportunities |
| `POST` | `/api/matches` | Scores grants against researcher keywords (semantic + keyword) |
| `POST` | `/api/planning` | Generates checklist, urgency analysis, and outreach email |
| `POST` | `/api/ai/test` | Verifies the LLM connection is live |

**Sample `/api/planning` response for a matched grant:**
```json
{
  "grant": {
    "title": "ANRF Career Advancement Fellowship",
    "agency": "ANRF",
    "country": "India",
    "funding": "₹25,00,000",
    "deadline": "2026-10-15",
    "research_areas": ["Quantum Computing", "Artificial Intelligence"],
    "match_score": 81,
    "priority_score": 86,
    "why_this_grant": ["Perfect keyword alignment"],
    "recommended_action": "High priority – prepare application"
  }
}
```

---

## ⚙️ Tech Stack

- **Backend:** Python, FastAPI, Uvicorn
- **AI Layer:** Centralized `ai_service.py` client → Featherless.ai (OpenAI-compatible) → Qwen2.5-14B-Instruct
- **Data Layer:** Custom scrapers for NSF, ANRF, UKRI grant portals
- **Frontend:** REST-consuming client in `frontend/`
- **Testing:** Pytest suite with shared fixtures (`conftest.py`)
- **Config:** `.env`-based secret management (never hardcoded keys)

---

## 🚀 Quickstart

```bash
# 1. Clone and enter the repo
git clone https://github.com/praharshita-t/AIGrantHunter.git
cd AIGrantHunter

# 2. Create and activate a virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # macOS/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Add your API key
cp .env.example .env
# then edit .env and set GROK_API_KEY=<your Featherless.ai key>

# 5. Run the backend
python -m backend.app
```

Open **`http://127.0.0.1:8000/docs`** for the interactive Swagger UI to try every endpoint live.

---

## 🗺️ Roadmap

- [ ] Expand scraper coverage beyond NSF / ANRF / UKRI to more national & private funders
- [ ] Add user accounts to save researcher profiles and track application status
- [ ] Slack/email notifications for new high-match grants and approaching deadlines
- [ ] One-click export of the generated checklist + email to PDF/Word
- [ ] Fine-tuned embedding model for more accurate research-area matching

---

## 👩‍💻 Team

Built by **[Praharshita T](https://github.com/praharshita-t)** for [Hackathon Name] — automating the boring part of research so researchers can focus on the actual research.

---

## 📄 License

This project is licensed under the terms in [LICENSE](LICENSE).
