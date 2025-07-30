# 📦 Smart Inventory Management System

A full-stack inventory management system built with **React**, **Node.js**, **Express**, **Prisma**, and **PostgreSQL**. The system predicts reorders and simulates demand spikes to prevent stockouts and optimize inventory levels.

---

## 🚀 Features

- 📊 **Reorder Report**: Automatically calculates products that need to be reordered.
- 🔁 **Reorder Quantity**: Suggests optimal reorder quantity for the next 60 days.
- 📉 **Days of Stock Remaining**: Estimates how long current stock will last.
- ⚠️ **Safety Stock Threshold**: Triggers reorders if stock falls below safe levels.
- 🔮 **Demand Spike Simulation**: Simulate sudden sales surges per product.
- 📋 **Copy Product ID**: Quick copy feature for testing and tracking.

---

## 🧱 Tech Stack

- **Frontend**: React, TailwindCSS, ShadCN UI, Axios
- **Backend**: Node.js, Express, Prisma
- **Database**: PostgreSQL (with Prisma ORM)
- **Tooling**: Vite, TypeScript, Docker (optional)

---

## 📁 Project Structure

### Frontend (`frontend/`)

| File / Folder                         | Purpose |
|--------------------------------------|---------|
| `public/index.html`                  | Base HTML file |
| `src/main.tsx`                       | React DOM entry |
| `src/App.tsx`                        | Wraps dashboard with context along with the routes for 2 pages "/" :dashboard and "/simulate" : for spike simulation |
| `src/pages/Dashboard.tsx`           | Main report page |
| `src/components/Navbar.tsx`         | App header |
| `src/components/Reorder.tsx`  | Displays reorder report |
| `src/components/Simulate.tsx`  | UI to simulate demand spikes |
| `src/context/Context.tsx`           | Global state via Context API |
| `src/services/api.ts`               | Axios base config |
| `index.css`                          | TailwindCSS setup |

### Backend (`backend/`)

| File / Folder                  | Purpose |
|-------------------------------|---------|
| `server.ts`                   | Express server entry |
| `/modules/routes/product.routes.ts`         | API endpoints: `/reorder-report`, `/simulate-spike` |
| `/modules/services/reorderservice.ts`  | Reorder logic and simulation logic |
| `prisma/schema.prisma`        | Database schema (Product model) |
| `prisma/seed.ts`              | Seed data for testing |
| `.env`                        | DB connection string |

---

## Setup

### Prerequisites

- Node.js (v18+)
- PostgreSQL installed and running

---

### 1. Clone the Repository

```bash
git clone https://github.com/Bajpai25/Smart_inventory.git
cd Smart_inventory
