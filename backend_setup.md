# AI Grant Opportunity Hunter - Backend Setup & Featherless.ai Integration

This document outlines what has been done in the backend, how to set up the Featherless.ai API key, and how to verify and run the API server.

---

## 🛠️ What has been done in the Backend

1. **Centralized Featherless.ai Integration**:
   * Refactored `featherless_client.py` to route all LLM requests through Featherless.ai's OpenAI-compatible gateway using **`Qwen/Qwen2.5-14B-Instruct`**.
2. **Safe Grant Matching & Scoring**:
   * Fixed `KeyError` crashes in `scorer.py` by converting direct key accesses (like `grant["country"]` and `grant["funding"]`) to safe dictionary lookups (`.get()`) with default fallbacks.
   * This allows the matching agent to process raw scraped grants (from NSF, ANRF, or UKRI) before they go through the extraction agent.
3. **Stateless API Endpoints**:
   * **`GET /api/grants/discover`**: Scrapes and lists active opportunities from NSF, ANRF, and UKRI.
   * **`POST /api/matches`**: Computes semantic similarity and priority scores on keyword matching.
   * **`POST /api/planning`**: Generates compliance checklists, urgency analysis, and personalized outreach emails.
   * **`POST /api/ai/test`**: Simple connection test to verify that the Featherless.ai API is responding.

---

## 🔑 How to Setup Featherless.ai API

To run the AI agents locally, you need to configure your Featherless.ai API key:

1. Go to [Featherless.ai](https://featherless.ai/) and generate an API key.
2. Open the `.env` file at the root of the project.
3. Replace the existing key value on **line 2** with your Featherless key:
   ```env
   GROK_API_KEY=fl_YourFeatherlessKeyHere
   ```
   *(Note: The codebase internally references the environment variable name `GROK_API_KEY`, but the client is configured to route directly to Featherless.ai).*

---

## 🚀 How to Run the Backend

Follow these steps to set up your virtual environment and boot the server:

### 1. Create a Python Virtual Environment
```bash
python -m venv .venv
```

### 2. Activate the Virtual Environment
* **PowerShell (VS Code Default)**:
  ```powershell
  .\.venv\Scripts\Activate.ps1
  ```
* **Command Prompt (cmd)**:
  ```cmd
  .\.venv\Scripts\activate.bat
  ```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Backend Server
Run the module directly from the root directory:
```bash
python -m backend.app
```
The server will start running locally at: `http://127.0.0.1:8000`

---

## 🧪 Testing the Endpoints (Swagger UI)

Open `http://127.0.0.1:8000/docs` in your browser to access the interactive API docs. Here is what to send to test the endpoints:

### Endpoint 1: `POST /api/ai/test`
* **Purpose**: Verifies that your Featherless.ai API key is active.
* **Payload**:
  ```json
  {
    "prompt": "Hello Llama!"
  }
  ```

### Endpoint 2: `GET /api/grants/discover`
* **Purpose**: Triggers web scraping of active grant announcements.
* **How to run**: Click **Try it out** and then **Execute** (no request body is needed).

### Endpoint 3: `POST /api/matches/`
* **Purpose**: Compares researcher keyword interests against scraped opportunities.
* **Payload**:
  ```json
  {
    "keywords": [
      "Quantum Computing",
      "Artificial Intelligence"
    ]
  }
  ```

### Endpoint 4: `POST /api/planning/`
* **Purpose**: Generates application checklists and email drafts.
* **Payload**:
  ```json
  {
    "grant": {
      "title": "ANRF Career Advancement Fellowship",
      "agency": "ANRF",
      "country": "India",
      "funding": "₹25,00,000",
      "deadline": "2026-10-15",
      "research_areas": ["Quantum Computing", "Artificial Intelligence"],
      "required_documents": ["Research Proposal", "CV"],
      "match_score": 81,
      "priority_score": 86,
      "why_this_grant": ["Perfect keyword alignment"],
      "recommended_action": "High priority – prepare application"
    }
  }
  ```
