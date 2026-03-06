# AI Career Compass

An AI-powered career guidance platform that helps users discover suitable career domains, learning roadmaps, and career paths based on their skills and interests.

## Features

- **Autocomplete input**: Type skills and interests; get suggestions from an extensive dataset
- **Gemini AI integration**: AI-generated career recommendations
- **Structured output**: Career domains, roles, career path, and learning roadmap (Beginner → Intermediate → Advanced)

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **AI**: Google Gemini API

## Quick Start

### 1. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install && cd ..
```

### 2. Add your Gemini API key

Create `server/.env`:

```
GEMINI_API_KEY=your_api_key_here
```

Get an API key at [Google AI Studio](https://aistudio.google.com/apikey).

Alternatively, set the key in `server/index.js` (replace `YOUR_GEMINI_API_KEY_HERE`).

### 3. Run the application

**Terminal 1** – Backend:
```bash
cd server && npm run dev
```

**Terminal 2** – Frontend:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── data/           # Skills & interests dataset
│   └── pages/          # Route pages
├── server/
│   └── index.js        # Express + Gemini API
└── ...
```

## Extending Skills & Interests

Edit `src/data/skillsAndInterests.js` to add categories and items. The dataset covers Technology, Design, Business, Marketing, Finance, Science, Healthcare, Creative Arts, Engineering, Data & AI, and more.

## API

- `POST /api/recommend` – Send `{ skills: string[], interests: string[] }`, receive career recommendations.
- `GET /api/health` – Health check; indicates if Gemini is configured.

## Fallback Mode

If the Gemini API key is missing or the API fails, the server returns structured fallback recommendations based on the user's input.
