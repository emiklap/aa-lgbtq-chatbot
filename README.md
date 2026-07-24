# AA LGBTQ+ Chatbot — Research Prototype

A web-based chatbot prototype supporting critical consciousness among Asian
American LGBTQ+ young adults

**This is a local development prototype only — not a public deployment.**
The chatbot is for reflection and learning; it is not a therapist, crisis
service, or medical provider.

## Prerequisites

- Python 3.11+
- Node.js 18+
- An Anthropic API key with active billing (see below)

## Backend setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate          # on Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file inside `backend/` with your API key:
ANTHROPIC_API_KEY=your-key-here

Start the server:

```bash
uvicorn app.main:app --reload --port 8000
```

Confirm it's running:

```bash
curl http://127.0.0.1:8000/api/chat/health
# should return: {"status":"ok"}
```

## Frontend setup

In a **second terminal tab**:

```bash
cd frontend
npm install
npm run dev
```

Open the URL it prints — typically **http://localhost:5173**

## Current features

- Home/welcome screen
- Chat interface connected to the Claude API
- Resource panel (crisis/support resources)
- Required disclaimer footer