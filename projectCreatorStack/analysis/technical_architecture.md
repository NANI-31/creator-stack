# Technical Architecture

## Current Stack

- **Frontend**: React 19 (Vite), Redux Toolkit, React Router, Axios.
- **Styling**: Tailwind CSS v4.
- **Backend**: Node.js, Express.js (v5), TypeScript.
- **Database**: MongoDB (via Mongoose).
- **Authentication**: JWT, Bcrypt.js (OAuth planned).

## Architecture Observations

- **Modularity**: The codebase follows a clean separation of concerns with controllers, services, and models on the backend, and features/components on the frontend.
- **Type Safety**: Strong use of TypeScript across both client and server.
- **Logging**: Integrated Winston for backend logging, which is excellent for maintenance.

## Opportunities for Improvement

- **SSR/SEO**: For a discovery platform, SEO is critical. Consider migrating to **Next.js** or implementing a Pre-rendering solution if organic search traffic is a priority.
- **Real-time**: Adding Socket.io could enhance the voting and comment experience with live updates.
