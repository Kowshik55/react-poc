# React POC

This project is a React proof-of-concept (POC) application using MUI, Vite, TypeScript, and Redux Toolkit.

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at the URL shown in your terminal (usually http://localhost:5173).

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview the production build:**
   ```bash
   npm run preview
   ```

## How to Use

- **Authentication:**
  - Sign up for a new account or log in with existing credentials.
  - Auth state is managed with Redux and persisted in the store.

- **Product Management:**
  - View the product list, add new products, edit, or delete existing products.
  - Product data is managed via Redux and API services.

- **Navigation:**
  - Use the navigation bar or back button to move between pages.
  - Protected routes require authentication.

## Project Structure

- `src/`
  - `components/` — Reusable UI components (AppShell, BackButton, etc.)
  - `pages/` — Main application pages (Login, Signup, Product List, etc.)
  - `services/` — API and business logic (auth, product services)
  - `store/` — Redux slices and sagas
  - `types.ts` — TypeScript types
  - `main.tsx`, `App.tsx` — App entry point and root component

## Requirements
- Node.js >= 18
- npm >= 9

## Useful Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build