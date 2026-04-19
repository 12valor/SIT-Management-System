import React from "react";
import Link from "next/link";

export function DashboardFooter() {
  return (
    <footer className="mt-20 pt-8 pb-12 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity">
          <img 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            className="h-8 w-auto object-contain grayscale" 
          />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-foreground uppercase tracking-[0.2em] font-heading">TUP-V SIT Platform</span>
            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest font-sans">Official Industrial Training Link</span>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
           <Link href="#" className="text-[9px] font-black text-muted-foreground hover:text-primary uppercase tracking-[0.2em] transition-colors font-sans">
             Support Center
           </Link>
           <Link href="#" className="text-[9px] font-black text-muted-foreground hover:text-primary uppercase tracking-[0.2em] transition-colors font-sans">
             Data Protocol
           </Link>
           <Link href="#" className="text-[9px] font-black text-muted-foreground hover:text-primary uppercase tracking-[0.2em] transition-colors font-sans">
             System Status
           </Link>
        </div>

        <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest font-sans">
          © 2026 TUP-VISAYAS • SECURE TERMINAL
        </p>
      </div>
    </footer>
  );
}
