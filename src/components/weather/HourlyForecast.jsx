import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Droplets } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { WeatherIcon } from './WeatherIcon';

export function HourlyForecast({ hourly = [], formatTemp }) {
  const scrollRef = useRef(null);
  const currentCardRef = useRef(null);

  useEffect(() => {
    if (currentCardRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const target = currentCardRef.current;
      const targetLeft = target.offsetLeft - container.offsetLeft - 10;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
    }
  }, [hourly]);

  if (!hourly || hourly.length === 0) return null;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <GlassCard className="flex flex-col">
      <div className="w-full flex items-center justify-between px-3 pt-3 text-xs uppercase tracking-wider font-semibold text-white/60">
        <div className="flex items-center gap-1.5">
          <Clock size={14} />
          <span>24-Hour Forecast</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll back"
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll next"
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="w-full flex gap-2.5 p-2.5 no-scrollbar overflow-x-scroll overflow-y-visible scroll-smooth"
      >
        {hourly.map((item, idx) => {
          const isCurrent = item.isCurrent;

          return (
            <motion.div
              key={item.rawTime || idx}
              ref={isCurrent ? currentCardRef : null}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: Math.min(0.3, idx * 0.015),
                ease: 'easeOut',
              }}
              className={`flex flex-col items-center justify-between min-w-[76px] py-3 px-2 rounded-[25px] ${
                isCurrent
                  ? 'bg-white/25 dark:bg-white/15 font-semibold'
                  : item.isPast
                    ? 'bg-white/5 opacity-65 hover:opacity-100 hover:bg-white/10'
                    : 'bg-white/10 dark:bg-white/5 hover:bg-white/15'
              } transition-all duration-500 ease-out shrink-0`}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold text-white">
                  {isCurrent ? 'Now' : item.displayHour}
                </span>
                {isCurrent && (
                  <span className="text-[10px] text-white/70 font-normal">
                    {item.displayHour}
                  </span>
                )}
              </div>

              <div className="my-2 flex flex-col items-center">
                <WeatherIcon type={item.type} size={22} />
                {item.precipitationProbability > 10 ? (
                  <span className="flex items-center gap-0.5 text-[11px] font-medium text-sky-300 mt-1">
                    <Droplets size={10} />
                    {item.precipitationProbability}%
                  </span>
                ) : (
                  <span className="text-[11px] opacity-0 mt-1">0%</span>
                )}
              </div>

              <span className="text-base font-semibold text-white">
                {formatTemp(item.temperature)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}
