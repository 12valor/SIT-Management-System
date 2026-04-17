import { Construction, Sparkles } from "lucide-react";

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-card border border-dashed border-border rounded-3xl animate-in-fade">
      <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
         <Construction className="h-8 w-8" />
      </div>
      <h2 className="text-3xl font-black tracking-tight mb-2 flex items-center gap-3">
        Feature Under Development <Sparkles className="h-6 w-6 text-blue-500 fill-blue-500" />
      </h2>
      <p className="text-muted-foreground font-medium max-w-sm mb-8">
        We're working hard to bring this feature to the SIT platform. Stay tuned for updates!
      </p>
      <div className="flex gap-2">
         <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce shadow-sm shadow-blue-600/40" />
         <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s] shadow-sm shadow-blue-600/40" />
         <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s] shadow-sm shadow-blue-600/40" />
      </div>
    </div>
  );
}
