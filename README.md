# Movie Project

A full-stack web application for discovering, rating, and managing your favorite movies and series.

## Features

- User authentication (Sign Up / Sign In)
- Search for movies using the OMDb API
- View detailed movie information and user comments
- Add movies to Favorites and Planned lists
- Rate and comment on movies
- Responsive UI with React and Tailwind CSS

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose
- **API:** OMDb API

## Project Structure

```
.
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.ts
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── ...
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Setup

#### 1. Clone the repository

```sh
git clone https://github.com/roeytamano/movie-project.git
cd movie-project
```

#### 2. Configure Environment Variables

Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_connection_string
OMDB_API_KEY=your_omdb_api_key
```

#### 3. Install Dependencies

Install backend dependencies:

```sh
npm install
```

Install frontend dependencies:

```sh
cd frontend
npm install
```

#### 4. Run the Application

Start the backend server:

```sh
npm run dev
```

Start the frontend development server (in a new terminal):

```sh
cd frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

See the backend route files for details:
- [backend/routes/users.route.ts](backend/routes/users.route.ts)
- [backend/routes/movies.route.ts](backend/routes/movies.route.ts)
- [backend/routes/ratings.route.ts](backend/routes/ratings.route.ts)

## License

This project is licensed under the ISC License.
