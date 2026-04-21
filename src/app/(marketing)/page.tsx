import Link from "next/link";
import { Briefcase, GraduationCap, CheckCircle } from "lucide-react";
import Image from "next/image";
import { SmartNavbar } from "@/components/SmartNavbar";
import { HeroCarousel } from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SmartNavbar />

      <main className="flex-1">
        <HeroCarousel />
        
        {/* Entry Points Section */}
        <section className="py-20 bg-muted/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Student Card */}
              <div className="group p-8 rounded-xl bg-card border border-border hover:border-slate-300 transition-all hover:shadow-2xl hover:shadow-slate-100">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold mb-3">For Students</h3>
                <p className="text-muted-foreground mb-6">
                  Build your professional profile, find top internship roles, and manage your digital SIT logbook with ease.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Browse Job Postings", "Apply Seamlessly", "Digital Logbook Tracking", "SIT Document Management"].map((feature) => (
                    <li key={feature} className="flex items-center text-sm font-medium">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="w-full inline-flex h-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                  Join as Student
                </Link>
              </div>

              {/* Company Card */}
              <div className="group p-8 rounded-xl bg-card border border-border hover:border-slate-300 transition-all hover:shadow-2xl hover:shadow-slate-100">
                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-6 w-6 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold mb-3">For Companies</h3>
                <p className="text-muted-foreground mb-6">
                  Access a pool of qualified TUP-V students, post internship roles, and monitor progress efficiently.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Post Internship Jobs", "Automated Applicant Filtering", "Digital Progress Verification", "Direct Student Feedback"].map((feature) => (
                    <li key={feature} className="flex items-center text-sm font-medium">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="w-full inline-flex h-10 items-center justify-center rounded-lg bg-slate-900 text-white font-semibold hover:bg-black transition-all">
                  Partner with Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
    </div>
  );
}
