---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
inputDocuments:
  - e:\MyCode\bmad\_bmad-output\planning-artifacts\prd.md
  - e:\MyCode\bmad\_bmad-output\planning-artifacts\ux-design-specification.md
  - e:\MyCode\bmad\_bmad-output\planning-artifacts\architecture.md
project_name: 'bmad Corporate Food Ordering'
---

# Epics and Stories Backlog

## Step 1: Initialization

Backlog initialized for the **bmad Corporate Food Ordering** MVP. The following context documents have been successfully loaded and synthesized to drive our agile execution:
- **PRD:** Defined the standalone unified settlement flow, bypassing personal payment gateways to eliminate out-of-pocket expenses.
- **UX Design Specification:** Outlined the mobile-first employee portal, empathetic error states, and the vibrant GSK Orange design system to encourage frictionless ordering.
- **Architecture Decision Document:** Confirmed the Next.js (App Router) full-stack architecture with a PostgreSQL database to ensure strict transactional integrity for the corporate ledger.

## Step 2: Discovery & Context

### Functional Requirements (FRs) Extracted
- **FR 1.x:** Standalone authentication and profile management (custom delivery locations).
- **FR 2.x:** Vendor and menu catalog browsing.
- **FR 3.x:** Cart management, rule evaluation (budget limits), and corporate-billed checkout.
- **FR 4.x:** Post-order history and complaint submission.
- **FR 5.x:** Admin dashboards for unified billing export, vendor management, budget rules, and feedback.

### Non-Functional & Technical Context
- **NFRs:** Secure password hashing, fast UI response (<2s catalog load), mobile responsiveness, and high availability during peak meal hours.
- **UX Directives:** "Zero-Friction Order Loop," clear budget indicators, prominent delivery instruction fields, and "Empowerment over Restriction."
- **Architecture Constraints:** Next.js Server Actions for secure unified settlement logic; normalized relational database for strict financial ledger accuracy (tracking `unit_price_at_time`).

## Step 3: High-Level Epics Definition

We have grouped the requirements into four core, value-driven Epics to ensure we can ship the smallest validating increment first. Each Epic is standalone and builds sequentially to deliver the complete MVP.

### Epic 1: Standalone Authentication & Identity
**User Outcome:** Employees and Administrators can securely register, log in, and manage their profiles independent of corporate OA/HR systems.
- **FR Coverage:** FR 1.1, FR 1.2
- **Implementation Notes:** Utilizes Next.js Auth. Must capture and securely store default corporate campus delivery locations. Sets the foundation for role-based access (EMPLOYEE vs. ADMIN).

### Epic 2: Core Ordering Loop (The Zero-Friction Checkout)
**User Outcome:** Employees can browse onboarded restaurants, select meals, and seamlessly check out against a corporate budget without ever entering personal payment details.
- **FR Coverage:** FR 2.1, FR 2.2, FR 3.1, FR 3.2, FR 3.3, FR 4.1
- **Implementation Notes:** This is the heart of the MVP. Relies heavily on the mobile-first UX with GSK Orange accents. The checkout flow must securely route to the Next.js Server Action (`placeCorporateOrder`) to begin the PostgreSQL financial transaction and evaluate budget constraints.

### Epic 3: Unified Settlement & Invoicing
**User Outcome:** Finance Managers can log into a dedicated desktop dashboard to view aggregated corporate orders and instantly export a single monthly invoice, eliminating individual expense reconciliation.
- **FR Coverage:** FR 5.2, FR 5.3, FR 5.4
- **Implementation Notes:** Requires data-dense, high-contrast tables optimized for desktop. The unified settlement engine must accurately tally the `unit_price_at_time` from order items to guarantee immutable financial records.

### Epic 4: Vendor & Operations Management
**User Outcome:** Administrative staff can easily onboard new local restaurants, update menus, and process employee complaints/refunds to maintain a high-quality catering network.
- **FR Coverage:** FR 4.2, FR 5.1, FR 5.5
- **Implementation Notes:** Standard CRUD operations tailored for fast operational updates. Completes the MVP by ensuring the platform can scale its restaurant offerings and handle post-order support efficiently.

---

## Step 4: User Stories Breakdown

### Breakdown for Epic 1: Standalone Authentication & Identity

#### Story 1.1: Employee Registration (Standalone)
**As a** corporate employee, 
**I want to** register for an account using my corporate email and a password, 
**so that** I can access the food ordering platform independently of the HR system.
- **Acceptance Criteria:**
  - **Given** I am on the registration page, **When** I enter a valid email and strong password, **Then** my account is created with the `EMPLOYEE` role.
  - **Given** I try to register, **When** I use an email that already exists, **Then** I see a friendly error message (using the warm yellow/orange warning UI).
- **Technical Tasks:**
  - Create the `Users` table in PostgreSQL.
  - Implement Next.js Server Action for registration with password hashing (Argon2/bcrypt).
  - Build the Mobile-First Registration UI component (Tailwind CSS, GSK Orange primary button).

#### Story 1.2: Secure Login & Role-Based Routing
**As a** registered user (Employee or Admin), 
**I want to** log in with my credentials, 
**so that** I can be directed to the correct portal (Ordering vs. Admin Dashboard).
- **Acceptance Criteria:**
  - **Given** I am an Employee, **When** I log in successfully, **Then** I am redirected to the Mobile-First Food Catalog Home Page.
  - **Given** I am an Admin, **When** I log in successfully, **Then** I am redirected to the Desktop Admin Dashboard.
  - **Given** I enter incorrect credentials, **When** I click login, **Then** I am denied access with a clear, non-punitive error message.
- **Technical Tasks:**
  - Configure Next.js Auth (or custom JWT session management via HttpOnly cookies).
  - Implement Next.js Middleware to protect `/admin` routes from `EMPLOYEE` role users.
  - Build the Login UI component.

#### Story 1.3: Profile & Default Delivery Location
**As a** busy employee, 
**I want to** save my default campus delivery location (e.g., Building A, 3rd Floor, Desk 12), 
**so that** I don't have to type it out every time I order food.
- **Acceptance Criteria:**
  - **Given** I am logged in, **When** I navigate to my Profile, **Then** I can view and edit my default delivery instructions.
  - **Given** I save my delivery details, **When** I proceed to checkout on future orders, **Then** this information is pre-filled.
- **Technical Tasks:**
  - Create Profile Page UI (Mobile-First).
  - Implement Server Action to update `default_delivery_location` in the `Users` table.
  - Ensure data fetching on the checkout page reads from this user preference.

### Breakdown for Epic 2: Core Ordering Loop (The Zero-Friction Checkout)

#### Story 2.1: Restaurant Catalog & Menu Browsing
**As an** employee looking for lunch, 
**I want to** browse available onboarded restaurants and their menus, 
**so that** I can find a meal that satisfies my current craving.
- **Acceptance Criteria:**
  - **Given** I am on the Home page, **When** I scroll, **Then** I see a list of active restaurants with vibrant, appetizing imagery.
  - **Given** I select a restaurant, **When** the page loads, **Then** I see categorized menu items with descriptions and prices (loading under 2 seconds).
- **Technical Tasks:**
  - Create `Restaurants` and `MenuItems` tables in PostgreSQL.
  - Implement Next.js ISR/Static rendering for the catalog to ensure <2s load times.
  - Build Mobile-First Restaurant Card and Menu Item List UI components (Tailwind CSS, soft cream backgrounds).

#### Story 2.2: Cart Management & Live Budget Validation
**As an** employee selecting food, 
**I want to** add items to a cart and see my total against my daily budget, 
**so that** I know exactly how much allowance I have left without feeling penalized.
- **Acceptance Criteria:**
  - **Given** I have a 50 RMB budget, **When** I add a 40 RMB item to my cart, **Then** the budget indicator fills warmly with GSK orange to 80%.
  - **Given** I try to add an item that exceeds my budget, **When** I click add, **Then** I receive a gentle, empathetic warning (warm yellow tone) and the action is prevented or flagged.
  - **Given** I view my cart, **When** I want to change my mind, **Then** I can easily increase, decrease, or remove item quantities.
- **Technical Tasks:**
  - Build a React context or Zustand store for local cart state management.
  - Implement the visual Budget Indicator component using Tailwind progress utility classes.
  - Fetch the user's `daily_budget_allowance` upon login to feed the cart validation logic.

#### Story 2.3: The "Zero-Friction" Corporate Checkout
**As an** employee ready to order, 
**I want to** finalize my order with my default delivery location and no personal payment, 
**so that** the cost is automatically routed to the company ledger and my food arrives seamlessly.
- **Acceptance Criteria:**
  - **Given** my cart is valid and within budget, **When** I click "Place Corporate Order" (Vibrant Orange CTA), **Then** the order is submitted successfully without asking for credit card details.
  - **Given** my order is placed, **When** the success screen appears, **Then** I see my estimated delivery time and the status "Billed to Corporate".
  - **Given** two users place an order simultaneously for the last item, **When** the transaction processes, **Then** the database strictly enforces inventory/menu availability without data corruption.
- **Technical Tasks:**
  - Implement the critical `placeCorporateOrder` Next.js Server Action.
  - Write the PostgreSQL transaction block: create `Order`, create `OrderItems` (capturing `unit_price_at_time`), and deduct daily budget.
  - Build the Checkout Confirmation UI with a sticky footer CTA.

#### Story 2.4: Active Order Tracking & History
**As an** employee waiting for food, 
**I want to** see the status of my active order and my past order history, 
**so that** I know when my meal will arrive and can reorder favorites easily.
- **Acceptance Criteria:**
  - **Given** I have just placed an order, **When** I return to the Home page, **Then** I see an active status banner (e.g., "Preparing" or "Out for Delivery").
  - **Given** I navigate to my Profile, **When** I view history, **Then** I see a list of past orders with the total amounts and dates.
- **Technical Tasks:**
  - Build the Active Order Banner component for the Home page.
  - Implement a Server Component to fetch the user's recent orders from the `Orders` table.
  - Create the Order History UI list.