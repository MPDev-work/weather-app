import { getWeatherMeta } from '../utils/weatherConditions';

export async function fetchWeatherData(lat, lon, locationInfo = {}) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index,visibility&hourly=temperature_2m,precipitation_probability,weather_code,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  const data = await response.json();
  return normalizeWeatherData(data, locationInfo);
}

function normalizeWeatherData(data, locationInfo) {
  const { current, daily, hourly } = data;
  const meta = getWeatherMeta(current.weather_code, current.is_day);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullDaysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const forecast = daily.time.map((dateStr, index) => {
    const d = new Date(dateStr);
    const dayName = index === 0 ? 'Today' : daysOfWeek[d.getDay()];
    const fullDayName = fullDaysOfWeek[d.getDay()];
    const dayMeta = getWeatherMeta(daily.weather_code[index], 1);

    return {
      date: dateStr,
      dayName,
      fullDayName,
      maxTemp: Math.round(daily.temperature_2m_max[index]),
      minTemp: Math.round(daily.temperature_2m_min[index]),
      conditionCode: daily.weather_code[index],
      condition: dayMeta.label,
      type: dayMeta.type,
      precipitationProbability: daily.precipitation_probability_max[index] ?? 0,
      uvMax: daily.uv_index_max?.[index] ?? 0,
      sunrise: daily.sunrise[index],
      sunset: daily.sunset[index],
    };
  });

  const currentHourTime = new Date().toISOString().slice(0, 13);
  let startIndex = hourly.time.findIndex((t) => t.startsWith(currentHourTime));
  if (startIndex === -1) startIndex = 0;

  const hourlySlice = hourly.time
    .slice(startIndex, startIndex + 24)
    .map((timeStr, i) => {
      const rawIndex = startIndex + i;
      const d = new Date(timeStr);
      const hour = d.getHours();
      const isDayTime = hour >= 6 && hour < 20 ? 1 : 0;
      const hourMeta = getWeatherMeta(hourly.weather_code[rawIndex], isDayTime);

      return {
        time: i === 0 ? 'Now' : `${hour.toString().padStart(2, '0')}:00`,
        rawTime: timeStr,
        temperature: Math.round(hourly.temperature_2m[rawIndex]),
        conditionCode: hourly.weather_code[rawIndex],
        condition: hourMeta.label,
        type: hourMeta.type,
        precipitationProbability:
          hourly.precipitation_probability[rawIndex] ?? 0,
      };
    });

  const visibilityKm = current.visibility
    ? Number((current.visibility / 1000).toFixed(1))
    : 10;
  const todaySunrise = daily.sunrise?.[0]
    ? new Date(daily.sunrise[0]).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '06:00';
  const todaySunset = daily.sunset?.[0]
    ? new Date(daily.sunset[0]).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '18:00';

  return {
    location: {
      name: locationInfo.name || 'Current Location',
      country: locationInfo.country || '',
      admin1: locationInfo.admin1 || '',
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    },
    current: {
      time: current.time,
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      condition: meta.label,
      conditionCode: current.weather_code,
      scene: meta.scene,
      gradient: meta.gradient,
      isDay: current.is_day === 1,
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: Math.round(current.wind_speed_10m),
      windDirection: current.wind_direction_10m,
      pressure: Math.round(current.pressure_msl || current.surface_pressure),
      uvIndex: Math.round(current.uv_index || 0),
      visibility: visibilityKm,
      precipitation: current.precipitation || 0,
      cloudCover: current.cloud_cover || 0,
      todayHigh: Math.round(daily.temperature_2m_max[0]),
      todayLow: Math.round(daily.temperature_2m_min[0]),
    },
    hourly: hourlySlice,
    forecast,
    sun: {
      sunrise: todaySunrise,
      sunset: todaySunset,
      rawSunrise: daily.sunrise?.[0],
      rawSunset: daily.sunset?.[0],
    },
  };
}
