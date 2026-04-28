# SIT Management System

<div align="center">
  <p><strong>A Next-Generation Enterprise Platform for Supervised Industrial Training</strong></p>
  
  [![Status: In Development](https://img.shields.io/badge/Status-In_Development-orange.svg)]()
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](https://www.tupvisayas.edu.ph/)
</div>

> **Notice:** This project is currently in active development. Features and API surfaces are subject to change without notice.

---

## Overview

The **Supervised Industrial Training (SIT) Management System** is a mission-critical, centralized platform engineered specifically for the **Technological University of the Philippines - Visayas (TUP-V)**. Designed to seamlessly orchestrate the industrial training lifecycle, it bridges the gap between academia and industry.

This digital workspace replaces antiquated, paper-based workflows with a highly secure, responsive web application—ensuring absolute fidelity in tracking training hours, managing mandatory documents, and facilitating real-time stakeholder communication.

## Architecture & Schematics

- [Database Schema (ER Diagram)](./public/diagrams/database-schema.html)
- [Website Flowchart](./public/diagrams/website-flow.html)

*(Click to view self-contained HTML diagrams)*

## Enterprise Features

- **Role-Based Access Control (RBAC):** Distinct, secure portals tailored for Students, Industry Supervisors, and University Coordinators.
- **Digital Logbook & DTR:** Seamless, high-precision digital tracking for Daily Time Records and granular task execution.
- **Supervisor Workflow Automation:** Streamlined review processes allowing industry supervisors to approve or reject logbook entries with a single click.
- **Secure Document Vault:** Centralized, encrypted storage for mission-critical compliance documents (Waivers, MOAs, Evaluations).
- **Archival Dashboard Interface:** A refined, document-based layout for University Coordinators, optimized for high-density student and employer data management.

## Technology Stack

Engineered for performance, scalability, and strict type safety, utilizing the latest in modern web architecture:

| Category | Technology |
| :--- | :--- |
| **Core Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Database/ORM** | [Prisma](https://www.prisma.io/) & [PostgreSQL](https://www.postgresql.org/) |
| **Design Language** | Archival/Editorial Aesthetic with Deep-Crimson Gradients |

## Quick Start

### Prerequisites

Ensure the following dependencies are installed on your local environment:
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm` (or `pnpm`/`yarn`)

### Local Development Setup

1. **Clone & Navigate**
   ```bash
   cd "SIT Management System"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Copy the example environment file and configure your local variables:
   ```bash
   cp .env.example .env.local
   ```
   *(Ensure `DATABASE_URL` and `AUTH_SECRET` are properly set).*

4. **Database Setup**
   Generate the Prisma client and seed the initial administrative data:
   ```bash
   npx prisma generate
   npm run seed
   ```

5. **Launch Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## Architectural Guidelines & Standards

This repository strictly enforces the following engineering philosophies:

- **Kaizen (Continuous Improvement):** Every PR must leave the codebase cleaner. We enforce incremental refactoring, code standardization, and uncompromising type safety.
- **Archival/Editorial Standard:** The UI must maintain an authoritative, professional aesthetic—prioritizing typographic hierarchy, refined micro-animations, and a "themeless" yet premium feel.
- **Poka-Yoke (Error Proofing):** Leverage advanced TypeScript patterns to make invalid application states unrepresentable. Fail at compile-time, never at runtime.
- **Next.js Paradigms:** Default to **React Server Components (RSC)** for optimal data fetching. Client Components (`"use client"`) are heavily restricted and reserved exclusively for interactive UI islands.

## License & Copyright

**Proprietary Software.**
Copyright © 2026 Technological University of the Philippines - Visayas (TUP-V). All rights reserved.

Unauthorized copying, distribution, modification, or use of this software is strictly prohibited without explicit written consent.
