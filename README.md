# Dental Office Backend

TypeScript/Node.js REST API for the **Dental Office Management System**. Handles authentication, users, dentists, services, schedules, slots, and appointments. Designed for containerized deployment on **AWS EKS**, using a managed SQL database (e.g., **AWS RDS**).

> This repository is used as a Git submodule in the main infra/mono repo.

---

## ✨ Highlights

- **TypeScript + Node.js** (Express-style app entry in `src/app.ts`)
- **Modular structure**: controllers, routes, models, middleware
- **JWT auth** for protected endpoints (`Authorization: Bearer <token>`)
- **SQL database** via an ORM/DB layer (see `src/models/*` and `src/config/db.ts`)
- **Seed script** for bootstrap data (`src/seed/seed.ts`)
- **Docker-ready** with a production `Dockerfile`
- **Kubernetes manifests** live in the infra repo (image pulled from AWS ECR)

---

## 🗂️ Project Structure

```
apps/dental-office-backend/
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ certs/
│  └─ ap-southeast-2-bundle.pem         # (optional) RDS SSL bundle
└─ src/
   ├─ app.ts                             # Express app bootstrap
   ├─ config/
   │  └─ db.ts                           # DB connection
   ├─ controllers/                       # Route controllers
   ├─ middleware/                        # Auth & role guards
   ├─ models/                            # Sequelize/ORM models
   ├─ routes/                            # Route definitions
   └─ seed/
      └─ seed.ts
```

---

## 🗄️ Model Relationships

The database schema follows these relationships:

- **User**
  - `User` has many `Appointment`
  - `User` can have a `role` (e.g., `admin`, `patient`)
- **Dentist**
  - `Dentist` has many `Schedule`
  - `Dentist` has many `Service`
- **Service**
  - Linked to `Appointment` to specify type of service
- **Schedule**
  - Belongs to `Dentist`
  - Has many `Slot`
- **Slot**
  - Belongs to a `Schedule`
  - Has `SlotOption` for standard slots
- **Appointment**
  - Belongs to a `User`
  - Belongs to a `Dentist`
  - Belongs to a `Slot`
  - References a `Service`
- **SlotOption**
  - Represents alternative times/options within schedule

> Associations are defined in `src/models/index.ts`.  
> This structure supports flexible scheduling, rescheduling, and service assignment.

---

## ⚙️ Environment Variables

Create `.env` at the backend root (or inject via Kubernetes Secret):

```
# Database
DB_HOST=<rds-endpoint>
DB_PORT=5432
DB_NAME=<db-name>
DB_USERNAME=<db-user>
DB_PASSWORD=<db-password>

# App
PORT=8000
JWT_SECRET=<strong-random-secret>
```

> In Kubernetes, these are provided by `backend-secret` and consumed in `backend-deployment.yaml`.

---

## 🧑‍💻 Local Development

```bash
npm install
npm run dev
```

With Docker:

```bash
docker build -t dental-office-backend .
docker run -p 8000:8000 dental-office-backend
```

---

## 🌱 Seeding

```bash
npm run seed
```
> Populates services, sample users, and dentists. Uses `.env` for DB config.

---

## 🔗 API Overview

**Auth**
- `POST /auth/register`
- `POST /auth/login`

**Users**
- `GET /users/me`
- `GET /users/:id` _(admin)_
- `PATCH /users/:id`

**Dentists & Services**
- `GET /dentists`
- `GET /services`

**Schedules & Slots**
- `GET /schedules?dentistId=&date=`
- `GET /slots?dentistId=&date=`

**Appointments**
- `POST /appointments`
- `PATCH /appointments/:id`
- `DELETE /appointments/:id`

---

## 🚀 Deployment (EKS/ECR)

```bash
aws ecr get-login-password --region ap-southeast-2   | docker login --username AWS --password-stdin 248189921368.dkr.ecr.ap-southeast-2.amazonaws.com

docker tag dental-office-backend:latest   248189921368.dkr.ecr.ap-southeast-2.amazonaws.com/dental-office-backend:latest

docker push 248189921368.dkr.ecr.ap-southeast-2.amazonaws.com/dental-office-backend:latest
```

Kubernetes (from infra repo):

```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl rollout restart deployment/backend-deployment
```

---

## 🧭 Roadmap Ideas

- Extended Admin functionalities
- Pagination and filters
- Tests (Jest)