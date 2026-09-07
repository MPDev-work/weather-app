import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSun,
  Moon,
  Snowflake,
  Sun,
} from 'lucide-react';

export function WeatherIcon({
  type,
  isNight = false,
  size = 24,
  className = '',
}) {
  switch (type) {
    case 'clear':
      return isNight ? (
        <Moon size={size} className={`text-sky-200 ${className}`} />
      ) : (
        <Sun size={size} className={`text-amber-300 ${className}`} />
      );
    case 'partly-cloudy':
      return isNight ? (
        <CloudMoon size={size} className={`text-indigo-200 ${className}`} />
      ) : (
        <CloudSun size={size} className={`text-amber-200 ${className}`} />
      );
    case 'cloudy':
      return <Cloud size={size} className={`text-slate-200 ${className}`} />;
    case 'fog':
      return <CloudFog size={size} className={`text-slate-300 ${className}`} />;
    case 'rain':
      return <CloudRain size={size} className={`text-blue-300 ${className}`} />;
    case 'heavy-rain':
      return (
        <CloudDrizzle size={size} className={`text-blue-400 ${className}`} />
      );
    case 'thunderstorm':
      return (
        <CloudLightning
          size={size}
          className={`text-purple-300 ${className}`}
        />
      );
    case 'snow':
      return <Snowflake size={size} className={`text-cyan-200 ${className}`} />;
    default:
      return isNight ? (
        <Moon size={size} className={`text-sky-200 ${className}`} />
      ) : (
        <Sun size={size} className={`text-amber-300 ${className}`} />
      );
  }
}
