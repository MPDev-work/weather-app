import { Calendar, Droplets } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { WeatherIcon } from './WeatherIcon';

export function DailyForecast({ forecast = [], formatTemp }) {
  if (!forecast || forecast.length === 0) return null;

  const allLows = forecast.map((d) => d.minTemp);
  const allHighs = forecast.map((d) => d.maxTemp);
  const globalMin = Math.min(...allLows);
  const globalMax = Math.max(...allHighs);
  const totalRange = Math.max(1, globalMax - globalMin);

  return (
    <GlassCard className="p-2.5 flex flex-col gap-2.5">
      <div className="flex items-center gap-1.5 px-1 text-xs uppercase tracking-wider font-semibold text-white/60">
        <Calendar size={14} />
        <span>7-Day Forecast</span>
      </div>

      <div className="flex flex-col gap-1">
        {forecast.map((day) => {
          const leftPercent = Math.max(
            0,
            ((day.minTemp - globalMin) / totalRange) * 100,
          );
          const barWidth = Math.max(
            8,
            ((day.maxTemp - day.minTemp) / totalRange) * 100,
          );

          return (
            <div
              key={day.date}
              className="flex items-center justify-between py-2 px-2.5 rounded-[30px] hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-500 ease-out text-sm"
            >
              <div className="w-16 font-medium text-white truncate">
                {day.dayName}
              </div>

              <div className="flex items-center gap-1.5 w-16 justify-center">
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
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
