# Logical Modeling

This chapter focuses on the logical modeling of the system's requirements, translating the gathered data into structured specifications for development.

## 6.1 Process Specification/Modeling

The system's core logic revolves around digitalizing the lifecycle of the Supervised Industrial Training (SIT) program, transitioning from paper logs to a centralized database.

### User Authentication & Role Verification Process
Users must authenticate via Auth.js (NextAuth) credentials to access their role-specific dashboards.
- **Roles:** The system enforces three distinct user roles: `STUDENT`, `EMPLOYER`, and `COORDINATOR`.
- **Approval Check:** Access to internal systems is gated by an administrative approval process (`isApproved`) to prevent unauthorized portal access.

### Placement & Application Process
Employers publish training vacancies, and students apply for placements.
- **SIT Posting:** Employers associated with a verified `Company` create postings detailing required hours, tags, requirements, responsibilities, and placement type (`ON_SITE`, `REMOTE`, `HYBRID`).
- **Application Lifecycle:** Students apply to these postings. The application status transitions through `PENDING`, `ACCEPTED`, `REJECTED`, or `WITHDRAWN` states.

### Logbook Logging & Verification Process
Students track training hours, and employers verify their validity.
- **Logbook Entries:** Students submit daily journals logging date, duration (hours), and details of completed tasks.
- **Employer Review:** Supervisors review entries to verify hours, either approving or rejecting them (`LogbookStatus`) and leaving optional descriptive feedback.

### Final Performance Evaluation Process
Supervisors submit formal evaluations of student performance at the end of the internship.
- **Grading Rubric:** Scores (1-5 scale) are captured for technical skills, professionalism, punctuality, and quality of work.
- **Endorsement:** The supervisor provides an overall grade, text comments, and selects a hireability recommendation (`recommendForHire`).

---

## 6.2 Data Specification/Modeling

The data model replaces physical binders and folders with a structured PostgreSQL relational database schema.

### User Entity
Stores administrative, employer, and student credentials.
- **Attributes:** User ID, Name, Email, Password Hash, Role (`STUDENT`, `EMPLOYER`, `COORDINATOR`), Status Approval (`isApproved`), Course (for students), and Creation/Update Timestamps.

### Company Entity
Represents verified industry placement partners.
- **Attributes:** Company ID, Name, Industry, Website/Social URLs, Slots, Location, and Verification Status.

### SIT Posting Entity
Announces available training slots.
- **Attributes:** Posting ID, Title, Description, Required Hours, Location Type, Requirements, Responsibilities, Status (`OPEN`, `CLOSED`), and Associated Company ID.

### Application Entity
Links students to potential company placements.
- **Attributes:** Application ID, Posting ID, Student ID, Status (`PENDING`, `ACCEPTED`, `REJECTED`, `WITHDRAWN`), and Submission Timestamp.

### Logbook Entry Entity
Chronicles daily trainee shifts.
- **Attributes:** Entry ID, Student ID, Date, Hours Completed, Tasks description, and Verification Status (`PENDING`, `APPROVED`, `REJECTED`).

### SIT Evaluation Entity
Grades student compliance and training quality.
- **Attributes:** Evaluation ID, Student ID, Supervisor Name, Company Name, Technical Skill Score, Professionalism Score, Punctuality Score, Quality of Work Score, Overall Grade, Comments, and Hireability Recommendation.

### SIT Document Entity
Maintains academic and compliance papers.
- **Attributes:** Document ID, Student ID, Name, File Type, URL, and Upload Timestamp.
