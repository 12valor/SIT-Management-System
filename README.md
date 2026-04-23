# SIT Management System

<div align="center">
  <p><strong>A Next-Generation Enterprise Platform for Supervised Industrial Training</strong></p>
  
  [![Status: In Development](https://img.shields.io/badge/Status-In_Development-orange.svg)]()
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
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
- **Real-Time Analytics Dashboard:** Interactive, data-driven dashboards providing instant visibility into required hours, completion rates, and pending approvals.

## Technology Stack

Engineered for performance, scalability, and strict type safety, utilizing the latest in modern web architecture:

| Category | Technology |
| :--- | :--- |
| **Core Framework** | [Next.js (App Router)](https://nextjs.org/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/) |
| **State Management** | React Server Components & Server Actions |
| **Design Language** | Custom Institutional System (TUP-V Brand Guidelines) |

## Quick Start

### Prerequisites

Ensure the following dependencies are installed on your local environment:
- **Node.js**: `v18.x` or higher
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
   *(Ensure all database and authentication secrets are properly set).*

4. **Launch Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## Architectural Guidelines & Standards

This repository strictly enforces the following engineering philosophies:

- **Kaizen (Continuous Improvement):** Every PR must leave the codebase cleaner. We enforce incremental refactoring, code standardization, and uncompromising type safety.
- **Poka-Yoke (Error Proofing):** Leverage advanced TypeScript patterns to make invalid application states unrepresentable. Fail at compile-time, never at runtime.
- **Next.js Paradigms:** Default to **React Server Components (RSC)** for optimal data fetching. Client Components (`"use client"`) are heavily restricted and reserved exclusively for interactive UI islands.

## License & Copyright

**Proprietary Software.**
Copyright © 2026 Technological University of the Philippines - Visayas (TUP-V). All rights reserved.

Unauthorized copying, distribution, modification, or use of this software is strictly prohibited without explicit written consent.
