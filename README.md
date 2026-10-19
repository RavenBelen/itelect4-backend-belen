
### Backend `README.md`

```markdown
# Betta Manager — Backend API

This repository contains the Express and TypeScript API for Betta Manager. It uses MongoDB Atlas for data storage and JWT authentication for protected routes.

## Live API

[Backend API](https://itelect4-backend-belen.vercel.app)  
[Health check](https://itelect4-backend-belen.vercel.app/api/health)

## API Routes

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check API and database health |
| POST | `/api/auth/register` | Register an account |
| POST | `/api/auth/login` | Sign in and receive a JWT |
| GET, POST | `/api/bettas` | List or add betta fish |
| GET, DELETE | `/api/bettas/:id` | Get or delete a betta fish |
| GET, POST | `/api/plants` | List or add aquatic plants |
| DELETE | `/api/plants/:id` | Delete an aquatic plant |
| GET, POST | `/api/tanks` | List or add aquarium tanks |
| DELETE | `/api/tanks/:id` | Delete an aquarium tank |

Betta, plant, and tank routes require a JWT. Send it as:

```text
Authorization: Bearer YOUR_TOKEN
