````md
# Browser-Based Developer Sandbox

A MERN-based browser IDE where users can create, edit, run, and preview React projects directly inside the browser without requiring local setup.

---



# Tech Stack

## Frontend
- React
- Vite
- Zustand
- Monaco Editor
- Sandpack

## Backend
- Node.js
- Express.js
- MongoDB Atlas


---

# Features

- Create files and folders
- Edit and delete files
- Rename files
- Live React preview
- Run button for sandbox execution
- Monaco code editor integration
- Dynamic npm package installation
- MongoDB project persistence
- localStorage persistence
- Browser-based coding workflow

---

# Project Architecture

The application is divided into two major parts:

## Frontend

The frontend is built using React and Vite. Zustand is used for centralized state management because multiple IDE features share application state, including:

- File structure
- Active editor file
- Run triggers
- Installed dependencies
- Persistence state

Monaco Editor provides the code editing experience, while Sandpack is used to execute and preview React projects directly inside the browser.

Whenever a file is created, updated, renamed, or deleted:
1. Zustand state updates first
2. localStorage syncs instantly
3. Backend APIs save the updated project to MongoDB

This architecture ensures responsive UI updates and persistent project storage.

---

## Backend

The backend is built using Express.js and MongoDB Atlas.

REST APIs are used for:
- Saving project state
- Loading saved projects

MongoDB stores:
- File structure
- File contents
- Project metadata

Dynamic file objects are stored using flexible MongoDB schema structures to support browser IDE workflows.

---

# AI Usage Strategy

AI tools were used mainly as productivity and debugging assistants during development.

I used AI selectively for:
- Sandpack integration guidance
- MongoDB persistence debugging
- Deployment troubleshooting
- Zustand architecture improvements
- npm package installation logic
- Error debugging and dependency fixes

Example prompts:
- "How to integrate Sandpack with dynamic React files"
- "Fix MongoDB persistence for nested objects"
- "Implement npm package installation in browser sandbox"
- "Deploy MERN frontend and backend separately"

AI accelerated implementation speed and debugging, but the overall architecture decisions, state synchronization flow, API integration, and deployment setup were implemented and verified manually.

---

# Technical Decisions & Tradeoffs

## Why Zustand instead of Redux?
Zustand provides lightweight global state management with simpler boilerplate, which was more suitable for rapid IDE development.

## Why Sandpack?
Building a custom containerized runtime would significantly increase complexity. Sandpack provides secure browser-based React execution with fast setup and good developer experience.

## Why MongoDB?
The IDE stores dynamic file structures and nested objects, making MongoDB a better fit than a rigid relational schema.

## Why localStorage?
localStorage improves responsiveness and prevents temporary data loss during refreshes before backend synchronization completes.

---

# Challenges Faced

- Synchronizing Monaco Editor with Sandpack preview
- Persisting deeply nested dynamic file objects
- Handling React live preview updates
- Managing deployment communication between frontend and backend
- Dynamic dependency installation inside browser sandbox

---

# Known Limitations

- Nested folder rendering is basic
- Package installation currently supports frontend dependencies only
- No real terminal execution
- No authentication system
- No collaborative editing
- React-only execution environment

---

# Future Improvements

- Real terminal support
- Docker/containerized execution
- Multi-language support
- Authentication and multiple projects
- WebSocket-based collaboration
- Better folder tree UI
- Resizable IDE panels

---



## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Backend Setup

```bash
cd server
npm install
npm start
```

---

# Environment Variables

## Frontend



## Backend

```env
MONGO_URI= mongodb+srv://dikshaIDE:raidiksha@cluster0.iw55cgk.mongodb.net/idea?retryWrites=true&w=majority
PORT=5001
```

---




---

```
```
