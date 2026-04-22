# Gifora Web Application

This is a modern, full-stack React and Node.js application featuring real-time authentication and an artisanal design system.

## 🚀 How to Run the Application

Because this project is split into a frontend UI and a backend API, you will need to run commands in separate terminal windows.

### 1. Frontend (React / Vite)
This starts the user interface on `localhost:5173`.
*Open a terminal in the **root** folder (`gifora's website`) and run:*
```bash
pnpm run dev
```

### 2. Backend (Node.js / Express / WebSockets)
This starts the backend API and real-time Socket.io server on `localhost:5000`.
*Open a **second** terminal, navigate to the server folder, and run:*
```bash
cd server
pnpm run dev
```
*(Note: You can also use `pnpm start`, but `pnpm run dev` will automatically restart the server if you make code changes).*

---

## 🗄️ Database Management (Prisma)

The application uses an SQLite database managed by Prisma. All database commands must be run from inside the `server/` directory.

### Open Prisma Studio (Database GUI)
To view, edit, or delete the data in your database visually in your web browser:
*Open a **third** terminal and run:*
```bash
cd server
npx prisma studio
```
This will open a web interface (usually at `http://localhost:5555`) where you can see your Users, Products, and Orders.

### Push Schema Changes
If you ever modify the `server/prisma/schema.prisma` file to add new tables or columns, you must push those changes to the database:
```bash
cd server
npx prisma db push
```