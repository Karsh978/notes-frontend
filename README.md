# Notes App — Frontend

A React frontend for the [Notes API](#) *(link your backend repo here)*, a Spring Boot backend. Built with Vite, styled with Tailwind CSS.

## Tech Stack

- React (Vite)
- Axios — API calls
- Tailwind CSS — styling

## Features

- View all notes in a responsive card grid
- Add a new note via a form
- Delete a note
- Connects to a Spring Boot REST API running on `localhost:8080`

## Running Locally

Make sure the [backend](#) is running first on `http://localhost:8080`.

```bash
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Project Structure

```
src/
├── api.js       → All API calls (Axios) in one place
├── App.jsx        → Main component — notes list + create/delete form
└── index.css      → Tailwind import
```

## Backend

Pairs with a Spring Boot REST API: [notes-api-springboot](#) *(link your backend repo here)*

## What I learned building this

This was built after learning the same patterns in MERN — the main differences were:

- The API base URL points to a Spring Boot server (`:8080`) instead of Express (`:5000` typically)
- CORS had to be explicitly enabled on the Spring Boot side (`@CrossOrigin`) for the frontend to talk to it, similar to the `cors` npm package in Express
- Otherwise, `useState`, `useEffect`, and Axios calls work exactly the same regardless of what backend framework is on the other end — which is really the point of decoupling frontend and backend.
