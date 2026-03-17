---
stepsCompleted:
  - step-01-init
inputDocuments: 
  - e:\MyCode\bmad\_bmad-output\planning-artifacts\prd.md
documentCounts:
  prdCount: 1
  briefCount: 0
  otherContextCount: 0
workflowType: 'ux'
---

# UX Design Specification - bmad

**Author:** Gordon
**Date:** 2026-03-17

## Step 2: Discovery (Executive Summary)

### Project Vision
Our vision is to eliminate the friction and out-of-pocket costs associated with corporate meals. By providing a standalone, beautifully designed food ordering platform with a unified settlement engine, we empower employees to focus on their work and relieve finance teams from the tedious burden of endless receipt reconciliation. Every order should feel like a perk, not a chore.

### Target Users
- **The Employee (Primary User):** Busy professionals who need to order meals efficiently without the financial strain of fronting the cost and the administrative hassle of expensing.
- **The Finance Manager (Admin User):** Dedicated operations staff who currently spend hours verifying individual receipts and need a streamlined, aggregated invoice system.

### Key Design Challenges
- **Standalone Yet Trustworthy:** Since the platform operates entirely independently of existing corporate OA/HR systems, the onboarding and authentication experience must instill immediate trust and feel completely secure.
- **Complex Logistics Made Simple:** Designing a flexible delivery interface that accommodates specific campus locations and instructions without overwhelming the user during checkout.
- **Invisible Constraints:** Seamlessly integrating corporate rules (budget limits, time restrictions) so users feel guided rather than restricted.

### Design Opportunities
- **Frictionless Checkout:** Removing personal payment gateways entirely creates a "magical" checkout moment—just confirm and eat.
- **Empathetic After-Sales:** A robust, easy-to-use complaint and review system that makes users feel heard and cared for when things don't go perfectly.

## Step 3: Design Principles & Core Experience

### Defining Experience
The core experience is the "Zero-Friction Order Loop." From discovering a craving to order confirmation, the journey should be swift, appetizing, and completely divorced from personal financial transactions. 

### Platform Strategy
- **Mobile-First Responsive Web:** Recognizing that employees often order food on the go or away from their desks, the platform will be optimized for mobile browsers while remaining fully functional on desktop.
- **Visual Foundation (GSK Color Scheme):** To inspire energy, warmth, and appetite, the user interface will deeply integrate the vibrant GSK color scheme (primarily vibrant orange and warm secondary tones). Orange will highlight primary actions (like "Add to Cart" and "Place Order"), while clean whites and soft grays ensure readability and a modern, uncluttered look.

### Effortless Interactions
- **One-Tap Reordering:** Remembering past orders and delivery instructions to reduce the time spent on repeat purchases.
- **Auto-Applied Rules:** Real-time, gentle visual cues (using our warm orange tones) indicating remaining budget before the user even reaches checkout.

### Critical Success Moments
- The moment the user bypasses a traditional payment screen and sees "Billed to Corporate."
- The moment the finance manager downloads a single, unified monthly invoice.

### Experience Principles
1. **Empowerment over Restriction:** Use vibrant colors and clear copy to guide users within their budget playfully, avoiding punitive or aggressive error states.
2. **Clarity in Logistics:** Make entering specific delivery instructions a prominent, helpful feature rather than a hidden afterthought.
3. **Warmth and Vibrancy:** Leverage the orange/vibrant color palette to make the corporate tool feel like a premium, inviting consumer app.

## Step 4: User Personas

### Persona 1: Alex the Efficient Engineer (Primary)
- **Motivations:** Wants good food quickly to maintain focus during late work sessions.
- **Pain Points:** Hates saving physical receipts and navigating clunky expense software.
- **UX Needs:** Fast browsing, clear visuals (enhanced by our vibrant color scheme), and a checkout that requires zero thought about payment.

### Persona 2: Sarah the Relieved Finance Manager (Admin)
- **Motivations:** Needs accuracy, compliance, and time-saving tools.
- **Pain Points:** End-of-month reconciliation is a nightmare of lost receipts and policy violations.
- **UX Needs:** A clean, data-rich dashboard that aggregates information clearly, with one-click export functionalities.

### Persona 3: Jordan the Detailed Organizer (Edge Case)
- **Motivations:** Needs to coordinate meals for team sessions across a large corporate campus.
- **Pain Points:** Delivery drivers often get lost, resulting in cold food and wasted time.
- **UX Needs:** Prominent, savable, and highly customizable delivery instruction fields.

## Step 5: User Journeys

### Journey 1: The Zero-Friction Order (Alex)
1. **Discovery:** Alex logs in via the standalone portal. The vibrant orange "Welcome Back" banner sets a positive tone.
2. **Selection:** Browsing onboarded restaurants. High-quality imagery with warm UI accents guides the eye to top-rated items.
3. **Cart Review:** The cart clearly shows the total against the corporate budget. A gentle, empathetic prompt appears if the budget is near the limit.
4. **Checkout:** Alex confirms the default desk location. A prominent, vibrant "Place Corporate Order" button finalizes the transaction. No credit card required.
5. **Confirmation:** A clear, reassuring success state confirming the estimated delivery time.

### Journey 2: The Unified Settlement (Sarah)
1. **Dashboard Access:** Sarah accesses the Admin portal. The interface is clean, prioritizing data readability over vibrant consumer elements, though subtle orange accents highlight key actions.
2. **Review:** She views the aggregated monthly orders. Any flagged complaints or refunds are clearly marked for her review.
3. **Export:** With a single click on "Generate Master Invoice," Sarah downloads the consolidated billing file.
4. **Resolution:** The task that used to take hours is completed in minutes, leaving her feeling empowered and efficient.

### Flow Optimization
- **Progressive Disclosure:** For complex delivery instructions, fields expand only when needed, keeping the primary interface clean.
- **Visual Hierarchy:** Utilizing the GSK vibrant orange exclusively for primary, positive actions (Checkout, Export) to create an intuitive, color-coded path to success.

## Step 6: Information Architecture (IA)

### Employee Interface (Mobile-First Web)
- **Authentication:** Login / Register / Forgot Password
- **Home (Dashboard):**
  - Welcome Header & Remaining Daily Budget (GSK Orange accent)
  - Featured/Available Restaurants List
  - Active Order Status Banner
- **Restaurant Detail:**
  - Restaurant Info & Delivery Time
  - Menu Categories (Tabs)
  - Menu Items (List with photos, price, add to cart button)
- **Cart & Checkout:**
  - Order Summary
  - Delivery Details (Building, Floor, Specific Instructions)
  - "Billed to Corporate" checkout confirmation
- **Profile & History:**
  - Past Orders List
  - Submit Complaint / Review
  - Saved Delivery Instructions
  - Logout

### Admin Interface (Desktop Optimized)
- **Authentication:** Admin Login
- **Dashboard:**
  - High-level metrics (Total spent, Active orders today)
- **Billing & Settlement:**
  - Monthly Aggregated Invoice View
  - Export to CSV/PDF (GSK Orange CTA)
- **Vendor Management:**
  - Onboarded Restaurants List
  - Add/Edit Restaurant
- **Rule Management:**
  - Budget Limits Settings
- **Complaints Management:**
  - Review and Action Employee Feedback

## Step 7: Interface Layouts & Wireframe Strategy

### Mobile Layout Strategy (Employee View)
- **Navigation:** Bottom tab navigation (Home, Orders, Profile) for easy thumb reach on mobile devices.
- **Header:** Clean white header with the corporate logo. A subtle warm gradient or progress bar indicating budget usage.
- **Cards:** Restaurant and menu items displayed in clean, slightly rounded cards with ample white space to let food imagery pop.
- **Floating Action Button (FAB) / Sticky Footer:** The "View Cart" or "Place Order" button will remain sticky at the bottom of the screen, styled in the vibrant GSK Orange to draw the eye and encourage conversion without scrolling.

### Desktop Layout Strategy (Admin View)
- **Navigation:** Left-hand sidebar (dark gray or deep warm tone) for quick switching between Billing, Vendors, and Rules.
- **Main Content Area:** Wide, data-dense tables with high contrast for easy reading of financial data.
- **Actions:** Primary actions (Export Invoice, Save Rules, Add Vendor) placed prominently in the top right corner of the content area, utilizing the brand orange for clear visibility.

## Step 8: Component & UI System

### Color Palette
- **Primary (Brand):** GSK Vibrant Orange (Warm, energetic orange) - Used for primary buttons (Checkout, Add to Cart), active tabs, and success highlights.
- **Secondary/Accent:** Warm Yellows and soft Terracotta tones - Used for secondary states, warning or budget limit approaching notifications (ensures warnings feel friendly, not punitive).
- **Backgrounds:** Off-white/Soft Cream - Reduces eye strain and provides a warm, appetizing background that contrasts nicely with food photos.
- **Typography/Text:** Dark Charcoal for high readability, replacing harsh pure blacks.

### Typography
- **Headers:** Clean, modern Sans-Serif with medium-to-bold weights for clear hierarchy.
- **Body:** Regular weight Sans-Serif for high legibility on mobile devices.

### Key Components
- **Primary Button:** Large touch-target, pill-shaped or slightly rounded corners, solid GSK Orange background with white text. 
- **Food Item Card:** Image on the left (or top), title, description truncated to 2 lines, price, and a minimal "+" button in orange.
- **Budget Indicator:** A visual progress bar (Warm Gray base, filling with Orange as budget is consumed) rather than just raw numbers, offering a quicker cognitive grasp of remaining allowance.
- **Status Badges:** Pill-shaped badges for order status (e.g., "Preparing" in warm yellow, "Out for Delivery" in brand orange, "Delivered" in soft green).
