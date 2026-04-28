import Link from "next/link";

export default function CrawlerPage() {
  return (
    <div>
      <h1>Crawler Links</h1>
      <Link href="/student/dashboard">Student Dashboard</Link>
      <Link href="/student/logbook">Student Logbook</Link>
      <Link href="/student/opportunities">Student Opportunities</Link>
      <Link href="/student/documents">Student Documents</Link>
      <Link href="/student/completion">Student Completion</Link>
      <Link href="/student/profile">Student Profile</Link>

      <Link href="/employer/dashboard">Employer Dashboard</Link>
      <Link href="/employer/applicants">Employer Applicants</Link>
      <Link href="/employer/evaluations">Employer Evaluations</Link>
      <Link href="/employer/logbooks">Employer Logbooks</Link>
      <Link href="/employer/postings">Employer Postings</Link>

      <Link href="/coordinator/dashboard">Coordinator Dashboard</Link>
      <Link href="/coordinator/companies">Coordinator Companies</Link>
      <Link href="/coordinator/placements">Coordinator Placements</Link>
      <Link href="/coordinator/registrations">Coordinator Registrations</Link>
      <Link href="/coordinator/students">Coordinator Students</Link>
    </div>
  );
}
