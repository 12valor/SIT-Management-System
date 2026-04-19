import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <header className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <img src="/Technological_University_of_the_Philippines_Seal.svg.png" alt="TUP Seal" className="h-10 w-10 object-contain" />
             <div className="h-6 w-px bg-slate-200" />
             <img src="/des_UIPEN.png" alt="UIPEN Logo" className="h-8 w-auto object-contain" />
            <div className="hidden sm:block ml-2">
              <span className="font-bold text-lg tracking-tight block leading-none">SIT Platform</span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none mt-1">TUP-Visayas</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/login">
              Opportunities
            </Link>
            <Link className="text-sm font-medium hover:text-primary transition-colors" href="/login">
              Companies
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-48">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-primary/10 blur-[100px] rounded-full" />
          </div>

          <div className="container mx-auto px-6 text-center animate-in-fade">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Empowering TUP-V Future Professionals
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              The Ultimate Link Between <br />
              <span className="text-gradient">Talent and Industry</span>
            </h1>
            <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
              Streamlining the Supervised Industrial Training (SIT) experience for students and companies. 
              Manage logbooks, discover opportunities, and track applications in one unified platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                className="group w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-primary/30"
                href="/login"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-8 text-sm font-semibold hover:bg-muted transition-all"
                href="#features"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>

        {/* Entry Points Section */}
        <section className="py-20 bg-muted/30 border-y border-border/50">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Student Card */}
              <div className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6 text-primary" />
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
              <div className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-6 w-6 text-primary" />
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
                <Link href="/login" className="w-full inline-flex h-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
                  Partner with Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <img src="/des_UIPEN.png" alt="UIPEN Logo" className="h-8 w-auto opacity-80 grayscale hover:grayscale-0 transition-all cursor-pointer" />
              <img src="/Technological_University_of_the_Philippines_Seal.svg.png" alt="TUP Seal" className="h-8 w-8 opacity-80 grayscale hover:grayscale-0 transition-all cursor-pointer" />
              <span className="font-bold tracking-tight text-sm">TUP-V SIT</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Technological University of the Philippines - Visayas. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">Terms</Link>
              <Link className="text-sm text-muted-foreground hover:text-primary" href="#">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
