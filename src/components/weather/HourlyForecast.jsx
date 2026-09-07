import { motion } from 'framer-motion';
import { Clock, Droplets } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { WeatherIcon } from './WeatherIcon';

export function HourlyForecast({ hourly = [], formatTemp }) {
  if (!hourly || hourly.length === 0) return null;

  return (
    <GlassCard className="flex flex-col">
      <div className="w-full flex items-center gap-1.5 px-3 pt-3 text-xs uppercase tracking-wider font-semibold text-white/60">
        <Clock size={14} />
        <span>24-Hour Forecast</span>
      </div>

      <div className="w-full flex gap-2.5 p-2.5 no-scrollbar overflow-x-scroll overflow-y-visible">
        {hourly.map((item, idx) => (
          <motion.div
            key={item.rawTime}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.02, ease: 'easeOut' }}
            className={`flex flex-col items-center justify-between min-w-[72px] p-2.5 rounded-[20px] ${
              idx === 0
                ? 'bg-white/20 dark:bg-white/10 font-semibold'
                : 'bg-white/10 dark:bg-white/5 hover:bg-white/15'
            } transition-all duration-500 ease-out`}
          >
            <span className="text-xs text-white/80">{item.time}</span>

            <div className="my-2.5 flex flex-col items-center">
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
        ))}
      </div>
    </GlassCard>
  );
}
