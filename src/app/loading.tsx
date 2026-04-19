

export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-[100]">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <div className="absolute w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
          <span className="text-primary-foreground font-bold text-xs">T</span>
        </div>
      </div>
      <div className="mt-8 space-y-2 text-center animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h2 className="text-xl font-bold tracking-tight">Loading SIT Platform</h2>
        <p className="text-sm text-muted-foreground font-medium">Securing your session and preparing your workspace...</p>
      </div>
    </div>
  );
}
