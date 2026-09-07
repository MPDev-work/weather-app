import { Gauge, Moon, Sparkles, Sun, Thermometer, Wind } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export function SettingsView({
  settings,
  setTempUnit,
  setWindUnit,
  setTheme,
  setReducedMotion,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-2.5 py-4">
      <div className="px-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Settings
        </h2>
      </div>

      <GlassCard className="p-4 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white/60 mb-2">
            <Thermometer size={14} />
            <span>Temperature Unit</span>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-full">
            <button
              onClick={() => setTempUnit('C')}
              className={`py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out cursor-pointer ${
                settings.tempUnit === 'C'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Celsius (°C)
            </button>
            <button
              onClick={() => setTempUnit('F')}
              className={`py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out cursor-pointer ${
                settings.tempUnit === 'F'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Fahrenheit (°F)
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white/60 mb-2">
            <Wind size={14} />
            <span>Wind Speed Unit</span>
          </div>
          <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-full">
            <button
              onClick={() => setWindUnit('kmh')}
              className={`py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out cursor-pointer ${
                settings.windUnit === 'kmh'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Kilometers / hour (km/h)
            </button>
            <button
              onClick={() => setWindUnit('mph')}
              className={`py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out cursor-pointer ${
                settings.windUnit === 'mph'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Miles / hour (mph)
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white/60 mb-2">
            <Sun size={14} />
            <span>Theme</span>
          </div>
          <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 rounded-full">
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out cursor-pointer ${
                settings.theme === 'dark'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Moon size={14} />
              <span>Dark</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out cursor-pointer ${
                settings.theme === 'light'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sun size={14} />
              <span>Light</span>
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-full text-sm font-semibold transition-all duration-500 ease-out cursor-pointer ${
                settings.theme === 'system'
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sparkles size={14} />
              <span>Auto</span>
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white/60 mb-2">
            <Gauge size={14} />
            <span>Performance & Animation</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-[20px] bg-white/5">
            <div>
              <div className="text-sm font-medium text-white">
                Reduced Motion
              </div>
              <div className="text-xs text-white/60">
                Limit 3D canvas animations and spring physics
              </div>
            </div>
            <button
              onClick={() => setReducedMotion(!settings.reducedMotion)}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                settings.reducedMotion ? 'bg-blue-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  settings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-4 flex flex-col gap-2 text-xs text-white/60">
        <div className="font-semibold text-white/80">Data Provider</div>
        <div>
          Live atmospheric weather data, 24-hour timeline, and 7-day forecast
          powered by Open-Meteo API.
        </div>
      </GlassCard>
    </div>
  );
}
