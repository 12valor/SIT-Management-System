import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PartnersMarquee } from "@/components/marketing/PartnersMarquee";
import { Reveal } from "@/components/Reveal";
import prisma from "@/lib/prisma";
import { getMarqueePartners } from "@/app/(portals)/coordinator/companies/actions";
import { getMarqueeSettings } from "@/app/(portals)/coordinator/settings/general/actions";
import { getPublicImageUrl } from "@/lib/public-media";

export const revalidate = 3600;

export default async function Home() {
  interface SystemSetting {
    key: string;
    value: string;
  }

  const [activePlacements, verifiedPartners, jobPostings, hoursResult, heroSetting, marqueePartners, marqueeSettings] = await Promise.all([
    prisma.application.count({ where: { status: "ACCEPTED" } }),
    prisma.company.count({ where: { isVerified: true } }),
    prisma.sITPosting.count({ where: { status: "OPEN" } }),
    prisma.logbookEntry.aggregate({
      _sum: { hours: true },
      where: { status: "APPROVED" },
    }),
    prisma.$queryRaw<SystemSetting[]>`SELECT * FROM "SystemSetting" WHERE key = 'hero_slides' LIMIT 1`.catch(() => null),
    getMarqueePartners(),
    getMarqueeSettings(),
  ]);

  const verifiedHours = hoursResult._sum.hours || 0;
  const customSlides = heroSetting && heroSetting.length > 0
    ? JSON.parse(heroSetting[0].value).map((slide: { image: string; title: string; description: string }) => ({
        ...slide,
        image: slide.image
          .replace("/images/hero/industrial-1.png", "/images/hero/industrial-1.webp")
          .replace("/images/hero/industrial-2.png", "/images/hero/industrial-2.webp")
          .replace("/images/hero/industrial-3.png", "/images/hero/industrial-3.webp"),
      }))
    : null;

  return (
    <div className="flex flex-col">
      <main>
        {/* Section 01 — Hero */}
        <HeroCarousel slides={customSlides} />

        {/* Partners Marquee Section */}
        <PartnersMarquee
          initialPartners={marqueePartners.map((partner) => ({
            ...partner,
            logoUrl: getPublicImageUrl(partner.logoUrl),
          }))}
          initialSettings={marqueeSettings}
        />

        {/* Section 02 — Gateway Cards */}
        <section className="py-20 relative bg-white dark:bg-background overflow-hidden border-y border-slate-200 dark:border-white/10 transition-colors duration-300 [content-visibility:auto] [contain-intrinsic-size:900px]">
          <div className="container mx-auto px-6 max-w-6xl">
            <Reveal className="text-center mb-12">
              <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
                Portal Access
              </span>
              <h2 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-6">
                Select Your Gateway
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-serif max-w-2xl mx-auto text-lg leading-relaxed">
                Empowering TUPV students to manage their internships with ease while providing industrial partners a secure platform for verification and recruitment.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Student Card */}
              <Reveal delay={0.1}>
                <div className="group relative flex flex-col h-full bg-[#fafaf9] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-12 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 rounded-2xl">
                  <header className="mb-10">
                    <h3 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                      Student Terminal
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
                      Your personal terminal for tracking training hours, managing logbooks, and accessing internship opportunities.
                    </p>
                  </header>

                  <div className="space-y-6 mb-12 flex-1">
                    {[
                      "Institutional Profile Certification",
                      "SIT Placement Manifest",
                      "Digital Logbook Verification",
                      "Archival Document Repository",
                    ].map((feature) => (
                      <div key={feature} className="flex items-start gap-4">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40" />
                        <span className="text-slate-700 dark:text-slate-300 font-serif">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/login/student"
                    className="group/btn relative w-full inline-flex h-14 items-center justify-center bg-primary text-white font-serif font-medium rounded-full overflow-hidden transition-all shadow-lg shadow-primary/20"
                  >
                    <span className="relative z-10">Access Student Portal</span>
                    <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  </Link>
                </div>
              </Reveal>

              {/* Company Card */}
              <Reveal delay={0.2}>
                <div className="group relative flex flex-col h-full bg-[#fafaf9] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-12 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 rounded-2xl">
                  <header className="mb-10">
                    <h3 className="text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                      Partner Verification
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-serif leading-relaxed">
                      Securely verify student logbooks, evaluate performance, and find the next generation of technical talent for your organization.
                    </p>
                  </header>

                  <div className="space-y-6 mb-12 flex-1">
                    {[
                      "Partner Verification Registry",
                      "Industrial Talent Acquisition",
                      "Performance Evaluation Terminal",
                      "Collaborative SIT Management",
                    ].map((feature) => (
                      <div key={feature} className="flex items-start gap-4">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40" />
                        <span className="text-slate-700 dark:text-slate-300 font-serif">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/login/employer"
                    className="group/btn relative w-full inline-flex h-14 items-center justify-center bg-primary text-white font-serif font-medium rounded-full overflow-hidden transition-all shadow-lg shadow-primary/20"
                  >
                    <span className="relative z-10">Authenticate Access</span>
                    <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
        {/* Section 03 — Institutional Impact (By the Numbers) */}
        <section className="py-16 bg-white dark:bg-background relative transition-colors duration-300 [content-visibility:auto] [contain-intrinsic-size:520px]">
          <div className="container mx-auto px-6 max-w-6xl">
            <Reveal className="text-center mb-10">
              <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
                Ecosystem Scale
              </span>
              <h2 className="text-4xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                Institutional Impact
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: activePlacements.toLocaleString(), label: "Active Placements" },
                { value: verifiedPartners.toLocaleString(), label: "Verified Partners" },
                { value: jobPostings.toLocaleString(), label: "Job Postings" },
                { value: verifiedHours.toLocaleString(), label: "Verified Hours" },
              ].map((stat, i) => (
                <Reveal key={stat.label} delay={0.1 * i} className="h-full">
                  {stat.label === "Job Postings" ? (
                    <Link href="/placements" className="block h-full group flex flex-col items-center justify-center text-center bg-[#fafaf9] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-10 h-full transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                      <span className="text-4xl md:text-5xl font-serif font-medium text-slate-900 dark:text-white mb-4 block group-hover:scale-105 transition-transform duration-500">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                        {stat.label}
                      </span>
                    </Link>
                  ) : (
                    <div className="group flex flex-col items-center justify-center text-center bg-[#fafaf9] dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 rounded-2xl p-10 h-full transition-all duration-500 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                      <span className="text-4xl md:text-5xl font-serif font-medium text-slate-900 dark:text-white mb-4 block group-hover:scale-105 transition-transform duration-500">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                        {stat.label}
                      </span>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        {/* Section 04 — Operational Protocol (How It Works) */}
        <section className="py-20 bg-[#fafaf9] dark:bg-background relative overflow-hidden border-t border-slate-200 dark:border-white/10 transition-colors duration-300 [content-visibility:auto] [contain-intrinsic-size:780px]">
          <div className="container mx-auto px-6 max-w-4xl">
            <header className="mb-12 text-center">
              <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">
                Operational Protocol
              </span>
              <h2 className="text-5xl font-serif font-medium text-slate-900 dark:text-white mb-6">
                How It Works
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-serif max-w-2xl mx-auto">
                Follow our streamlined process to transition from your academic studies into a professional industrial environment.
              </p>
            </header>

            <div className="space-y-12 relative">
              {/* Vertical Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 -translate-x-1/2 hidden md:block" />

              {[
                { phase: "01", title: "Start Your Profile", desc: "Set up your digital dossier using your TUPV credentials to track your entire internship history and SIT documentation in one place." },
                { phase: "02", title: "Find Your Placement", desc: "Get matched with pre-vetted industry partners that align with your technical specialization and future professional career goals." },
                { phase: "03", title: "Verify Your Progress", desc: "Submit daily logbook entries for real-time verification by your industry supervisors and university coordinators." },
              ].map((item, i) => (
                <Reveal key={item.phase} delay={i * 0.1} className={`relative flex flex-col md:flex-row gap-12 items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Step Number Circle */}
                  <div className="absolute left-0 md:left-1/2 top-0 -translate-x-1/2 w-10 h-10 rounded-full bg-[#fafaf9] dark:bg-background border border-slate-200 dark:border-white/20 flex items-center justify-center z-10">
                    <span className="font-serif text-sm font-medium text-slate-900 dark:text-white">{item.phase}</span>
                  </div>

                  <div className="md:w-1/2 space-y-4 text-center md:text-left">
                    <h3 className={`text-3xl font-serif font-medium text-slate-900 dark:text-white ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-serif ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      {item.desc}
                    </p>
                  </div>
                  <div className="md:w-1/2" />
                </Reveal>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-slate-200 dark:border-white/10 text-center">
              <p className="text-slate-500 dark:text-slate-400 mb-6 font-serif">
                Ready to begin your institutional onboarding?
              </p>
              <Link 
                href="/login/student"
                className="group/btn relative inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-medium rounded-full overflow-hidden transition-all duration-300 shadow-lg shadow-primary/20"
              >
                <span className="relative z-10">Access Student Terminal</span>
                <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
