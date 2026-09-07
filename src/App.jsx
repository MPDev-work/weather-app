import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { DynamicBackground } from './components/layout/DynamicBackground';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ErrorState } from './components/ui/ErrorState';
import { LoadingSkeleton } from './components/ui/LoadingSkeleton';
import { SearchBar } from './components/ui/SearchBar';
import { CurrentWeather } from './components/weather/CurrentWeather';
import { DailyForecast } from './components/weather/DailyForecast';
import { ForecastView } from './components/weather/ForecastView';
import { HourlyForecast } from './components/weather/HourlyForecast';
import { LocationsView } from './components/weather/LocationsView';
import { SettingsView } from './components/weather/SettingsView';
import { WeatherDetails } from './components/weather/WeatherDetails';
import { useGeolocation } from './hooks/useGeolocation';
import { useSavedLocations } from './hooks/useSavedLocations';
import { useSettings } from './hooks/useSettings';
import { useWeather } from './hooks/useWeather';

export default function App() {
  const [activeTab, setActiveTab] = useState('weather');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const {
    settings,
    setTempUnit,
    setWindUnit,
    setTheme,
    setReducedMotion,
    formatTemp,
    formatWind,
  } = useSettings();

  const { locations, activeLocation, addLocation, removeLocation } =
    useSavedLocations();

  const {
    data: weather,
    isLoading,
    error,
    refresh,
  } = useWeather(activeLocation);

  const { getCurrentLocation, isLoading: isGeolocating } = useGeolocation();

  const handleSelectLocation = (loc) => {
    addLocation(loc);
    setActiveTab('weather');
  };

  const handleUseGeolocation = async () => {
    try {
      const loc = await getCurrentLocation();
      addLocation(loc);
      setActiveTab('weather');
    } catch {}
  };

  return (
    <div className="text-white flex flex-col">
      <DynamicBackground
        scene={weather?.current?.scene || 'sun'}
        isNight={weather ? !weather.current.isDay : false}
      />

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main className="w-full max-w-7xl mx-auto pt-20 pb-20 md:pb-10 px-3 md:px-6 flex flex-col">
        <div className="flex gap-4 items-start">
          <Sidebar
            locations={locations}
            activeLocation={activeLocation}
            onSelectLocation={handleSelectLocation}
            onRemoveLocation={removeLocation}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          <div className="flex-1 w-full min-w-0 flex flex-col">
            <AnimatePresence mode="wait">
              {isLoading && !weather ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoadingSkeleton />
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ErrorState message={error} onRetry={refresh} />
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full flex flex-col gap-2.5"
                >
                  {activeTab === 'weather' && weather && (
                    <>
                      <CurrentWeather
                        weather={weather}
                        formatTemp={formatTemp}
                        reducedMotion={settings.reducedMotion}
                        onOpenSearch={() => setIsSearchOpen(true)}
                      />

                      <div className="flex flex-col gap-2.5 mt-2">
                        <HourlyForecast
                          hourly={weather.hourly}
                          formatTemp={formatTemp}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                          <DailyForecast
                            forecast={weather.forecast}
                            formatTemp={formatTemp}
                          />
                          <div className="hidden lg:block">
                            <WeatherDetails
                              current={weather.current}
                              sun={weather.sun}
                              formatWind={formatWind}
                            />
                          </div>
                        </div>

                        <div className="block lg:hidden">
                          <WeatherDetails
                            current={weather.current}
                            sun={weather.sun}
                            formatWind={formatWind}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'forecast' && weather && (
                    <ForecastView weather={weather} formatTemp={formatTemp} />
                  )}

                  {activeTab === 'locations' && (
                    <LocationsView
                      locations={locations}
                      activeLocation={activeLocation}
                      onSelectLocation={handleSelectLocation}
                      onRemoveLocation={removeLocation}
                      onOpenSearch={() => setIsSearchOpen(true)}
                    />
                  )}

                  {activeTab === 'settings' && (
                    <SettingsView
                      settings={settings}
                      setTempUnit={setTempUnit}
                      setWindUnit={setWindUnit}
                      setTheme={setTheme}
                      setReducedMotion={setReducedMotion}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLocation={handleSelectLocation}
        onUseGeolocation={handleUseGeolocation}
        isGeolocating={isGeolocating}
      />
    </div>
  );
}
