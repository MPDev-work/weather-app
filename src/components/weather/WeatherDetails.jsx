import {
  Compass,
  Droplets,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  SunMedium,
  Wind,
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function WeatherDetails({ current, sun, formatWind }) {
  if (!current) return null;

  const getUVStatus = (uv) => {
    if (uv <= 2) return { text: 'Low', color: 'bg-emerald-400' };
    if (uv <= 5) return { text: 'Moderate', color: 'bg-amber-400' };
    if (uv <= 7) return { text: 'High', color: 'bg-orange-500' };
    if (uv <= 10) return { text: 'Very High', color: 'bg-rose-500' };
    return { text: 'Extreme', color: 'bg-purple-600' };
  };

  const getVisibilityStatus = (km) => {
    if (km >= 10) return 'Clear and sharp view';
    if (km >= 6) return 'Good visibility';
    if (km >= 3) return 'Moderate haze';
    return 'Dense fog or mist';
  };

  const getHumidityStatus = (humidity) => {
    if (humidity < 30) return 'Dry air';
    if (humidity <= 60) return 'Comfortable';
    if (humidity <= 75) return 'Humid';
    return 'Very humid';
  };

  const uvInfo = getUVStatus(current.uvIndex);

  const getSunProgress = () => {
    if (!sun?.rawSunrise || !sun?.rawSunset) return 50;
    const now = new Date().getTime();
    const rise = new Date(sun.rawSunrise).getTime();
    const set = new Date(sun.rawSunset).getTime();

    if (now < rise) return 0;
    if (now > set) return 100;
    return Math.round(((now - rise) / (set - rise)) * 100);
  };

  const sunProgress = getSunProgress();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
      <GlassCard className="p-3 flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white/60">
          <Wind size={14} />
          <span>Wind</span>
        </div>
        <div className="flex items-center justify-between my-2">
          <div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {formatWind(current.windSpeed)}
            </div>
            <div className="text-xs text-white/70 mt-0.5">
              Direction: {current.windDirection}°
            </div>
          </div>
          <div className="relative w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <Compass size={28} className="text-white/40 absolute" />
            <div
              className="w-1 h-6 bg-rose-400 rounded-full transition-transform duration-700 ease-out origin-center"
              style={{ transform: `rotate(${current.windDirection}deg)` }}
            />
          </div>
        </div>
        <div className="text-xs text-white/60">
          Steady breeze with calm gusts
        </div>
      </GlassCard>

      <GlassCard className="p-3 flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white/60">
          <SunMedium size={14} />
          <span>UV Index</span>
        </div>
        <div className="my-2">
          <div className="text-2xl font-bold text-white tracking-tight">
            {current.uvIndex}
          </div>
          <div className="text-xs font-medium text-white/80 mt-0.5">
            {uvInfo.text}
          </div>
          <div className="w-full h-1.5 bg-white/15 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full ${uvInfo.color} rounded-full`}
              style={{
                width: `${Math.min(100, (current.uvIndex / 12) * 100)}%`,
              }}
            />
          </div>
        </div>
        <div className="text-xs text-white/60">
          {current.uvIndex > 4
            ? 'Sun protection recommended'
            : 'Low risk throughout day'}
        </div>
      </GlassCard>

      <GlassCard className="p-3 flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white/60">
          <Sunrise size={14} />
          <span>Sun Cycle</span>
        </div>
        <div className="my-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-white/60">Sunrise</span>
            <span className="text-lg font-semibold text-white">
              {sun.sunrise}
            </span>
          </div>
          <div className="flex-1 mx-3 flex flex-col items-center">
            <div className="w-full h-1 bg-white/15 rounded-full relative overflow-hidden">
              <div
                className="h-full bg-amber-300 rounded-full"
                style={{ width: `${sunProgress}%` }}
              />
            </div>
            <span className="text-[10px] text-white/60 mt-1">
              {sunProgress}% of daylight
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xs text-white/60">Sunset</span>
            <span className="text-lg font-semibold text-white">
              {sun.sunset}
            </span>
          </div>
        </div>
        <div className="text-xs text-white/60 flex items-center gap-1">
          <Sunset size={12} />
          <span>Dusk begins around {sun.sunset}</span>
        </div>
      </GlassCard>

      <GlassCard className="p-3 flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white/60">
          <Droplets size={14} />
          <span>Humidity</span>
        </div>
        <div className="my-2">
          <div className="text-2xl font-bold text-white tracking-tight">
            {current.humidity}%
          </div>
          <div className="text-xs text-white/70 mt-0.5">
            {getHumidityStatus(current.humidity)}
          </div>
          <div className="w-full h-1.5 bg-white/15 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-sky-400 rounded-full"
              style={{ width: `${current.humidity}%` }}
            />
          </div>
        </div>
        <div className="text-xs text-white/60">Moisture saturation level</div>
      </GlassCard>

      <GlassCard className="p-3 flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white/60">
          <Eye size={14} />
          <span>Visibility</span>
        </div>
        <div className="my-2">
          <div className="text-2xl font-bold text-white tracking-tight">
            {current.visibility} km
          </div>
          <div className="text-xs text-white/70 mt-0.5">
            {getVisibilityStatus(current.visibility)}
          </div>
        </div>
        <div className="text-xs text-white/60">Atmospheric clarity metric</div>
      </GlassCard>

      <GlassCard className="p-3 flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white/60">
          <Gauge size={14} />
          <span>Pressure</span>
        </div>
        <div className="my-2">
          <div className="text-2xl font-bold text-white tracking-tight">
            {current.pressure} hPa
          </div>
          <div className="text-xs text-white/70 mt-0.5">
            {current.pressure >= 1013
              ? 'High barometric pressure'
              : 'Low barometric pressure'}
          </div>
        </div>
        <div className="text-xs text-white/60">
          Sea level equivalent reading
        </div>
      </GlassCard>
    </div>
  );
}
