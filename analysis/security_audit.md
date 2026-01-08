# CreatorStack - Security & Code Quality Audit

## Executive Summary

This report details a critical review of the CreatorStack MERN-stack project to assess its production readiness. The audit reveals **several critical and high-severity issues** that **must be resolved before production deployment**, particularly concerning secret management and authentication.

---

## 1. Security Risks

### 1.1. 🔥 **CRITICAL: Hardcoded Secrets in `.env` Committed to Codebase**

- **Location**: `server/.env`
- **Problem**: The `.env` file contains a **live MongoDB Atlas connection string** with plaintext username and password (`nani:nani`). JWT secrets are also set to placeholder values (`your_jwt_secret_key`).
- **Severity**: **CRITICAL**
- **Why It's Risky**: If this repository is public or becomes public, attackers gain full read/write access to your database. The weak JWT secrets can be brute-forced to forge authentication tokens.
- **Fix**:
  1.  **Immediately** rotate the MongoDB password in Atlas.
  2.  Add `server/.env` to `.gitignore` (it should never be committed).
  3.  Use a `.env.example` file with placeholder keys only.
  4.  Use a secrets manager (e.g., AWS Secrets Manager, Doppler) in production.

---

### 1.2. 🔥 **CRITICAL: Rate Limiting Middleware is Empty**

- **Location**: `server/src/middlewares/rateLimit.middleware.ts`
- **Problem**: The file is completely empty. There is no rate limiting implemented.
- **Severity**: **CRITICAL**
- **Why It's Risky**: The server is vulnerable to brute-force attacks on login, DDoS, and resource exhaustion. An attacker can try millions of passwords with no throttling.
- **Fix**:
  ```typescript
  import rateLimit from "express-rate-limit";
  export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15-minute window
    max: 5, // Limit each IP to 5 login attempts per window
    message: "Too many login attempts. Please try again later.",
  });
  ```
  Apply `loginLimiter` to `/api/auth/login` and register routes.

---

### 1.3. 🟠 **HIGH: Banned Users Can Still Generate Tokens**

- **Location**: `server/src/middlewares/auth.middleware.ts`
- **Problem**: The `protect` middleware checks if a user exists, but it does not check the user's `status` field. A `Banned` user can still use their existing token or log in again.
- **Severity**: **HIGH**
- **Why It's Risky**: Moderation actions are ineffective if banned users can continue to act on the platform.
- **Fix**:
  ```typescript
  if (!user || user.status === "Banned") {
    return sendError(res, 401, "Account is banned or does not exist.");
  }
  ```

---

### 1.4. 🟠 **HIGH: JWT Stored in `localStorage` (XSS Risk)**

- **Location**: `client/src/features/auth/slice/auth.slice.ts` (Lines 91, 108)
- **Problem**: Access and refresh tokens are stored in `localStorage`. This makes them accessible via JavaScript, meaning any XSS vulnerability can steal all user credentials.
- **Severity**: **HIGH**
- **Why It's Risky**: All users can be compromised if a single XSS vulnerability exists anywhere in the app.
- **Fix**: Store the **refresh token** in an `HttpOnly, Secure` cookie. The access token can stay in memory (Redux state) and be short-lived. Implement a `/api/auth/refresh` endpoint.

---

### 1.5. 🟡 **MEDIUM: CORS Whitelist Only Contains `localhost`**

- **Location**: `server/src/config/cors.ts`
- **Problem**: The `allowedOrigins` only includes `localhost`. This will break in production.
- **Severity**: **MEDIUM**
- **Why It's Risky**: API will reject all requests from your production frontend domain.
- **Fix**: Load origin from an environment variable.
  ```typescript
  const allowedOrigins = (process.env.CORS_ORIGINS || "").split(",");
  ```

---

## 2. Backend Issues

### 2.1. 🟠 **HIGH: Missing Input Validation on Admin Endpoints**

- **Location**: `server/src/controller/admin.controller.ts`
- **Problem**: Endpoints like `updateUserRole` directly apply `req.body.role` to the database without validating if it's a permitted role value.
- **Severity**: **HIGH** (NoSQL Injection / Logic Bypass)
- **Why It's Risky**: An attacker could potentially inject invalid role strings or even object payloads.
- **Fix**: Use a validation library like `zod` or `joi` to whitelist allowed values.
  ```typescript
  const allowedRoles = ["Developer", "Designer", "Moderator", "Admin"];
  if (!allowedRoles.includes(req.body.role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  ```

---

### 2.2. 🟡 **MEDIUM: Inconsistent Error Response Format**

- **Location**: `admin.controller.ts`, `category.controller.ts`
- **Problem**: `admin.controller` uses `res.status(500).json({ message })`, while `category.controller` uses the `sendError` utility. This inconsistency can make frontend error handling difficult.
- **Severity**: **MEDIUM**
- **Fix**: Refactor all controllers to use the `sendResponse` / `sendError` utilities consistently.

---

### 2.3. 🟡 **MEDIUM: Unused `Category` Import in `admin.controller.ts`**

- **Location**: `server/src/controller/admin.controller.ts` (Line 6)
- **Problem**: `Category` is imported but never used in the file.
- **Severity**: **LOW**
- **Fix**: Remove the unused import.

---

## 3. Frontend Issues

### 3.1. 🟡 **MEDIUM: Initial State Read from `localStorage` is Blocking**

- **Location**: `client/src/features/auth/slice/auth.slice.ts` (Line 14)
- **Problem**: `JSON.parse(localStorage.getItem("user") || "null")` is executed synchronously during Redux store initialization. If `localStorage` contains malformed data, the entire app will crash.
- **Severity**: **MEDIUM**
- **Fix**: Wrap in a try-catch.
  ```typescript
  const getUserFromStorage = (): User | null => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  };
  const initialState = { user: getUserFromStorage(), ... };
  ```

---

### 3.2. 🟢 **LOW: Numerous Tailwind Class Shorthand Linting Warnings**

- **Location**: Multiple files in `client/src/features/admin/`
- **Problem**: Using arbitrary values like `rounded-[2rem]` instead of `rounded-4xl`. The linter flags these.
- **Severity**: **LOW** (Stylistic)
- **Fix**: Replace arbitrary values with Tailwind's standard utility classes for maintainability.

---

## 4. Performance & Scalability

### 4.1. 🟡 **MEDIUM: No Database Indexing Strategy**

- **Problem**: There is no explicit indexing on frequently queried fields like `Website.status`, `User.email`, or `Report.status`.
- **Severity**: **MEDIUM**
- **Why It's Risky**: Query performance will degrade significantly as the database grows.
- **Fix**: Add indexes in your Mongoose schemas.
  ```typescript
  // website.model.ts
  websiteSchema.index({ status: 1, createdAt: -1 });
  ```

---

### 4.2. 🟢 **LOW: Large Frontend Bundle Size**

- **Problem**: The build output shows a 538 KB JS bundle, exceeding the 500 KB warning threshold.
- **Severity**: **LOW**
- **Fix**: Implement code-splitting using `React.lazy()` and dynamic imports for admin pages.

---

## 5. DevOps & Deployment Risks

### 5.1. 🟠 **HIGH: No `.gitignore` Protection for Secrets**

- **Problem**: The `.env` file appears to be tracked by Git.
- **Severity**: **HIGH**
- **Fix**: Add `.env` to `.gitignore`. Run `git rm --cached server/.env` to untrack it.

---

### 5.2. 🟡 **MEDIUM: No Production-Specific Environment Checks**

- **Problem**: The CORS config doesn't change between development and production.
- **Severity**: **MEDIUM**
- **Fix**: Conditionally load settings based on `NODE_ENV`.

---

## Action Items Summary

| Severity    | Issue                                  | Status                        |
| :---------- | :------------------------------------- | :---------------------------- |
| 🔥 CRITICAL | Exposed DB Credentials in `.env`       | **Immediate Action Required** |
| 🔥 CRITICAL | Empty Rate Limiting Middleware         | **Immediate Action Required** |
| 🟠 HIGH     | Banned Users Can Still Authenticate    | Must Fix Before Launch        |
| 🟠 HIGH     | JWT Stored in `localStorage`           | Must Fix Before Launch        |
| 🟠 HIGH     | Missing Input Validation on Admin APIs | Must Fix Before Launch        |
| 🟠 HIGH     | `.env` Not in `.gitignore`             | Must Fix Before Launch        |
| 🟡 MEDIUM   | CORS Whitelist is Hardcoded            | Should Fix                    |
| 🟡 MEDIUM   | Inconsistent Error Response Format     | Should Fix                    |
| 🟡 MEDIUM   | No Database Indexing                   | Should Fix                    |
| 🟢 LOW      | Tailwind Linting Warnings              | Nice-to-Have                  |
| 🟢 LOW      | Large Bundle Size                      | Nice-to-Have                  |

---

**Conclusion**: This project is **NOT production-ready** in its current state due to several critical security vulnerabilities. The most urgent priority is rotating the exposed database credentials.
