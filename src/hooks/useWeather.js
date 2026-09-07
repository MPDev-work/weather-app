import { useCallback, useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherApi';

const cache = new Map();

export function useWeather(location) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    if (
      !location ||
      location.latitude === undefined ||
      location.longitude === undefined
    ) {
      return;
    }

    const cacheKey = `${location.latitude.toFixed(3)},${location.longitude.toFixed(3)}`;
    const now = Date.now();
    const cached = cache.get(cacheKey);

    if (cached && now - cached.timestamp < 10 * 60 * 1000) {
      Promise.resolve().then(() => {
        if (!active) return;
        setData(cached.data);
        setIsLoading(false);
        setError(null);
      });
      return;
    }

    Promise.resolve().then(() => {
      if (!active) return;
      setIsLoading(true);
      setError(null);
    });

    fetchWeatherData(location.latitude, location.longitude, {
      name: location.name,
      country: location.country,
      admin1: location.admin1,
    })
      .then((weather) => {
        if (!active) return;
        cache.set(cacheKey, { timestamp: Date.now(), data: weather });
        setData(weather);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || 'Unable to load weather data.');
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [location]);

  const refresh = useCallback(() => {
    if (
      !location ||
      location.latitude === undefined ||
      location.longitude === undefined
    )
      return;
    setIsLoading(true);
    setError(null);
    const cacheKey = `${location.latitude.toFixed(3)},${location.longitude.toFixed(3)}`;
    fetchWeatherData(location.latitude, location.longitude, {
      name: location.name,
      country: location.country,
      admin1: location.admin1,
    })
      .then((weather) => {
        cache.set(cacheKey, { timestamp: Date.now(), data: weather });
        setData(weather);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load weather data.');
        setIsLoading(false);
      });
  }, [location]);

  return {
    data,
    isLoading,
    error,
    refresh,
  };
}
