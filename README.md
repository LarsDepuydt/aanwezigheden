# Aanwezigheden
Contains the frontend and backend of the application

Build and run the app (with Docker Compose)
```bash
docker compose --env-file ./backend/.env.local up --build
```

## Local hosting
### Frontend
Build Docker image
```bash
docker build -t aanwezigheden-frontend .
```

Run Docker container
```bash
docker run -p 80:80 aanwezigheden-frontend
```

### Backend
Build Docker image
```bash
docker build -t aanwezigheden-backend .
```

Run Docker container
```bash
docker run -p 5000:5000 aanwezigheden-backend
```
