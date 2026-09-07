import { useEffect, useState } from 'react';
import {
  getStoredSettings,
  saveStoredSettings,
} from '../services/storageService';

export function useSettings() {
  const [settings, setSettings] = useState(getStoredSettings);

  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const isDark =
      settings.theme === 'dark' || (settings.theme === 'system' && prefersDark);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  const setTempUnit = (tempUnit) => setSettings((s) => ({ ...s, tempUnit }));
  const setWindUnit = (windUnit) => setSettings((s) => ({ ...s, windUnit }));
  const setTheme = (theme) => setSettings((s) => ({ ...s, theme }));
  const setReducedMotion = (reducedMotion) =>
    setSettings((s) => ({ ...s, reducedMotion }));

  const convertTemp = (celsius) => {
    if (settings.tempUnit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  const formatTemp = (celsius) => {
    return `${convertTemp(celsius)}°`;
  };

  const convertWind = (kmh) => {
    if (settings.windUnit === 'mph') {
      return Math.round(kmh * 0.621371);
    }
    return Math.round(kmh);
  };

  const formatWind = (kmh) => {
    return `${convertWind(kmh)} ${settings.windUnit === 'mph' ? 'mph' : 'km/h'}`;
  };

  return {
    settings,
    setTempUnit,
    setWindUnit,
    setTheme,
    setReducedMotion,
    convertTemp,
    formatTemp,
    convertWind,
    formatWind,
  };
}
