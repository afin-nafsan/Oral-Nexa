# Oral-Nexa

Oral-Nexa is a modern dental practice management system designed to streamline and optimize the workflow of dental clinics. It provides comprehensive tools for patient management, appointment scheduling, digital prescriptions, financial tracking, analytics, and more—all in a secure, user-friendly web application.

## Features

- **Landing Page:** Beautiful, modern landing page to introduce the platform and its benefits.
- **Authentication:** Secure login for staff and practitioners.
- **Dashboard:** Overview of key metrics and recent activities.
- **Patient Management:** Store and manage patient records, medical history, allergies, and insurance information.
- **Appointment Scheduling:** Smart scheduling with conflict prevention and automated reminders.
- **Digital Prescriptions:** Manage prescriptions electronically with drug interaction checks.
- **Financial Management:** Track expenses, billing, and revenue analytics.
- **Reports & Analytics:** Visualize practice performance and trends.
- **Staff Management:** Manage staff details and roles.
- **HIPAA Compliant:** Ensures patient data privacy and regulatory compliance.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Backend:** Supabase (authentication, database)

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/afin-nafsan/Oral-Nexa.git
   cd Oral-Nexa
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your Supabase credentials.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

## Usage

- Visit the landing page at `/`.
- Click "Get Started" or "Start Free Trial" to go to the login page.
- After logging in, you'll be redirected to the dashboard.
- Use the sidebar to navigate between patients, appointments, prescriptions, staff, expenses, and reports.

## Folder Structure

- `src/components/LandingPage.tsx` — Landing page UI
- `src/components/Auth/Login.tsx` — Login page
- `src/App.tsx` — Main app and routing
- `src/components/` — All feature components
- `src/lib/supabase.ts` — Supabase client setup

## License

This project is licensed under the MIT License.

---

For questions or support, please open an issue on the [GitHub repository](https://github.com/afin-nafsan/Oral-Nexa).