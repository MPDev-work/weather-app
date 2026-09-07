import { useEffect, useState } from 'react';
import {
  getActiveLocation,
  getSavedLocations,
  saveActiveLocation,
  saveSavedLocations,
} from '../services/storageService';

export function useSavedLocations() {
  const [locations, setLocations] = useState(getSavedLocations);
  const [activeLocation, setActiveLocationState] = useState(getActiveLocation);

  useEffect(() => {
    saveSavedLocations(locations);
  }, [locations]);

  const setActiveLocation = (location) => {
    setActiveLocationState(location);
    saveActiveLocation(location);
  };

  const addLocation = (location) => {
    const exists = locations.some(
      (loc) =>
        Math.abs(loc.latitude - location.latitude) < 0.05 &&
        Math.abs(loc.longitude - location.longitude) < 0.05,
    );

    if (!exists) {
      const updated = [
        ...locations,
        {
          ...location,
          id: `${location.latitude}-${location.longitude}-${Date.now()}`,
        },
      ];
      setLocations(updated);
    }
    setActiveLocation(location);
  };

  const removeLocation = (id) => {
    const updated = locations.filter((loc) => loc.id !== id);
    setLocations(updated);
    if (activeLocation?.id === id && updated.length > 0) {
      setActiveLocation(updated[0]);
    }
  };

  return {
    locations,
    activeLocation,
    setActiveLocation,
    addLocation,
    removeLocation,
  };
}
