import { DailyForecast } from './DailyForecast';
import { HourlyForecast } from './HourlyForecast';

export function ForecastView({ weather, formatTemp }) {
  if (!weather) return null;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-2.5 py-4">
      <div className="px-2">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          Weather Forecast
        </h2>
        <p className="text-sm text-white/60">
          Hourly and 7-day outlook for {weather.location.name}
        </p>
      </div>

      <HourlyForecast hourly={weather.hourly} formatTemp={formatTemp} />
      <DailyForecast forecast={weather.forecast} formatTemp={formatTemp} />
    </div>
  );
}
