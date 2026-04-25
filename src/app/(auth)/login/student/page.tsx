import { Montserrat, Poppins } from "next/font/google";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export default function StudentLoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Invalid GSFE credentials.");
        setIsLoading(false);
        return;
      }
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      const role = session?.user?.role;
      if (role === "STUDENT") router.push("/student/dashboard");
      else router.push("/");
    } catch {
      setError("Connectivity error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className={`${montserrat.variable} ${poppins.variable} font-poppins flex-1 flex flex-col pt-32 pb-12 bg-slate-50/50 dark:bg-[#050505]`}>
      
      {/* LOGO */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 z-20">
        <Link href="/" className="flex items-center gap-4">
          <Image 
            src="/Technological_University_of_the_Philippines_Seal.svg.png" 
            alt="TUP Seal" 
            width={40}
            height={40}
            className="h-10 w-auto grayscale dark:grayscale-0 dark:logo-red-filter" 
          />
          <span className="text-base font-black font-montserrat uppercase tracking-tighter text-slate-900 dark:text-white">
            TUPV SIT
          </span>
        </Link>
      </div>

      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-[460px] w-full"
        >
          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-100 dark:border-white/5 p-10 md:p-16 rounded-sm shadow-[40px_40px_80px_-20px_rgba(0,0,0,0.08)] dark:shadow-none">
            
            <header className="mb-14">
              <h1 className="text-4xl md:text-5xl font-black font-montserrat text-slate-900 dark:text-white uppercase tracking-tighter leading-[0.9] mb-4">
                Student <br /> Login
              </h1>
              <div className="h-1 w-12 bg-primary mb-6" />
              <p className="text-[14px] text-slate-500 font-medium leading-relaxed max-w-[240px]">
                Authentication required for <br /> SIT Portal access.
              </p>
            </header>

            <form onSubmit={handleLogin} className="space-y-10">
              {error && (
                <div className="flex items-center gap-2 text-primary">
                   <div className="h-1 w-1 rounded-full bg-primary" />
                   <p className="text-[12px] font-bold uppercase tracking-tight">{error}</p>
                </div>
              )}

              <div className="space-y-8">
                <div className="group relative">
                  <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2 group-focus-within:text-primary transition-colors">
                    GSFE Identifier
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@gsfe.tupv.edu.ph"
                      className="w-full h-14 pl-10 bg-transparent border-b-2 border-slate-100 dark:border-white/5 text-[16px] font-medium outline-none focus:border-primary transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800"
                    />
                  </div>
                </div>

                <div className="group relative">
                  <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2 group-focus-within:text-primary transition-colors">
                    Secret Key
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-14 pl-10 bg-transparent border-b-2 border-slate-100 dark:border-white/5 text-[16px] font-medium outline-none focus:border-primary transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 bg-slate-900 dark:bg-white text-white dark:text-black font-black font-montserrat uppercase tracking-[0.3em] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all flex items-center justify-center gap-4 disabled:opacity-50 text-[12px] group/btn"
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    Initialize Gateway
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                  </>
                )}
              </button>
            </form>

            <footer className="mt-16 pt-10 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
              <Link href="/login" className="text-[11px] font-bold font-montserrat text-slate-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-3 group">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-2" />
                Back
              </Link>
              <span className="text-[10px] font-bold text-slate-300 dark:text-slate-800 uppercase tracking-widest">v1.0.42</span>
            </footer>
          </div>
        </motion.div>
      </main>
    </div>
  );
}




