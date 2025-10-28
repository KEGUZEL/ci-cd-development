# 🚀 CI/CD Development Project

This project demonstrates a **complete CI/CD pipeline setup** for a full-stack web application using modern DevOps tools and practices.  
It automates the **build, test, and deployment** processes through GitHub Actions, Docker, and Compose-based infrastructure.

---

## 🧱 Project Structure

- **.github/workflows/** — CI/CD pipelines (build & deploy jobs)  
- **apps/web/** — Frontend (React or Vite)  
- **services/api/** — Backend (FastAPI)  
- **infra/docker/** — Docker and deployment configurations  
- **docker-compose.yml** — Local development setup  
- **docker-compose.deploy.yml** — Production deployment setup  
- **.env** — Environment configuration

---

## ⚙️ Technologies Used

- **Backend:** FastAPI (Python)
- **Frontend:** React (JavaScript)
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions
- **Infrastructure:** Traefik reverse proxy (optional for deployment)
- **Version Control:** Git & GitHub

---

## 🧩 Features

- Automated build and push of Docker images  
- Deployment pipeline triggered on push to `main`  
- Separate environments for development and production  
- Modular folder structure (frontend, backend, infra)

---

## 🔄 CI/CD Workflow

- Every push to `main` triggers:
  1. **Build**: Docker images for API and Web  
  2. **Test**: Basic validation and linting  
  3. **Deploy**: Automatic deployment to server (via SSH job)

Example workflow:  
```yaml
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker compose build
