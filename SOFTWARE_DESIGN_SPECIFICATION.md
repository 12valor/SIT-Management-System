# Software Design Specification

Following the Agile methodology, this chapter outlines the technical blueprint of the Web-Based Supervised Industrial Training (SIT) Management System.

## 7.1 Process Specification

The software logic is implemented using Next.js App Router Server Actions, route handlers, and React Server Components written in TypeScript, managing the communication between the dynamic frontend user interfaces and the PostgreSQL database.
- **Automated Hours Validation:** When an employer approves a logbook entry, the system triggers database updates via Prisma to recalculate and cache the student's aggregate completed hours.
- **Dynamic Application Flow:** The acceptance of a student application triggers transactional updates that flag the candidate as "Placed", close associated application slots, and dispatch instant system notifications.

---

## 7.2 Data Specification

The system utilizes PostgreSQL for data persistence, ensuring high-fidelity, ACID-compliant transactions for logbooks, documents, and evaluation grading.
- **Data Integrity:** Schema-level foreign keys and relational constraints (defined in Prisma) maintain strict referential integrity between students, companies, placements, and logbooks.
- **Storage Optimization:** Indexes are configured on key foreign keys (`userId`, `companyId`, `postingId`) to optimize query execution and support high-traffic operations during peak submission periods.

---

## 7.3 Screen/Interface Specification

The interface is built using React and Tailwind CSS, presenting a fully responsive interface optimized for both desktop terminals and mobile devices.
- **Student Terminal:** Features a dashboard for logged hours progress, a portal to apply for postings, a daily journal input form, and a compliance document vault.
- **Employer Dashboard:** Provides industry partners with a list of active trainees, details of pending daily time records, verification controls with text feedback, and the evaluation terminal.
- **Coordinator Audit Center:** A high-density dashboard displaying system metrics (e.g., total active postings, verification queues, trainee status) alongside registration approval controls.

---

## 7.4 Program/Module Specification

The system is divided into modular, decoupled software components to ensure reliability and ease of maintenance:
- **Authentication & Authorization Module:** Managed via Auth.js (NextAuth), securing endpoints and verifying user roles (`STUDENT`, `EMPLOYER`, `COORDINATOR`).
- **Placement & Vacancy Module:** Handles database operations for creating, publishing, filtering, and archiving SIT postings.
- **Digital Logbook Module:** Manages the input, compilation, validation, and historical viewing of Daily Time Records.
- **Compliance & Vault Module:** Facilitates secure uploads, validation, and archival storage of mandatory documents (e.g., Waivers, MOAs, evaluations).
