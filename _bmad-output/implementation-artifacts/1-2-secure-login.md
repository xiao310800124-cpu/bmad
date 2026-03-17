---
story_id: '1.2'
title: 'Secure Login & Role-Based Routing'
epic: 'Epic 1: Standalone Authentication & Identity'
status: 'review'
assignee: 'Dev Agent'
---

# Story 1.2: Secure Login & Role-Based Routing

## Context
**As a** registered user (Employee or Admin),
**I want to** log in with my credentials,
**so that** I can be directed to the correct portal (Ordering vs. Admin Dashboard).

## Acceptance Criteria
- [x] **AC1:** Given I am an Employee, When I log in successfully, Then I am redirected to the Mobile-First Food Catalog Home Page.
- [x] **AC2:** Given I am an Admin, When I log in successfully, Then I am redirected to the Desktop Admin Dashboard.
- [x] **AC3:** Given I enter incorrect credentials, When I click login, Then I am denied access with a clear, non-punitive error message.

## Tasks
- [x] **Task 1: Session Management** 
  - Install `jose` for lightweight JWT handling compatible with Edge Runtime (Middleware).
  - Create session utilities for signing and verifying HttpOnly cookies.
- [x] **Task 2: Backend Logic (Server Action)**
  - Implement `loginUser` Server Action.
  - Verify email and password via `bcrypt.compare`.
  - Issue JWT and set session cookie.
  - Redirect based on user role (`EMPLOYEE` -> `/`, `ADMIN` -> `/admin`).
- [x] **Task 3: Frontend UI**
  - Build Login UI `app/login/page.tsx`.
  - Apply GSK Orange primary button and empathetic warning states for wrong credentials.
- [x] **Task 4: Middleware & Protection**
  - Implement `middleware.ts` to protect `/admin` routes from employees and unauthenticated users.
  - Create placeholder target pages (`app/page.tsx` and `app/admin/page.tsx`) to handle the redirects.

## File List
- `bmad-food-ordering/src/lib/session.ts`
- `bmad-food-ordering/src/actions/login.ts`
- `bmad-food-ordering/src/app/login/page.tsx`
- `bmad-food-ordering/src/middleware.ts`
- `bmad-food-ordering/src/app/page.tsx`
- `bmad-food-ordering/src/app/admin/page.tsx`

## Dev Agent Record
- Installed `jose` and created Edge-compatible session utilities (`lib/session.ts`).
- Created `loginUser` Server Action with bcrypt password verification and token generation.
- Designed the `/login` page utilizing the GSK Orange color palette, specifically adding empathetic warnings (`#FFF3E0`) for incorrect login credentials.
- Configured Next.js Middleware to automatically intercept routes: unauthenticated users go to `/login`, and `EMPLOYEE` accounts are strictly blocked from accessing `/admin`.
- Scaffolded the main Employee mobile-first catalog (`/`) and Desktop Admin Dashboard (`/admin`) for testing successful role-based routing.
