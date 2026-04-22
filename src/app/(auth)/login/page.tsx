"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Building2, ShieldCheck, ArrowRight, Bell } from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  {
    title: "Student",
    description: "Manage your SIT logbook, journals, and view your evaluation reports.",
    icon: GraduationCap,
    href: "/login/student",
    color: "bg-primary",
  },
  {
    title: "Industry Partner",
    description: "Verify trainee attendance and evaluate student performance in the field.",
    icon: Building2,
    href: "/login/employer",
    color: "bg-slate-700",
  },
  {
    title: "Coordinator",
    description: "Institutional oversight, SIT management, and student placement monitoring.",
    icon: ShieldCheck,
    href: "/login/coordinator",
    color: "bg-red-700",
  },
];

export default function LoginGatePage() {
  return (
    <div className="flex-1 flex flex-col pt-32 pb-12">
      
      {/* INSTITUTIONAL HEADER */}
      <div className="flex flex-col items-center justify-center mb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-8 mb-10"
        >
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={70}
            height={70}
            className="h-[70px] w-auto grayscale brightness-200 opacity-90" 
          />
          <div className="h-10 w-px bg-slate-200 hidden sm:block" />
          <div className="flex flex-col items-start leading-none">
             <h1 className="text-xl font-bold font-heading text-slate-900 uppercase tracking-tight">TUP-Visayas</h1>
             <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1">SIT Management System</span>
          </div>
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-center font-premium text-slate-900 uppercase tracking-tight max-w-2xl leading-[1.1]">
          Portal Access Selection
        </h2>
        <p className="mt-8 text-slate-500 font-medium text-center max-w-lg leading-relaxed">
          Please select your role to proceed to the secure authentication terminal.
        </p>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, idx) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                href={role.href}
                className="group relative flex flex-col h-full bg-white border border-slate-200 p-10 rounded-2xl hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="mb-10 flex items-center justify-between">
                  <div className={`h-14 w-14 ${role.color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                    <role.icon className="h-7 w-7" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-2xl font-bold font-heading text-slate-900 mb-4 uppercase tracking-tight">
                  {role.title}
                </h3>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                  {role.description}
                </p>

                <div className="pt-6 border-t border-slate-100">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">Enter Portal</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* SYSTEM ANNOUNCEMENTS */}
      <div className="mt-20 border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 shrink-0">
            <Bell className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Notice</span>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-10 items-center overflow-hidden">
             {[
               "DTR submission deadline: Every Friday 5PM.",
               "Security updates applied to the Institutional Portal.",
               "Please check the updated OJT requirements for 2024."
             ].map((log, i) => (
               <div key={i} className="flex items-center gap-3 whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-slate-300 font-heading">0{i+1}</span>
                  <span className="text-[11px] font-medium text-slate-600">{log}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
