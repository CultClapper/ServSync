# ServSync

A full-stack web application for coordinated service scheduling and orchestration with takt-based rhythm management.

## Project Structure

```
ServSync/
├── backend/          # Node.js + Express + MongoDB backend
│   ├── src/
│   │   ├── models/   # MongoDB schemas
│   │   ├── routes/   # API routes
│   │   ├── services/ # Business logic
│   │   ├── middleware/ # Auth middleware
│   │   ├── app.js    # Express app configuration
│   │   └── server.js # Server entry point
│   └── package.json
└── frontend/         # React + Vite frontend
    ├── src/
    │   ├── pages/    # React page components
    │   ├── api/      # API client
    │   └── App.jsx   # Main app component
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
   
   Or create it manually with:
   ```
   MONGO_URI=mongodb://localhost:27017/servsync
   JWT_SECRET=supersecretkey
   JWT_EXPIRES_IN=7d
   PORT=4000
   ```

4. Make sure MongoDB is running on your system.

5. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

## Creating Your First User

Since the app requires authentication, you'll need to create a user first. You can do this by:

1. Using a tool like Postman or curl to POST to `/api/auth/register`:
   ```bash
   curl -X POST http://localhost:4000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Admin User","email":"admin@example.com","password":"password123","role":"admin"}'
   ```

2. Or add a registration page to the frontend (currently only login is implemented).

## Features

- **Service Groups**: Organize services into groups with priorities
- **Services**: Define services with duration and capacity
- **Takt Configuration**: Configure working rhythm (takt time, working hours, timezone)
- **Schedule Generation**: Automatically generate time slots based on takt rhythm
- **Schedule Management**: View and update schedule slots with status and allocation

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Services
- `GET /api/services/groups` - Get all service groups
- `POST /api/services/groups` - Create a service group
- `GET /api/services` - Get all services
- `POST /api/services` - Create a service
- `PATCH /api/services/:id` - Update a service

### Takt
- `GET /api/takt/config` - Get current takt configuration
- `PUT /api/takt/config` - Update takt configuration
- `POST /api/takt/generate` - Generate schedule slots for a date

### Schedules
- `GET /api/schedules?date=YYYY-MM-DD` - Get schedule slots for a date
- `PATCH /api/schedules/:id` - Update a schedule slot

## Technologies

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Luxon for date/time handling

**Frontend:**
- React 18
- React Router
- Vite
- Axios
- Tailwind CSS (via CDN)

## License

MIT

