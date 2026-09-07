import { AlertCircle, RefreshCw } from 'lucide-react';
import { GlassCard } from './GlassCard';

export function ErrorState({ message, onRetry }) {
  return (
    <div className="w-full max-w-md mx-auto py-20 px-2.5">
      <GlassCard
        isParent
        className="p-6 flex flex-col items-center text-center gap-2.5"
      >
        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-300 mb-2">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-xl font-semibold text-white">
          Unable to Load Weather
        </h2>
        <p className="text-sm text-white/70 max-w-xs">
          {message || 'Check your connection and try again.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all duration-500 ease-out active:scale-95 cursor-pointer"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </GlassCard>
    </div>
  );
}
