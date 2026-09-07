import { motion } from 'framer-motion';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function Sidebar({
  locations = [],
  activeLocation,
  onSelectLocation,
  onRemoveLocation,
  onOpenSearch,
}) {
  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 gap-2.5 sticky top-20 self-start z-30">
      <GlassCard className="p-2.5 flex flex-col gap-2.5 max-h-[calc(100vh-6.5rem)] rounded-[30px]">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white/70">
            <MapPin size={14} />
            <span>Saved Locations</span>
          </div>
          <button
            onClick={onOpenSearch}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-500 ease-out cursor-pointer"
            aria-label="Add city"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 overflow-y-auto pr-0.5 no-scrollbar">
          {locations.map((loc) => {
            const isActive =
              Math.abs(loc.latitude - activeLocation?.latitude) < 0.05 &&
              Math.abs(loc.longitude - activeLocation?.longitude) < 0.05;

            return (
              <motion.div
                key={loc.id || `${loc.latitude}-${loc.longitude}`}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={`group relative flex items-center justify-between p-2.5 rounded-[20px] transition-all duration-500 ease-out cursor-pointer ${
                  isActive
                    ? 'bg-white/25 dark:bg-white/15 text-white'
                    : 'bg-white/5 hover:bg-white/15 text-white/80 hover:text-white'
                }`}
                onClick={() => onSelectLocation(loc)}
              >
                <div className="flex flex-col overflow-hidden pr-2">
                  <span className="text-sm font-semibold truncate leading-tight">
                    {loc.name}
                  </span>
                  <span className="text-[11px] text-white/60 truncate">
                    {loc.country || loc.admin1}
                  </span>
                </div>

                {locations.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveLocation(loc.id);
                    }}
                    aria-label={`Remove ${loc.name}`}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-white/20 text-white/60 hover:text-red-300 transition-all duration-300 ease-out cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>
    </aside>
  );
}
