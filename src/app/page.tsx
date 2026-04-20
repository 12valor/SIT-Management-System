import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, CheckCircle } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed top-0 w-full z-50 bg-transparent py-4 transition-all duration-500">
        <div className="container mx-auto px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
             <img src="/Technological_University_of_the_Philippines_Seal.svg.png" alt="TUP Seal" className="h-12 w-auto object-contain" />
             <div className="h-8 w-px bg-white/20" />
             <div className="flex flex-col">
               <span className="font-bold text-xl tracking-tight text-white leading-none font-heading uppercase">SIT Platform</span>
               <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] leading-none mt-1.5 font-sans">TUP-Visayas</span>
             </div>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <Link className="text-[11px] font-bold text-white hover:text-white/70 transition-all font-heading uppercase tracking-widest" href="/login">
              Opportunities
            </Link>
            <Link className="text-[11px] font-bold text-white hover:text-white/70 transition-all font-heading uppercase tracking-widest" href="/login">
              Companies
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            <Link 
              href="/login" 
              className="px-8 py-3 rounded-xl bg-primary text-white text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all font-heading"
            >
              Portal Login
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroCarousel />

        {/* Entry Points Section */}

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

      <footer className="pt-24 pb-12 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Branding */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src="/Technological_University_of_the_Philippines_Seal.svg.png" 
                  alt="TUP Seal" 
                  className="h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" 
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xl tracking-tight text-slate-900 font-heading">TUP-V SIT</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-sans">Institutional Link</span>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-sans max-w-xs">
                The official landing for Supervised Industrial Training at Technological University of the Philippines - Visayas. Connecting emerging talent with industry leadership.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-primary transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">FB</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-primary transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">LN</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:border-primary transition-colors cursor-pointer">
                   <span className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">TW</span>
                </div>
              </div>
            </div>

            {/* Column 2: Portals */}
            <div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8 font-heading">Access Portals</h4>
              <ul className="space-y-4">
                <li><Link href="/login/student" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">Student Portal</Link></li>
                <li><Link href="/login/employer" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">Employer Portal</Link></li>
                <li><Link href="/login/coordinator" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">Coordinator Terminal</Link></li>
                <li><Link href="/signup/student" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">New Student Registration</Link></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8 font-heading">Resources</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">SIT Guidelines</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">Partner Companies</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">Digital Logbook Guide</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">Training Modules</Link></li>
              </ul>
            </div>

            {/* Column 4: Institutional */}
            <div>
              <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] mb-8 font-heading">Institutional</h4>
              <ul className="space-y-4">
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">About TUP-Visayas</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">UIPEN Strategic Office</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">Contact Registry</Link></li>
                <li><Link href="#" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors font-sans">Technical Support</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-sans">
              © 2026 Technological University of the Philippines - Visayas. <br className="md:hidden" /> ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-[0.2em] font-sans transition-colors">Privacy Protocol</Link>
              <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-[0.2em] font-sans transition-colors">Terms of Service</Link>
              <Link href="#" className="text-[10px] font-bold text-slate-400 hover:text-primary uppercase tracking-[0.2em] font-sans transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
