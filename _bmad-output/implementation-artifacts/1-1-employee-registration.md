---
story_id: '1.1'
title: 'Employee Registration (Standalone)'
epic: 'Epic 1: Standalone Authentication & Identity'
status: 'review'
assignee: 'Dev Agent'
---

# Story 1.1: Employee Registration (Standalone)

## Context
**As a** corporate employee,
**I want to** register for an account using my corporate email and a password,
**so that** I can access the food ordering platform independently of the HR system.

## Acceptance Criteria
- [ ] **AC1:** Given I am on the registration page, When I enter a valid email and strong password, Then my account is created with the `EMPLOYEE` role.
- [ ] **AC2:** Given I try to register, When I use an email that already exists, Then I see a friendly error message (using the warm yellow/orange warning UI).

## Tasks
- [x] **Task 1: Project Setup** 
  - Initialize Next.js App Router project with Tailwind CSS.
  - Set up PostgreSQL connection utility (e.g., using `pg` or `postgres` package).
- [x] **Task 2: Database Schema**
  - Create the initial `Users` table schema definition and migration script.
- [x] **Task 3: Backend Logic (Server Action)**
  - Implement `registerUser` Server Action.
  - Integrate password hashing (e.g., `bcryptjs`).
  - Handle duplicate email constraint.
- [x] **Task 4: Frontend UI**
  - Build Mobile-First Registration UI `app/register/page.tsx`.
  - Apply GSK Orange primary button and warm warning states.
  - Connect UI form to the Server Action.

## File List
- `bmad-food-ordering/package.json`
- `bmad-food-ordering/src/lib/db.ts`
- `bmad-food-ordering/src/db/schema.sql`
- `bmad-food-ordering/src/actions/auth.ts`
- `bmad-food-ordering/src/app/register/page.tsx`

## Dev Agent Record
- Initialized Next.js (App Router) project using `npx create-next-app@latest`.
- Selected `postgres`, `bcryptjs`, and `zod` for the backend logic and validation.
- Created the PostgreSQL schema script manually (`schema.sql`) for table creation.
- Implemented `registerUser` Server Action to handle safe password hashing and checking for duplicate emails securely.
- Developed a Mobile-First Registration UI leveraging Tailwind CSS with the requested GSK Orange palette (`#FF630F` and `#E65100`) to reflect the empathetic warning states.
- Story successfully complete and ready for review.
