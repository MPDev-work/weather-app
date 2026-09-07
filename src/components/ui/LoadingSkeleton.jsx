import { GlassCard } from './GlassCard';

export function LoadingSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-2.5 animate-pulse">
      <div className="flex flex-col items-center justify-center py-10 gap-2.5">
        <div className="h-8 w-48 bg-white/20 rounded-full" />
        <div className="h-4 w-32 bg-white/10 rounded-full" />
        <div className="h-40 w-40 my-4 bg-white/10 rounded-full" />
        <div className="h-20 w-44 bg-white/20 rounded-[30px]" />
        <div className="h-5 w-28 bg-white/15 rounded-full" />
        <div className="h-4 w-36 bg-white/10 rounded-full" />
      </div>

      <GlassCard className="p-2.5">
        <div className="h-5 w-36 bg-white/20 rounded-full mb-3" />
        <div className="flex gap-2.5 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-1 min-w-[70px] h-28 bg-white/10 rounded-[30px]"
            />
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <GlassCard className="p-2.5 flex flex-col gap-2.5">
          <div className="h-5 w-32 bg-white/20 rounded-full mb-2" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-full bg-white/10 rounded-[35px]" />
          ))}
        </GlassCard>

        <div className="grid grid-cols-2 gap-2.5">
          {[...Array(4)].map((_, i) => (
            <GlassCard key={i} className="p-2.5 h-36">
              <div className="h-4 w-20 bg-white/20 rounded-full mb-3" />
              <div className="h-8 w-24 bg-white/15 rounded-[15px]" />
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
