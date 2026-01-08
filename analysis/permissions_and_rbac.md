# Permissions & RBAC Analysis - CreatorStack

## Strategy

CreatorStack implements a multi-layered security model ensuring that users can only access data and actions appropriate for their role.

## 1. Authentication Layer

- **Mechanism**: JWT (JSON Web Token) based authentication.
- **Persistence**: Tokens are stored securely in local storage/cookies (Frontend) and verified on the backend via the `protect` middleware.
- **Middleware**: `auth.middleware.ts` extracts the Bearer token, verifies it against `JWT_ACCESS_SECRET`, and attaches the `user` object to the request.

## 2. Role-Based Access Control (RBAC)

The platform defines specific roles: `Developer`, `Designer`, `Creator`, `Editor`, `Moderator`, and `Admin`.

### Authorization Logic

- **`authorize(...roles)` Middleware**: Restricts access to specific endpoints based on user roles.
- **Admin Suite Protection**: All routes under `/api/admin/*` are strictly locked to `["Admin", "Moderator"]`.

### Route Mapping

| Feature         | Required Role | Implementation                    |
| :-------------- | :------------ | :-------------------------------- |
| Submit Website  | Any Auth User | `protect` middleware              |
| View Analytics  | Admin/Mod     | `authorize("Admin", "Moderator")` |
| Manage Users    | Admin         | `authorize("Admin")`              |
| Modify Settings | Admin         | `authorize("Admin")`              |

## 3. UI-Level Security

- **Protected Routes**: The React frontend uses a `ProtectedRoute` component to prevent unauthenticated users from accessing internal pages.
- **Conditional Rendering**: Navigation items (like the "Admin Dashboard" link) are only rendered if the user's role matches the requirements.

## 4. Current Findings

- **Security Check**: Permissions are correctly enforced on the backend. Even if a user "force navigates" on the frontend, the API will reject unauthorized requests with a `403 Forbidden`.
- **Status Checks**: The backend `user.model` now tracks `Active/Suspended/Banned`. The `protect` middleware should be extended to block `Banned` users from generating new tokens or accessing protected resources.
