# System Architecture - CreatorStack

## 1. Stack Overview

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT (Stateless)

## 2. Modular Structure

### Frontend (`/client/src`)

- **`features/`**: Domain-driven modules (Admin, Auth, Websites). Each contains its own components, services, and state.
- **`components/ui/`**: Atomic design system components (Button, Modal, Input).

### Backend (`/server/src`)

- **`controller/`**: Orchestrates requests and invokes models.
- **`model/`**: Defines data schemas and constraints.
- **`middlewares/`**: Handles cross-cutting concerns (Auth, Error handling, Rate limiting).
- **`routes/`**: maps API endpoints to controller functions.

## 3. Reliability Measures

- **Rate Limiting**: Backend includes a `rateLimit.middleware` to prevent DDoS and brute force.
- **Error Handling**: Centralized `errorHandler` ensures consistent JSON error responses.
- **Validation**: Schema-level validation in MongoDB ensures data quality.

## 4. Scalability

- **Horizontal Scaling**: The stateless JWT approach allows the backend to be scaled horizontally across multiple instances.
- **Code Splits**: Frontend uses modular imports, though large chunk warnings suggest further optimization via dynamic `import()` is possible for the Admin suite.
