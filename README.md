# SIT Management System

<div align="center">
  <p><strong>A Next-Generation Enterprise Platform for Supervised Industrial Training</strong></p>
  
  [![Status: Active Development](https://img.shields.io/badge/Status-Active_Development-orange.svg)]()
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](https://www.tupvisayas.edu.ph/)
</div>

> **Notice:** This project is currently in an advanced stage of development. The system is being standardized to an **Institutional Brutalism** aesthetic to ensure maximum authority and archival integrity.

---

## Overview

The **Supervised Industrial Training (SIT) Management System** is a mission-critical, centralized platform engineered for the **Technological University of the Philippines - Visayas (TUP-V)**. It serves as the official bridge between academic requirements and industrial deployment, digitalizing the entire training lifecycle.

This workspace replaces fragmented paper workflows with a high-fidelity, secure environment for tracking trainee performance, managing compliance documents, and facilitating real-time coordination between students, industrial partners, and university administrators.

## Design Aesthetic: Institutional Brutalism

The system employs a custom **Institutional Brutalism** design language—a high-contrast, authoritative aesthetic that rejects generic "SaaS" patterns in favor of:
- **Typography**: Authority-driven pairings of **Instrumental Serif** for headers and **Poppins/Outfit** for functional UI.
- **Color Palette**: TUP Maroon (`#8c1515`) accents against pure ink-black and paper-white backgrounds.
- **Structure**: High-density layouts with solid `1px` borders, dot-pattern backgrounds, and refined micro-animations.
- **Interactive Islands**: Floating UI components with thick borders and spring-based motion.

## Technical Schematics

- [Database Schema (ER Diagram)](./public/diagrams/database-schema.html) — Prisma/PostgreSQL architecture.
- [Website Flowchart](./public/diagrams/website-flow.html) — Multi-portal navigation logic.

## Multi-Portal Ecosystem

### 🎓 Student Terminal
- **Manifest Management**: Browse and apply for verified industrial placements.
- **Digital Logbook**: High-precision daily time records (DTR) and task logging.
- **Compliance Vault**: Secure repository for Waivers, MOAs, and Certifications.
- **Performance Tracking**: Real-time status of training hours and supervisor approvals.

### 🏢 Partner Verification (Employer)
- **Talent Acquisition**: Post and manage verified SIT positions.
- **Credential Audit**: Authenticate student logbook entries and performance records.
- **Evaluation Terminal**: Submit institutional performance reviews and hireability assessments.
- **Company Identity**: Manage organizational profile and verification status.

### ⚖️ University Coordinator
- **Centralized Audit**: Oversight of all active students and industrial partners.
- **Document Verification**: Review and approve mandatory SIT documentation.
- **System Governance**: Direct administrative control over user verification and database integrity.

## Technology Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Database/ORM** | [Prisma](https://www.prisma.io/) & [PostgreSQL](https://www.postgresql.org/) |
| **Auth** | [Auth.js v5 (Beta)](https://authjs.dev/) |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) |
| **Communication** | [Resend](https://resend.com/) & [Nodemailer](https://nodemailer.com/) |

## Development Setup

### Prerequisites
- **Node.js**: `v20.x` or higher
- **PostgreSQL**: Local or remote instance
- **Environment**: See `.env.example` for required keys (Auth Secret, Database URL, Resend API Key).

### Getting Started
1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Database Initialization**
   ```bash
   npx prisma generate
   npm run seed # Seeds administrative coordinator accounts
   ```
3. **Launch Terminal**
   ```bash
   npm run dev
   ```
   Access the dashboard at `http://localhost:3000`.

## Engineering Philosophies

- **Kaizen**: Continuous, incremental optimization of the codebase.
- **Poka-Yoke**: Error-proofing through advanced TypeScript patterns to prevent invalid states.
- **RSC Default**: Strict adherence to React Server Components for optimal data fetching, reserving Client Components for interactive islands only.

---

**Proprietary Software.**  
Copyright © 2026 Technological University of the Philippines - Visayas (TUP-V).  
*Unauthorized reproduction or distribution is strictly prohibited.*
