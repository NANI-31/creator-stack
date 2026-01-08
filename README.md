# 🚀 CreatorStack

<div align="center">

**Discover and Share the Web's Hidden Gems**

A modern, full-stack web application for curating and discovering high-quality websites, tools, and resources for developers, designers, and creators.

[![React](https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Admin Panel](#-admin-panel)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**CreatorStack** is a community-driven platform where users can submit, discover, and curate websites and tools. Think of it as a modern, beautifully designed alternative to ProductHunt or Indie Hackers, focused specifically on resources for the creative and developer community.

### Key Highlights

- 🔍 **Discover** trending tools, websites, and resources
- 📤 **Submit** your favorite finds for the community
- 👍 **Vote** on websites and comments (YouTube-style thumbs up/down)
- 💬 **Discuss** with threaded comments and replies
- 📚 **Save** websites to your personal collection
- 🛡️ **Role-based** admin panel with granular permissions

---

## ✨ Features

### For Users

| Feature                | Description                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| **Website Discovery**  | Browse curated websites by category, trending, top-rated, or newest |
| **Smart Search**       | Full-text search across website names, descriptions, and tags       |
| **Voting System**      | Upvote/downvote websites and comments with atomic updates           |
| **Comments & Replies** | Threaded discussions with "Most Helpful" badges                     |
| **Personal Dashboard** | Track your contributions, saved items, and activity                 |
| **Bookmarks**          | Save websites to your personal collection                           |
| **Notifications**      | Real-time notifications for comments, votes, and approvals          |

### For Admins

| Feature                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| **Submission Review**   | Approve, reject, or request changes for submitted websites   |
| **User Management**     | View, filter, and manage all users with role/status controls |
| **Role Management**     | Create custom roles with granular permission controls        |
| **Category Management** | Add, edit, and organize website categories                   |
| **Reports Center**      | Handle user-submitted reports for inappropriate content      |
| **Analytics Dashboard** | View platform metrics, user growth, and engagement           |
| **Audit Logs**          | Track all administrative actions for accountability          |
| **Platform Settings**   | Configure site-wide settings and preferences                 |

---

## 🛠️ Tech Stack

### Frontend

| Technology          | Purpose                                 |
| ------------------- | --------------------------------------- |
| **React 19**        | UI library with latest features         |
| **TypeScript**      | Type-safe development                   |
| **Vite 7**          | Lightning-fast build tool               |
| **Redux Toolkit**   | State management with async thunks      |
| **React Router v7** | Client-side routing                     |
| **Tailwind CSS v4** | Utility-first styling with custom theme |
| **React Hot Toast** | Toast notifications                     |
| **React Icons**     | Comprehensive icon library              |
| **date-fns**        | Date formatting utilities               |
| **Axios**           | HTTP client with interceptors           |

### Backend

| Technology             | Purpose                    |
| ---------------------- | -------------------------- |
| **Node.js**            | Runtime environment        |
| **Express 5**          | Web framework              |
| **TypeScript**         | Type-safe server code      |
| **MongoDB**            | NoSQL database             |
| **Mongoose 9**         | ODM with schema validation |
| **JWT**                | Authentication tokens      |
| **bcryptjs**           | Password hashing           |
| **Winston**            | Logging framework          |
| **Morgan**             | HTTP request logging       |
| **express-rate-limit** | API rate limiting          |

---

## 📁 Project Structure

```
creator-stack/
├── client/                     # Frontend React application
│   ├── src/
│   │   ├── app/               # Redux store configuration
│   │   ├── components/        # Shared UI components
│   │   │   └── ui/           # Button, Input, Spinner, etc.
│   │   ├── features/          # Feature-based modules
│   │   │   ├── admin/        # Admin panel (modular components)
│   │   │   │   ├── components/
│   │   │   │   │   ├── RoleManager/
│   │   │   │   │   ├── UserManager/
│   │   │   │   │   └── Categories/
│   │   │   │   ├── pages/
│   │   │   │   └── services/
│   │   │   ├── auth/         # Authentication (login, register)
│   │   │   ├── categories/   # Category browsing
│   │   │   ├── comments/     # Comment system
│   │   │   ├── dashboard/    # User dashboard & saved items
│   │   │   ├── notifications/# Notification system
│   │   │   └── websites/     # Website CRUD & voting
│   │   ├── services/         # Axios API configuration
│   │   ├── types/            # TypeScript interfaces
│   │   ├── App.tsx           # Root component with routing
│   │   └── index.css         # Global styles & theme
│   └── package.json
│
├── server/                    # Backend Express application
│   ├── src/
│   │   ├── config/           # Database & environment config
│   │   ├── controller/       # Request handlers
│   │   │   ├── admin.controller.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── category.controller.ts
│   │   │   ├── comment.controller.ts
│   │   │   ├── notification.controller.ts
│   │   │   ├── role.controller.ts
│   │   │   └── website.controller.ts
│   │   ├── middlewares/      # Auth, rate-limit, error handling
│   │   ├── model/            # Mongoose schemas
│   │   │   ├── user.model.ts
│   │   │   ├── website.model.ts
│   │   │   ├── category.model.ts
│   │   │   ├── comment.model.ts
│   │   │   ├── vote.model.ts
│   │   │   ├── role.model.ts
│   │   │   └── ...
│   │   ├── routes/           # API route definitions
│   │   ├── service/          # Business logic services
│   │   ├── utils/            # Helper functions
│   │   ├── app.ts            # Express app setup
│   │   └── index.ts          # Server entry point
│   ├── seed/                 # Database seeding scripts
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or Atlas cloud)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/creator-stack.git
   cd creator-stack
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables** (see [Environment Variables](#-environment-variables))

5. **Seed the database** (optional)

   ```bash
   cd server
   npm run seed
   ```

6. **Start the development servers**

   **Terminal 1 - Backend:**

   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**

   ```bash
   cd client
   npm run dev
   ```

7. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

---

## 🔐 Environment Variables

### Server (`server/.env`)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/creator-stack

# JWT Authentication
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| `POST` | `/api/auth/register` | Register a new user      |
| `POST` | `/api/auth/login`    | Login and get tokens     |
| `POST` | `/api/auth/refresh`  | Refresh access token     |
| `GET`  | `/api/auth/me`       | Get current user profile |

### Websites

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| `GET`  | `/api/websites`          | List all approved websites |
| `GET`  | `/api/websites/trending` | Get trending websites      |
| `GET`  | `/api/websites/:id`      | Get website details        |
| `POST` | `/api/websites`          | Submit a new website       |
| `POST` | `/api/websites/:id/vote` | Vote on a website          |

### Comments

| Method   | Endpoint                    | Description                |
| -------- | --------------------------- | -------------------------- |
| `GET`    | `/api/comments/website/:id` | Get comments for a website |
| `POST`   | `/api/comments`             | Create a new comment       |
| `POST`   | `/api/comments/:id/vote`    | Vote on a comment          |
| `DELETE` | `/api/comments/:id`         | Delete a comment           |

### Categories

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| `GET`  | `/api/categories`       | List all categories  |
| `GET`  | `/api/categories/:slug` | Get category by slug |

### Admin (Protected)

| Method  | Endpoint                            | Description              |
| ------- | ----------------------------------- | ------------------------ |
| `GET`   | `/api/admin/submissions`            | List all submissions     |
| `PATCH` | `/api/admin/submissions/:id/status` | Update submission status |
| `GET`   | `/api/admin/users`                  | List all users           |
| `PATCH` | `/api/admin/users/:id/role`         | Update user role         |
| `PATCH` | `/api/admin/users/:id/status`       | Suspend/ban user         |
| `GET`   | `/api/admin/analytics`              | Get platform analytics   |

---

## 🔑 Authentication

CreatorStack uses **JWT-based authentication** with access and refresh tokens.

### Token Flow

1. User logs in → receives `accessToken` (15min) and `refreshToken` (7 days)
2. Access token stored in memory/localStorage
3. Axios interceptor attaches token to all requests
4. On 401 error, client can refresh using `/auth/refresh`

### Role Hierarchy

| Role                           | Permissions                              |
| ------------------------------ | ---------------------------------------- |
| **User**                       | Browse, vote, comment, save, submit      |
| **Developer/Designer/Creator** | Same as User + profile badges            |
| **Moderator**                  | + Approve submissions, manage reports    |
| **Admin**                      | Full access to all features and settings |

---

## 🛡️ Admin Panel

The admin panel is accessible at `/admin` for users with `Admin` or `Moderator` roles.

### Dashboard Sections

| Section         | Description                                        |
| --------------- | -------------------------------------------------- |
| **Overview**    | KPIs, charts, recent activity                      |
| **Submissions** | Review and moderate website submissions            |
| **Users**       | Manage users, roles, and account status            |
| **Roles**       | Create and configure custom roles with permissions |
| **Categories**  | Manage website categories                          |
| **Reports**     | Handle flagged content reports                     |
| **Audit Logs**  | View all admin actions                             |
| **Settings**    | Configure platform settings                        |

### Permissions System

Roles can be configured with granular permissions:

- `WEBSITE_VIEW`, `WEBSITE_MANAGE`, `WEBSITE_APPROVE`
- `USER_VIEW`, `USER_MANAGE`, `USER_BAN`
- `ROLE_VIEW`, `ROLE_MANAGE`
- `CATEGORY_MANAGE`
- `REPORT_VIEW`, `REPORT_MANAGE`
- `ANALYTICS_VIEW`
- `AUDIT_VIEW`
- `SETTINGS_VIEW`, `SETTINGS_MANAGE`

---

## 🎨 Theming

CreatorStack uses a custom warm color palette defined in `client/src/index.css`:

```css
:root {
  --color-primary: #feeaf0; /* Light pink background */
  --color-secondary: #f0d0c7; /* Peach accent */
  --color-tertiary: #f09410; /* Orange primary */
  --color-quaternary: #bc430d; /* Dark orange */
  --color-quinary: #5e2207; /* Brown text */
  --color-sextary: #241705; /* Dark brown headings */
}
```

---

## 🧪 Running Tests

```bash
# Server tests (if configured)
cd server
npm test

# Client linting
cd client
npm run lint
```

---

## 📦 Building for Production

### Frontend

```bash
cd client
npm run build
```

Output will be in `client/dist/`.

### Backend

For production, use a process manager like PM2:

```bash
cd server
npm run build  # If using tsc
pm2 start dist/index.js --name creator-stack-api
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use meaningful commit messages
- Write component-level documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Heroicons](https://heroicons.com/) - Icons
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Database hosting

---

<div align="center">

**Made with ❤️ by the CreatorStack Team**

[Report Bug](https://github.com/yourusername/creator-stack/issues) · [Request Feature](https://github.com/yourusername/creator-stack/issues)

</div>
