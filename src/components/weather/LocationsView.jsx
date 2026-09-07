import { motion } from 'framer-motion';
import { Check, MapPin, Plus, Trash2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function LocationsView({
  locations = [],
  activeLocation,
  onSelectLocation,
  onRemoveLocation,
  onOpenSearch,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-2.5 py-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Saved Locations
        </h2>
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all duration-500 ease-out cursor-pointer"
        >
          <Plus size={16} />
          <span>Add City</span>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {locations.map((loc) => {
          const isActive =
            Math.abs(loc.latitude - activeLocation?.latitude) < 0.05 &&
            Math.abs(loc.longitude - activeLocation?.longitude) < 0.05;

          return (
            <motion.div
              key={loc.id || `${loc.latitude}-${loc.longitude}`}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <GlassCard
                interactive
                onClick={() => onSelectLocation(loc)}
                className={`p-4 flex items-center justify-between ${
                  isActive ? 'bg-white/25 dark:bg-white/15' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-white">
                        {loc.name}
                      </span>
                      {isActive && (
                        <span className="flex items-center gap-0.5 text-xs bg-emerald-500/20 text-emerald-300 font-medium px-2 py-0.5 rounded-full">
                          <Check size={12} />
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/60">
                      {loc.admin1 ? `${loc.admin1}, ` : ''}
                      {loc.country ||
                        `${loc.latitude.toFixed(2)}°, ${loc.longitude.toFixed(2)}°`}
                    </div>
                  </div>
                </div>

                {locations.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveLocation(loc.id);
                    }}
                    aria-label={`Remove ${loc.name}`}
                    className="p-2 rounded-full hover:bg-white/20 text-white/50 hover:text-rose-300 transition-all duration-300 ease-out cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
