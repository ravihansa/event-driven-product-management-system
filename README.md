# Event-Driven Product Management System

A **full-stack event-driven product management application** built with:

- **Backend:** Node.js, Express, Prisma ORM, MySQL  
- **Frontend:** React.js,
- **Real-time:** Server-Sent Events (SSE) for notifications  

---

## Features

- User-friendly **Product Dashboard**  
- CRUD operations for Products (Create, Read, Update, Delete)    
- **Notifications system** using SSE (real-time updates)  

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/ravihansa/event-driven-product-management-system.git
cd event-driven-product-management-system
```

---

### 2. Setup Backend

```bash
cd nodejs-backend
npm install
```

Rename the `.env.sample` file in `nodejs-backend/` as `.env`:
```env
.env.sample ➜ .env
```

Run Prisma migrations:
```bash
npx prisma generate
npx prisma migrate dev --schema ./prisma
```

Start backend:
```bash
npm run start
```

---

### 3. Setup Frontend

```bash
cd ../react-frontend
npm install
```

Rename the `.env.example` file in `react-frontend/` as `.env`:
```env
.env.example ➜ .env
```

Start frontend:
```bash
npm run start
```

---

### 4. Run both (root)

From the project root, run **both backend & frontend** together:

```bash
npm install
npm run dev
```

> This uses [concurrently](https://www.npmjs.com/package/concurrently) to launch both servers.

---
