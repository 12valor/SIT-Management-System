# Supervised Industrial Training (SIT) Management System

A centralized platform developed for the Technological University of the Philippines - Visayas (TUP-V) to streamline and manage the Supervised Industrial Training process. 

## Overview

The SIT Management System provides a secure, digital environment for students, industry supervisors, and university coordinators to track industrial training progress. It replaces manual, paper-based logbooks with a robust web application, ensuring accurate documentation of training hours and seamless communication between all stakeholders.

## Core Features

- **Digital Logbook Tracking:** Students can submit Daily Time Records (DTR) and task entries digitally.
- **Supervisor Verification:** Industry supervisors can review, approve, or reject student logbook entries.
- **Document Management:** Secure upload and storage of required SIT documents (Waivers, Memorandums of Agreement, Evaluations).
- **Analytics Dashboard:** Real-time visibility into required hours, completed hours, and pending approvals for students and coordinators.
- **Role-Based Access Control:** Distinct interfaces and permissions for Students, Coordinators, and Industry Supervisors.

## Technology Stack

This application is built with modern web technologies, emphasizing performance, type safety, and a clean user interface:

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Design System:** Custom utility-first system adhering to TUP-V brand guidelines
- **State Management & Data:** React Server Components and Server Actions

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) installed on your local machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd "SIT Management System"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and view the application at `http://localhost:3000`.

## Development Standards

- **Continuous Improvement (Kaizen):** All code contributions should leave the codebase cleaner than found. Ensure incremental improvements, refactoring, and strict type safety.
- **Poka-Yoke (Error Proofing):** Leverage TypeScript to make invalid states unrepresentable and catch errors at compile-time when possible.
- **Next.js Best Practices:** Utilize React Server Components for data fetching and reserve Client Components exclusively for interactive elements.

## License

Copyright 2026 Technological University of the Philippines - Visayas (TUP-V). All rights reserved.
