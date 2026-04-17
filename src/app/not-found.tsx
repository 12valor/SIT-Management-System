import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="relative mb-8 animate-bounce">
         <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center shadow-inner">
            <span className="text-4xl font-black text-muted-foreground/30">404</span>
         </div>
      </div>
      <h1 className="text-3xl font-black tracking-tight mb-2">Page Not Found</h1>
      <p className="text-muted-foreground font-medium text-center max-w-[400px] mb-8 leading-relaxed">
        Oops! It looks like the page you're searching for has been moved or doesn't exist in our training module.
      </p>
      <Link 
        href="/" 
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Home
      </Link>
    </div>
  );
}
