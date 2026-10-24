# Betta Manager Backend API

The Betta Manager backend is an Express and TypeScript API. It stores aquarium data in MongoDB Atlas, protects private routes with JWT authentication, and provides an AI aquarium review endpoint powered by Google Gemini.

## Live applications

- **Frontend:** [https://itelect4-project-belen.vercel.app/login](https://itelect4-project-belen.vercel.app)
email: 123example@email.com
password: test123@123
- **Backend API:** [https://itelect4-backend-belen.vercel.app](https://itelect4-backend-belen.vercel.app)
- **API health check:** [https://itelect4-backend-belen.vercel.app/api/health](https://itelect4-backend-belen.vercel.app/api/health)

## GitHub repositories

- **Frontend repository:** [RavenBelen/itelect4-project-belen](https://github.com/RavenBelen/itelect4-project-belen)
- **Backend repository:** [RavenBelen/itelect4-backend-belen](https://github.com/RavenBelen/itelect4-backend-belen)

## Technology

- Node.js, Express, and TypeScript
- MongoDB Atlas with Mongoose
- JWT authentication
- Zod request and AI response validation
- Google Gemini API
- Express rate limiting
- Vercel deployment

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the values:

   ```text
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_long_random_secret
   CORS_ORIGIN=http://localhost:5173,https://itelect4-project-belen.vercel.app
   GEMINI_API_KEY=your_google_ai_studio_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The local API runs at `http://localhost:4000` by default. Keep `.env` private; never commit it or share API key values. The `.env.example` file contains placeholders only.

## Build

```bash
npm run build
```

## API endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/health` | Checks API and database health | No |
| POST | `/api/auth/register` | Creates an account | No |
| POST | `/api/auth/login` | Signs in and returns a JWT | No |
| GET | `/api/bettas` | Lists the signed-in user's bettas | Bearer token |
| GET | `/api/bettas/:id` | Gets one of the signed-in user's bettas | Bearer token |
| POST | `/api/bettas` | Adds a betta | Bearer token |
| PATCH | `/api/bettas/:id` | Updates a betta | Bearer token |
| DELETE | `/api/bettas/:id` | Deletes a betta | Bearer token |
| GET | `/api/plants` | Lists the signed-in user's plants | Bearer token |
| POST | `/api/plants` | Adds a plant | Bearer token |
| DELETE | `/api/plants/:id` | Deletes a plant | Bearer token |
| GET | `/api/tanks` | Lists the signed-in user's tanks | Bearer token |
| POST | `/api/tanks` | Adds a tank | Bearer token |
| DELETE | `/api/tanks/:id` | Deletes a tank | Bearer token |
| POST | `/api/ai` | Reviews aquarium notes with Gemini | Bearer token |

### Authentication

After logging in, send the returned JWT with protected requests:

```http
Authorization: Bearer YOUR_TOKEN
```

### AI review request

Send a JSON body with a `prompt` containing 20–2000 characters:

```json
{
  "prompt": "My betta lives in a heated, filtered aquarium, and I check the water regularly."
}
```

A successful response contains `summary`, `strengths`, `improvements`, and `status`. The status is `healthy`, `monitor`, or `needs-attention`. The AI endpoint is limited to 10 requests per authenticated user per hour.

## Environment variables

Set these in the backend's local `.env` file and in the backend Vercel project's environment settings:

- `MONGODB_URI` — MongoDB Atlas connection string.
- `JWT_SECRET` — private secret used to sign login tokens.
- `GEMINI_API_KEY` — private Google AI Studio API key.
- `CORS_ORIGIN` — comma-separated allowed frontend origins.
- `PORT` — local server port; defaults to `4000`.

For Vercel, include the production frontend origin in `CORS_ORIGIN`. Do not add a trailing slash to an origin.
