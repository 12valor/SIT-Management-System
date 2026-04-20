export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      <div className="flex flex-col items-center gap-6">
        {/* Institutional Loader */}
        <div className="relative">
          <div className="w-16 h-16 border-[3px] border-slate-100 border-t-[#800000] rounded-full animate-spin shadow-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center animate-pulse">
              <span className="text-white font-black text-[10px] tracking-tighter">SIT</span>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <div className="flex flex-col items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <h2 className="text-sm font-bold tracking-tight text-slate-800 uppercase">Synchronizing Platform</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] animate-pulse">Establishing Secure Connection</p>
        </div>
      </div>

      {/* Subtle Bottom Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-slate-50">
        <div className="h-full bg-[#800000] animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }} />
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
