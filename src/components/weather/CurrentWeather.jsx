import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, MapPin } from 'lucide-react';
import { WeatherCanvas3D } from './3d/WeatherCanvas3D';

export function CurrentWeather({
  weather,
  formatTemp,
  reducedMotion = false,
  onOpenSearch,
}) {
  if (!weather) return null;

  const { location, current } = weather;
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col items-center justify-center text-center text-white py-4 md:py-6">
      <button
        onClick={onOpenSearch}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-500 ease-out cursor-pointer group"
      >
        <MapPin size={16} className="text-white/70 group-hover:text-white" />
        <span className="text-lg md:text-xl font-medium tracking-tight">
          {location.name}
        </span>
        {location.country && (
          <span className="text-sm text-white/60 font-normal">
            , {location.country}
          </span>
        )}
      </button>

      <div className="text-xs md:text-sm text-white/70 tracking-wide mt-1.5">
        {currentDate}
      </div>

      <div className="relative w-full max-w-[460px] md:max-w-[560px] h-64 md:h-80 my-1 flex items-center justify-center">
        <WeatherCanvas3D scene={current.scene} reducedMotion={reducedMotion} />
      </div>

      <motion.div
        key={`${current.temperature}-${current.condition}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <div className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tighter leading-none">
          {formatTemp(current.temperature)}
        </div>

        <div className="text-xl md:text-2xl font-medium text-white/90 mt-2">
          {current.condition}
        </div>

        <div className="flex items-center gap-3 text-sm text-white/70 mt-1 font-medium">
          <span>Feels like {formatTemp(current.feelsLike)}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5 text-white/80">
            <ArrowUp size={14} className="text-amber-300" />
            {formatTemp(current.todayHigh)}
          </span>
          <span className="flex items-center gap-0.5 text-white/80">
            <ArrowDown size={14} className="text-cyan-300" />
            {formatTemp(current.todayLow)}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
