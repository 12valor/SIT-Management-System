# Chapter 8: SOFTWARE IMPLEMENTATION

This chapter presents the software implementation of the Supervised Industrial Training (SIT) Management System for the Technological University of the Philippines Visayas (TUP-V). It covers the programming considerations, technical issues encountered, tools and technologies utilized during development, system requirements specifications, software testing plans and test cases, and the installation and deployment process.

---

## 8.1 Programming Considerations, Issues, and Tools

This section discusses the technical decisions, challenges, and tooling implemented by the development group during the implementation phase of the SIT Management System.

### Programming Considerations
The development of the platform was guided by key engineering guidelines to ensure a robust, secure, and responsive system tailored for TUP Visayas:
1. **React Server Components (RSC) Architecture:** Defaulting to server components for data fetching to optimize performance, leverage server-side caching, and keep the database-layer code separate from the client.
2. **Type Safety and Poka-Yoke:** Employing strict TypeScript type-checking and custom schemas (via Zod/Prisma) to prevent invalid states during time logging and evaluations.
3. **Consistent Institutional Identity:** Adhering to the official TUP Maroon and White color palette (`#bd112d`, `#2f050b`, `#ffffff`) across all dashboards, maintaining a professional visual system.
4. **Responsive Layout Structure:** Adapting the portal interfaces using grid-based layouts to ensure readability and usability on mobile phones (for students checking hours on the move) and desktop screens (for coordinators auditing documents).

### Technical Issues Encountered
During implementation, several technical challenges were addressed:
1. **Next.js 15 Dynamic Route APIs:** Navigating breaking changes in Next.js 15, specifically handling the asynchronous transition of route parameters (`params` and `searchParams`) in page route handlers.
2. **Real-time Logbook Calculation Concurrency:** Mitigating potential race conditions when students submitted logs while supervisors updated existing records, solved by database-level transactional locks via Prisma.
3. **Role-Based Routing and Gating:** Establishing robust middleware policies to verify both user roles (`STUDENT`, `EMPLOYER`, `COORDINATOR`) and approval flags (`isApproved`) before allowing dashboard access.

### Tools and Technologies Used
The system is built on a modern, industry-standard technology stack:
- **Frontend Framework:** Next.js 15 (React 19) with Tailwind CSS v4 for layouts.
- **Backend & ORM:** Node.js environment utilizing Prisma Client JS for relational database abstraction.
- **Database Engine:** PostgreSQL for ACID-compliant data persistence and storage.
- **Authentication:** Auth.js v5 (NextAuth) for secure login sessions and credentials management.
- **Transactional Communication:** Resend and Nodemailer for automatic email notifications on registration approvals and log submissions.
- **IDE & Version Control:** Visual Studio Code and Git/GitHub.

---

## 8.2 System Requirements Specification

The following requirements outline the hardware, software, and human resource parameters necessary for deploying and operating the SIT Management System.

### Hardware Requirements

#### Table 1. Hardware Requirements for Clients and End Users (Students, Employers, Coordinators)
| Component | Minimum Requirements | Recommended |
| :--- | :--- | :--- |
| **Processor** | Intel Core i3 or equivalent AMD | Intel Core i5 or higher |
| **RAM** | 4 GB | 8 GB |
| **Storage** | 500 MB Free Space (Browser cache) | 1 GB Free Space |
| **Display Resolution** | 1280 x 720 (Mobile/Tablet responsive) | 1920 x 1080 (Full HD) |
| **Internet Connection** | Stable 5 Mbps broadband or cellular | 10 Mbps or higher |

#### Table 2. Hardware Requirements for Development and Hosting Administration
| Component | Minimum Requirements | Recommended |
| :--- | :--- | :--- |
| **Processor** | Intel Core i5 or equivalent | Intel Core i7 or higher |
| **RAM** | 8 GB | 16 GB |
| **Storage** | 5 GB Free Space | 10 GB Free Space |
| **Internet Connection** | Stable broadband connection | High-Speed Fiber |
| **Software** | Node.js v20.x, npm, Git | VSCode with TS/Prisma extensions |

### Software Requirements

#### Table 3. Software Compatibility matrix
| Software | Supported Version | Notes |
| :--- | :--- | :--- |
| **Google Chrome** | Latest Stable Version | Recommended for all portals. |
| **Microsoft Edge** | Latest Stable Version | Recommended alternative. |
| **Mozilla Firefox** | Latest Stable Version | Compatible. |
| **Safari** | Latest Stable Version | Optimized for iOS and macOS. |
| **Operating System** | Windows 10/11, macOS, Linux, Android, iOS | Cross-platform compatibility. |

### Human Resource Requirements

#### Table 4. User Roles and Operational Responsibilities
| Role | Recommended Personnel | Primary System Responsibilities |
| :--- | :---: | :--- |
| **University Coordinator** | 1 - 2 | System governance, verifying trainee documents, approving student/partner accounts, auditing active placements. |
| **Industry Supervisor** | 1 per student | Creating company profile, publishing internship posts, approving daily logbooks, submitting final evaluations. |
| **Student (Trainee)** | N/A | Registering user profile, applying for posts, logging daily time records (DTR), uploading compliance files. |

---

## 8.3 Software Testing

The system underwent rigorous testing cycles focusing on functionality, role isolation, data consistency, and responsiveness.

### Testing Activities
1. **Functional Testing:** Verification of individual features starting from registration, posting, application, daily log entry, supervisor signature, and coordinator audit.
2. **Security & Role Gating Testing:** Ensuring students cannot access coordinator panels, and unapproved accounts remain blocked.
3. **Usability Testing:** Evaluation of dashboard navigation efficiency on mobile devices.
4. **User Acceptance Testing (UAT):** Execution of testing protocols alongside academic coordinators and selected industry supervisors.

### Test Cases

#### Table 5. Authentication & Access Control Module Test Cases
| TC# | Test Scenario | Expected Results | Status |
| :--- | :--- | :--- | :---: |
| **TC-01** | User logs in with valid, approved credentials. | Portal redirects to the respective role dashboard. | - |
| **TC-02** | User attempts login with incorrect password. | System blocks login, displaying "Invalid Credentials". | - |
| **TC-03** | Registered, unapproved student attempts access. | System displays "Account Pending Approval" warning. | - |
| **TC-04** | Logged-in Student manually navigates to `/coordinator`. | Next.js middleware intercept and redirects to `/denied`. | - |

#### Table 6. Student Portal & Logbook Module Test Cases
| TC# | Test Scenario | Expected Results | Status |
| :--- | :--- | :--- | :---: |
| **TC-01** | Student inputs shift hours (e.g., 8 hours) & tasks list. | Entry saved as `PENDING` logbook record. | - |
| **TC-02** | Student attempts to log zero or negative hours. | Validation schema blocks submission, showing error. | - |
| **TC-03** | Student checks dashboard aggregate statistics. | System computes sum of `APPROVED` hours only. | - |
| **TC-04** | Student uploads compliance waiver document. | File saved in Database with status mapped to user profile. | - |

#### Table 7. Partner Verification (Employer) Module Test Cases
| TC# | Test Scenario | Expected Results | Status |
| :--- | :--- | :--- | :---: |
| **TC-01** | Employer reviews pending logs list. | System displays date, hours, and task description. | - |
| **TC-02** | Employer clicks "Approve" on log entry. | Log entry status updates to `APPROVED` in PostgreSQL. | - |
| **TC-03** | Employer rejects entry and fills feedback string. | Status set to `REJECTED`, feedback rendered on student DTR. | - |
| **TC-04** | Employer submits trainee final evaluation scorecard. | Technical/conduct metrics saved; overall grade computed. | - |

#### Table 8. Coordinator Audit Module Test Cases
| TC# | Test Scenario | Expected Results | Status |
| :--- | :--- | :--- | :---: |
| **TC-01** | Coordinator reviews student registration list. | System displays student details, course, and approval status. | - |
| **TC-02** | Coordinator approves pending student registration. | User's `isApproved` flag set to true, email sent to student. | - |
| **TC-03** | Coordinator verifies compliance files. | Student document record marked as reviewed/validated. | - |

---

## 8.4 Installation and Deployment Process

Since the platform is a modern cloud-native web application, deployment and setup do not require client-side execution steps.

### System Deployment (Vercel & PostgreSQL)
1. **Database Setup:** Connect a PostgreSQL database instance (via Supabase or Neon) and configure connection strings in environmental settings.
2. **Schema Migration:** Apply schema configurations to database using Prisma Engine:
   ```bash
   npx prisma db push
   ```
3. **Data Seeding:** Run the seeding script to register initial administrative coordinator records:
   ```bash
   npm run seed
   ```
4. **Vercel Integration:** Link the GitHub repository to Vercel, assign necessary keys (`DATABASE_URL`, `AUTH_SECRET`, `RESEND_API_KEY`), and execute production build.

### System Access
- **URL Format:** `https://tupv-sit-system.vercel.app`
- Users log in through any modern web browser using their credentials.
- Administrative accounts are configured during the deployment stage.
