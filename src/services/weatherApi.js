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

    const dayHourly = [];
    for (let h = 0; h < hourly.time.length; h++) {
      if (hourly.time[h].startsWith(dateStr)) {
        const hour = parseInt(hourly.time[h].slice(11, 13), 10);
        const isDayTime = hour >= 6 && hour < 19 ? 1 : 0;
        const hourMeta = getWeatherMeta(hourly.weather_code[h], isDayTime);
        dayHourly.push({
          time: `${hour.toString().padStart(2, '0')}:00`,
          hour,
          temperature: Math.round(hourly.temperature_2m[h]),
          condition: hourMeta.label,
          type: hourMeta.type,
          precipitationProbability: hourly.precipitation_probability[h] ?? 0,
        });
      }
    }

    return {
      date: dateStr,
      dayName,
      fullDayName,
      maxTemp: Math.round(daily.temperature_2m_max[index]),
      minTemp: Math.round(daily.temperature_2m_min[index]),
      conditionCode: daily.weather_code[index],
      condition: dayMeta.label,
      type: dayMeta.type,
      scene: dayMeta.scene,
      precipitationProbability: daily.precipitation_probability_max[index] ?? 0,
      uvMax: daily.uv_index_max?.[index] ?? 0,
      windSpeedMax: Math.round(daily.wind_speed_10m_max?.[index] ?? 0),
      sunriseTime: daily.sunrise?.[index]
        ? daily.sunrise[index].slice(11, 16)
        : '06:00',
      sunsetTime: daily.sunset?.[index]
        ? daily.sunset[index].slice(11, 16)
        : '18:00',
      hourly: dayHourly,
    };
  });

  const currentHourPrefix = current.time ? current.time.slice(0, 13) : '';
  const currentDatePrefix = current.time ? current.time.slice(0, 10) : '';

  let currentHourIndex = hourly.time.findIndex((t) =>
    t.startsWith(currentHourPrefix),
  );
  if (currentHourIndex === -1) {
    currentHourIndex = hourly.time.findIndex((t) => t >= current.time);
    if (currentHourIndex === -1) currentHourIndex = 0;
  }

  let todayStartIndex = hourly.time.findIndex((t) =>
    t.startsWith(currentDatePrefix),
  );
  if (todayStartIndex === -1 || todayStartIndex > currentHourIndex) {
    todayStartIndex = Math.max(0, currentHourIndex - 12);
  }

  const sliceStart = Math.max(0, todayStartIndex);
  const sliceEnd = Math.min(hourly.time.length, currentHourIndex + 25);

  const hourlySlice = hourly.time
    .slice(sliceStart, sliceEnd)
    .map((timeStr, i) => {
      const rawIndex = sliceStart + i;
      const hour = parseInt(timeStr.slice(11, 13), 10);
      const isDayTime = hour >= 6 && hour < 19 ? 1 : 0;
      const hourMeta = getWeatherMeta(hourly.weather_code[rawIndex], isDayTime);
      const isCurrent = rawIndex === currentHourIndex;

      return {
        time: isCurrent ? 'Now' : `${hour.toString().padStart(2, '0')}:00`,
        displayHour: `${hour.toString().padStart(2, '0')}:00`,
        rawTime: timeStr,
        hour,
        isCurrent,
        isPast: rawIndex < currentHourIndex,
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
    ? daily.sunrise[0].slice(11, 16)
    : '06:00';
  const todaySunset = daily.sunset?.[0]
    ? daily.sunset[0].slice(11, 16)
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
