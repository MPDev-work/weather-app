export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=8&language=en&format=json`,
    );
    if (!response.ok) return [];

    const data = await response.json();
    if (!data.results) return [];

    return data.results.map((item) => ({
      id: `${item.latitude}-${item.longitude}-${item.id}`,
      name: item.name,
      admin1: item.admin1 || '',
      country: item.country || '',
      countryCode: item.country_code || '',
      latitude: item.latitude,
      longitude: item.longitude,
      timezone: item.timezone,
    }));
  } catch {
    return [];
  }
}

export async function reverseGeocode(lat, lon) {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
    );
    if (response.ok) {
      const data = await response.json();
      const name =
        data.city ||
        data.locality ||
        data.principalSubdivision ||
        'My Location';
      const country = data.countryName || '';
      const admin1 = data.principalSubdivision || '';
      return {
        name,
        country,
        admin1,
        latitude: lat,
        longitude: lon,
      };
    }
  } catch {
    return {
      name: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
      country: '',
      admin1: '',
      latitude: lat,
      longitude: lon,
    };
  }

  return {
    name: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
    country: '',
    admin1: '',
    latitude: lat,
    longitude: lon,
  };
}
