export const WMO_CODES = {
  0: { label: 'Clear Sky', type: 'clear' },
  1: { label: 'Mainly Clear', type: 'clear' },
  2: { label: 'Partly Cloudy', type: 'partly-cloudy' },
  3: { label: 'Overcast', type: 'cloudy' },
  45: { label: 'Foggy', type: 'fog' },
  48: { label: 'Depositing Rime Fog', type: 'fog' },
  51: { label: 'Light Drizzle', type: 'rain' },
  53: { label: 'Moderate Drizzle', type: 'rain' },
  55: { label: 'Dense Drizzle', type: 'rain' },
  56: { label: 'Light Freezing Drizzle', type: 'rain' },
  57: { label: 'Dense Freezing Drizzle', type: 'rain' },
  61: { label: 'Slight Rain', type: 'rain' },
  63: { label: 'Moderate Rain', type: 'rain' },
  65: { label: 'Heavy Rain', type: 'heavy-rain' },
  66: { label: 'Light Freezing Rain', type: 'rain' },
  67: { label: 'Heavy Freezing Rain', type: 'heavy-rain' },
  71: { label: 'Slight Snowfall', type: 'snow' },
  73: { label: 'Moderate Snowfall', type: 'snow' },
  75: { label: 'Heavy Snowfall', type: 'snow' },
  77: { label: 'Snow Grains', type: 'snow' },
  80: { label: 'Slight Rain Showers', type: 'rain' },
  81: { label: 'Moderate Rain Showers', type: 'rain' },
  82: { label: 'Violent Rain Showers', type: 'heavy-rain' },
  85: { label: 'Slight Snow Showers', type: 'snow' },
  86: { label: 'Heavy Snow Showers', type: 'snow' },
  95: { label: 'Thunderstorm', type: 'thunderstorm' },
  96: { label: 'Thunderstorm with Slight Hail', type: 'thunderstorm' },
  99: { label: 'Thunderstorm with Heavy Hail', type: 'thunderstorm' },
};

export function getWeatherMeta(code, isDay = 1) {
  const match = WMO_CODES[code] || { label: 'Fair', type: 'clear' };
  const isNight = isDay === 0;

  let scene = 'sun';
  if (isNight && match.type === 'clear') {
    scene = 'moon';
  } else if (match.type === 'partly-cloudy') {
    scene = isNight ? 'clouds-night' : 'clouds';
  } else if (match.type === 'cloudy') {
    scene = 'clouds';
  } else if (match.type === 'fog') {
    scene = 'fog';
  } else if (match.type === 'rain' || match.type === 'heavy-rain') {
    scene = 'rain';
  } else if (match.type === 'thunderstorm') {
    scene = 'thunderstorm';
  } else if (match.type === 'snow') {
    scene = 'snow';
  }

  let gradient = 'from-sky-400 via-blue-500 to-indigo-600';
  if (isNight) {
    gradient = 'from-[#0a0f24] via-[#101935] to-[#050814]';
  } else {
    switch (scene) {
      case 'clouds':
      case 'clouds-night':
        gradient = 'from-slate-400 via-slate-500 to-blue-700';
        break;
      case 'rain':
        gradient = 'from-slate-700 via-blue-900 to-slate-900';
        break;
      case 'thunderstorm':
        gradient = 'from-slate-950 via-purple-950 to-[#0d091a]';
        break;
      case 'snow':
        gradient = 'from-slate-200 via-blue-200 to-indigo-300';
        break;
      case 'fog':
        gradient = 'from-slate-400 via-stone-500 to-slate-600';
        break;
      default:
        gradient = 'from-sky-400 via-blue-500 to-indigo-600';
    }
  }

  return {
    label: match.label,
    type: match.type,
    scene,
    gradient,
    isNight,
  };
}
