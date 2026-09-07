const STORAGE_KEYS = {
  LOCATIONS: 'weather_app_saved_locations',
  ACTIVE_LOCATION: 'weather_app_active_location',
  SETTINGS: 'weather_app_settings',
};

export const DEFAULT_LOCATIONS = [
  {
    name: 'Tokyo',
    country: 'Japan',
    admin1: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.6917,
    id: 'tokyo-default',
  },
  {
    name: 'New York',
    country: 'United States',
    admin1: 'New York',
    latitude: 40.7128,
    longitude: -74.006,
    id: 'nyc-default',
  },
  {
    name: 'London',
    country: 'United Kingdom',
    admin1: 'England',
    latitude: 51.5074,
    longitude: -0.1278,
    id: 'london-default',
  },
  {
    name: 'Paris',
    country: 'France',
    admin1: 'Île-de-France',
    latitude: 48.8566,
    longitude: 2.3522,
    id: 'paris-default',
  },
  {
    name: 'Phnom Penh',
    country: 'Cambodia',
    admin1: 'Phnom Penh',
    latitude: 11.5564,
    longitude: 104.9282,
    id: 'phnom-penh-default',
  },
];

export const DEFAULT_SETTINGS = {
  tempUnit: 'C',
  windUnit: 'kmh',
  theme: 'dark',
  reducedMotion: false,
};

export function getSavedLocations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOCATIONS);
    if (!raw) return DEFAULT_LOCATIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : DEFAULT_LOCATIONS;
  } catch {
    return DEFAULT_LOCATIONS;
  }
}

export function saveSavedLocations(locations) {
  try {
    localStorage.setItem(STORAGE_KEYS.LOCATIONS, JSON.stringify(locations));
  } catch {}
}

export function getActiveLocation() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_LOCATION);
    if (!raw) return DEFAULT_LOCATIONS[0];
    return JSON.parse(raw);
  } catch {
    return DEFAULT_LOCATIONS[0];
  }
}

export function saveActiveLocation(location) {
  try {
    localStorage.setItem(
      STORAGE_KEYS.ACTIVE_LOCATION,
      JSON.stringify(location),
    );
  } catch {}
}

export function getStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch {}
}
