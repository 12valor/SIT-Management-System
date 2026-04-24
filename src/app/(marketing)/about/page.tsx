"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Target, Award, Users, BookOpen, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] pt-32 pb-20 overflow-hidden">
      {/* Background Blueprint Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0">
        <div className="absolute inset-0 bg-[grid-line] bg-[length:40px_40px]" 
             style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section - Industrial Brutalism */}
        <div className="flex flex-col md:flex-row gap-12 items-start mb-32">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Established 1977
              </span>
              <h1 className="text-6xl md:text-8xl font-black font-premium text-slate-900 dark:text-white uppercase leading-[0.9] tracking-tighter mb-8">
                Engineering <br />
                <span className="text-primary">Excellence</span>
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
                The TUPV Supervised Industrial Training (SIT) Management System is the institutional bridge between academic theory and industrial practice.
              </p>
            </motion.div>
          </div>
          
          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-video bg-slate-900 dark:bg-white/5 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 group shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-32 h-32 text-white/10 dark:text-white/5 group-hover:scale-110 transition-transform duration-700" />
              </div>
              {/* Decorative data points */}
              <div className="absolute bottom-6 left-6 flex gap-4">
                <div className="h-1 w-12 bg-primary rounded-full" />
                <div className="h-1 w-4 bg-primary/30 rounded-full" />
              </div>
            </motion.div>
            
            {/* Floating Metric */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-10 -left-10 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl hidden md:block"
            >
              <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">500+</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industry Partners</div>
            </motion.div>
          </div>
        </div>

        {/* Mission & Vision - Editorial Layout */}
        <div className="grid md:grid-cols-2 gap-20 mb-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="w-12 h-1.5 bg-primary rounded-full" />
            <h2 className="text-4xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight">Our Mission</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              To provide a streamlined, transparent, and high-performance digital environment where TUPV students can transition seamlessly into their professional careers. We aim to automate the administrative burden of SIT while enhancing the quality of industrial engagement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-white/20 rounded-full" />
            <h2 className="text-4xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight">Our Vision</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              To be the benchmark for institutional industrial training management in the Philippines, leveraging technology to foster the next generation of Filipino engineering and technology leaders.
            </p>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-40">
          {[
            { icon: Target, title: "Precision", desc: "Digital tracking of every SIT hour with institutional accuracy." },
            { icon: Award, title: "Excellence", desc: "Connecting students only with pre-vetted, high-caliber industry partners." },
            { icon: Users, title: "Synergy", desc: "A unified platform for students, coordinators, and employers." }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 group hover:border-primary/50 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-4">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Institutional Heritage Strip */}
        <div className="relative py-24 border-y border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[15rem] font-black text-slate-100 dark:text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
            TUPV HERITAGE TUPV HERITAGE TUPV HERITAGE
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-8" />
            <h2 className="text-4xl font-bold font-premium text-slate-900 dark:text-white uppercase tracking-tight mb-8">Grounded in Tradition, Engineered for the Future</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
              "The Technological University of the Philippines Visayas remains committed to the development of human resources in engineering and technology."
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
