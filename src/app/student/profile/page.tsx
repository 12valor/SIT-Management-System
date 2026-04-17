import { Construction, Sparkles } from "lucide-react";

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-card border border-dashed border-border rounded-xl animate-in-fade">
      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
         <Construction className="h-8 w-8" />
      </div>
      <h2 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
        Feature Under Development <Sparkles className="h-6 w-6 text-amber-500 fill-amber-500" />
      </h2>
      <p className="text-muted-foreground font-medium max-w-sm mb-8">
        We're working hard to bring this feature to the SIT platform. Stay tuned for updates!
      </p>
      <div className="flex gap-2">
         <div className="w-2 h-2 rounded-full bg-primary animate-bounce shadow-sm shadow-primary/40" />
         <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s] shadow-sm shadow-primary/40" />
         <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s] shadow-sm shadow-primary/40" />
      </div>
    </div>
  );
}
