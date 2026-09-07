import { useState } from 'react';
import { reverseGeocode } from '../services/geocodingApi';

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = 'Geolocation is not supported by your browser.';
        setError(err);
        reject(new Error(err));
        return;
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          try {
            const loc = await reverseGeocode(lat, lon);
            setIsLoading(false);
            resolve(loc);
          } catch {
            const fallbackLoc = {
              name: 'Current Location',
              country: '',
              latitude: lat,
              longitude: lon,
            };
            setIsLoading(false);
            resolve(fallbackLoc);
          }
        },
        (err) => {
          setIsLoading(false);
          let message = 'Unable to retrieve your location.';
          if (err.code === err.PERMISSION_DENIED) {
            message =
              'Location access denied. Please allow location permissions.';
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            message = 'Location information is currently unavailable.';
          } else if (err.code === err.TIMEOUT) {
            message = 'Location request timed out. Please try again.';
          }
          setError(message);
          reject(new Error(message));
        },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
      );
    });
  };

  return {
    getCurrentLocation,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
