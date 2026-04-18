"use client";

import { useState } from "react";
import { useMockStore } from "@/store/mock-store";
import { 
  User as UserIcon, 
  Mail, 
  BookOpen, 
  GraduationCap, 
  Save, 
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudentProfilePage() {
  const { user, updateProfile } = useMockStore();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    course: user?.course || "BS in Information Technology",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateProfile(formData);
    
    setIsSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden p-8 md:p-12 rounded-2xl bg-slate-900 text-white shadow-2xl flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full" />
        
        <div className="relative z-10">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-4xl font-black shadow-2xl shadow-primary/40 border-4 border-white/10">
            {user.name?.split(' ').filter(Boolean).map(n => n[0]).join('') || '?'}
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 border-4 border-slate-900 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="relative z-10 text-center md:text-left space-y-2">
          <p className="text-primary font-black uppercase tracking-widest text-[10px]">Student Identity</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">{user.name}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
             <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                {formData.course}
             </div>
             <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                S.Y. 2024-2025
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
             <div className="p-6 border-b border-border bg-muted/30">
                <h3 className="font-bold text-lg">Personal Information</h3>
                <p className="text-xs text-muted-foreground font-medium">Update your profile details and preferences.</p>
             </div>
             
             <form onSubmit={handleSave} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-10 pr-4 h-11 rounded-xl border border-border bg-muted/10 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none text-sm font-medium transition-all"
                        />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <input 
                          type="email" 
                          value={formData.email}
                          disabled
                          className="w-full pl-10 pr-4 h-11 rounded-xl border border-border bg-muted/5 text-muted-foreground cursor-not-allowed outline-none text-sm font-medium"
                        />
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Current Course / Specialization</label>
                   <div className="relative">
                    <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <select 
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      className="w-full pl-10 pr-4 h-11 rounded-xl border border-border bg-muted/10 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none text-sm font-medium transition-all appearance-none"
                    >
                      <option>BS in Information Technology</option>
                      <option>BS in Computer Science</option>
                      <option>BS in Civil Engineering</option>
                      <option>BS in Electronics Engineering</option>
                    </select>
                   </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                   {success ? (
                     <p className="text-green-600 text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                        <CheckCircle2 className="h-4 w-4" /> Profile updated successfully
                     </p>
                   ) : <div />}
                   
                   <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-8 h-11 rounded-xl bg-primary text-primary-foreground font-black text-xs shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-70"
                   >
                    {isSaving ? <Save className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Changes
                   </button>
                </div>
             </form>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
           <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
              <h4 className="font-bold text-sm mb-4">Account Status</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">SIT Status</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase">In Progress</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground font-medium">Placement</span>
                    <span className="text-xs font-bold flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-muted-foreground" />
                      Pending Hired
                    </span>
                 </div>
              </div>
           </div>

           <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-xl">
              <h4 className="font-black text-sm mb-2 uppercase tracking-tight">Need Help?</h4>
              <p className="text-xs font-medium opacity-80 mb-6 leading-relaxed">
                If you need to change your school ID or role, please contact the TUP-V SIT Coordinator.
              </p>
              <button className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-[10px] font-black uppercase tracking-widest transition-all">
                 Contact Coordinator
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
