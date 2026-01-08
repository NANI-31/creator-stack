# Data Flow Analysis - CreatorStack

## Overview

This document analyzes the end-to-end data flow between the CreatorStack client and server, focusing on how user actions transition from UI interactions to database persistence.

## 1. Request/Response Cycle

The project uses a standard RESTful architecture:

- **Frontend**: Built with React, using a modular feature-based structure (`features/`). API calls are abstracted into service files (e.g., `auth.service.ts`).
- **Backend**: Express.js server with a Controller-Service-Model architecture.
- **Payload**: JSON is the primary data exchange format.

## 2. Key Data Pathways

### Submission Flow

1. **User Input**: User fills the submission form in `WebsiteSubmissionForm.tsx`.
2. **Dispatch**: Form data is sent via `website.service.ts` to `POST /api/websites`.
3. **Controller**: `website.controller.ts` validates the input and creates a `Website` document with state `Pending`.
4. **Admin Review**: Admins view pending sites in `SubmissionsManager.tsx`.
5. **Update**: Clicking "Approve" hits `PATCH /api/admin/submissions/:id/status`, updating the MongoDB document to `Approved`.

### Moderation Flow

1. **Report Generation**: Users flag content, hitting `POST /api/admin/reports` (to be fully integrated with frontend report buttons).
2. **Listing**: Reports are fetched by `ReportsManager.tsx` via `GET /api/admin/reports`.
3. **Decision**: Moderation actions (Resolve/Dismiss) hit `PATCH /api/admin/reports/:id/status`.

## 3. State Management

- **Redux**: Used for global UI state (Auth status, Notifications).
- **Local State**: used for form data and transient UI toggles in components like `AdminSettings`.

## 4. Observations

- **Consistency**: The `admin.controller.ts` consistently uses 200/500 status codes.
- **Optimization**: Currently, data fetching is mostly direct. Implementing caching in `Advanced Settings` (backend) is planned but currently exists as a placeholder.
- **Validation**: Backend uses a `validate` middleware to ensure data integrity before reaching controllers.
