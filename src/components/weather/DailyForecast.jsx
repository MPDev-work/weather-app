import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  Droplets,
  Sunrise,
  SunMedium,
  Wind,
} from 'lucide-react';
import { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { WeatherIcon } from './WeatherIcon';

export function DailyForecast({ forecast = [], formatTemp }) {
  const [expandedDate, setExpandedDate] = useState(null);

  if (!forecast || forecast.length === 0) return null;

  const allLows = forecast.map((d) => d.minTemp);
  const allHighs = forecast.map((d) => d.maxTemp);
  const globalMin = Math.min(...allLows);
  const globalMax = Math.max(...allHighs);
  const totalRange = Math.max(1, globalMax - globalMin);

  const toggleDay = (date) => {
    setExpandedDate((prev) => (prev === date ? null : date));
  };

  return (
    <GlassCard className="p-2.5 flex flex-col gap-2.5">
      <div className="flex items-center justify-between px-1 text-xs uppercase tracking-wider font-semibold text-white/60">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          <span>7-Day Forecast</span>
        </div>
        <span className="text-[11px] normal-case tracking-normal font-normal text-white/40">
          Tap a day for details
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        {forecast.map((day) => {
          const isExpanded = expandedDate === day.date;
          const leftPercent = Math.max(
            0,
            ((day.minTemp - globalMin) / totalRange) * 100,
          );
          const barWidth = Math.max(
            8,
            ((day.maxTemp - day.minTemp) / totalRange) * 100,
          );

          return (
            <div key={day.date} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggleDay(day.date)}
                className={`w-full flex items-center justify-between py-2.5 px-3 rounded-[30px] transition-all duration-300 ease-out text-sm cursor-pointer ${
                  isExpanded
                    ? 'bg-white/20 dark:bg-white/15'
                    : 'hover:bg-white/10 dark:hover:bg-white/5'
                }`}
              >
                <div className="w-16 font-medium text-white text-left truncate">
                  {day.dayName}
                </div>

                <div className="flex items-center gap-1.5 w-20 justify-start">
                  <WeatherIcon type={day.type} size={20} />
                  {day.precipitationProbability > 20 && (
                    <span className="flex items-center text-[11px] text-sky-300 font-medium">
                      <Droplets size={10} className="mr-0.5" />
                      {day.precipitationProbability}%
                    </span>
                  )}
                </div>

                <div className="w-10 text-right text-white/70 font-medium">
                  {formatTemp(day.minTemp)}
                </div>

                <div className="flex-1 mx-3 h-1.5 bg-white/15 rounded-full overflow-hidden relative">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 via-amber-300 to-rose-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${barWidth}%`,
                    }}
                  />
                </div>

                <div className="w-10 text-right text-white font-semibold">
                  {formatTemp(day.maxTemp)}
                </div>

                <div className="w-6 flex items-center justify-end ml-1">
                  <ChevronDown
                    size={15}
                    className={`text-white/50 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-1.5 p-2.5 rounded-[30px] bg-white/10 dark:bg-white/5 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <WeatherIcon type={day.type} size={24} />
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {day.condition}
                            </div>
                            <div className="text-xs text-white/60">
                              {day.fullDayName} • {day.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold text-white">
                            {formatTemp(day.maxTemp)}
                          </span>
                          <span className="text-xs text-white/60 ml-1">
                            / {formatTemp(day.minTemp)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div className="flex flex-col p-2 rounded-[20px] bg-white/5">
                          <span className="text-[10px] uppercase font-semibold text-white/50 flex items-center gap-1">
                            <Droplets size={12} className="text-sky-300" />
                            Rain Chance
                          </span>
                          <span className="text-sm font-bold text-white mt-1">
                            {day.precipitationProbability}%
                          </span>
                        </div>

                        <div className="flex flex-col p-2 rounded-[20px] bg-white/5">
                          <span className="text-[10px] uppercase font-semibold text-white/50 flex items-center gap-1">
                            <SunMedium size={12} className="text-amber-300" />
                            UV Index
                          </span>
                          <span className="text-sm font-bold text-white mt-1">
                            {day.uvMax}
                          </span>
                        </div>

                        <div className="flex flex-col p-2 rounded-[20px] bg-white/5">
                          <span className="text-[10px] uppercase font-semibold text-white/50 flex items-center gap-1">
                            <Wind size={12} className="text-teal-300" />
                            Max Wind
                          </span>
                          <span className="text-sm font-bold text-white mt-1">
                            {day.windSpeedMax} km/h
                          </span>
                        </div>

                        <div className="flex flex-col p-2 rounded-[20px] bg-white/5">
                          <span className="text-[10px] uppercase font-semibold text-white/50 flex items-center gap-1">
                            <Sunrise size={12} className="text-rose-300" />
                            Sun Hours
                          </span>
                          <span className="text-xs font-semibold text-white mt-1">
                            {day.sunriseTime} - {day.sunsetTime}
                          </span>
                        </div>
                      </div>

                      {day.hourly && day.hourly.length > 0 && (
                        <div className="flex flex-col gap-1.5 pt-1">
                          <span className="text-[11px] uppercase tracking-wider font-semibold text-white/50">
                            Hourly Outlook for {day.dayName}
                          </span>
                          <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {day.hourly.map((h) => (
                              <div
                                key={h.time}
                                className="flex flex-col items-center justify-between min-w-[56px] py-2 px-1.5 rounded-[20px] bg-white/5 text-center shrink-0"
                              >
                                <span className="text-[11px] text-white/70">
                                  {h.time}
                                </span>
                                <div className="my-1.5 flex flex-col items-center">
                                  <WeatherIcon type={h.type} size={18} />
                                  {h.precipitationProbability > 15 ? (
                                    <span className="text-[10px] text-sky-300 font-medium mt-0.5">
                                      {h.precipitationProbability}%
                                    </span>
                                  ) : null}
                                </div>
                                <span className="text-xs font-semibold text-white">
                                  {formatTemp(h.temperature)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
