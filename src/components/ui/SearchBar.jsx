import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, LocateFixed, MapPin, Search, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { searchLocations } from '../../services/geocodingApi';

export function SearchBar({
  isOpen,
  onClose,
  onSelectLocation,
  onUseGeolocation,
  isGeolocating = false,
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);

  const handleClose = useCallback(() => {
    setQuery('');
    setResults([]);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      return;
    }

    let active = true;
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const locs = await searchLocations(query);
      if (active) {
        setResults(locs);
        setIsSearching(false);
      }
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const displayResults = query.trim().length >= 2 ? results : [];

  const popularCities = [
    { name: 'Tokyo', country: 'Japan', latitude: 35.6895, longitude: 139.6917 },
    {
      name: 'New York',
      country: 'United States',
      latitude: 40.7128,
      longitude: -74.006,
    },
    {
      name: 'London',
      country: 'United Kingdom',
      latitude: 51.5074,
      longitude: -0.1278,
    },
    { name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 },
    {
      name: 'Phnom Penh',
      country: 'Cambodia',
      latitude: 11.5564,
      longitude: 104.9282,
    },
    {
      name: 'Sydney',
      country: 'Australia',
      latitude: -33.8688,
      longitude: 151.2093,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full md:w-1/2 max-w-xl backdrop-blur-[50px] bg-white/20 dark:bg-black/40 text-white rounded-[35px] p-3.5 overflow-hidden flex flex-col gap-2.5"
          >
            <div className="flex items-center gap-2.5 bg-white/10 dark:bg-white/5 rounded-full px-4 py-2">
              <Search size={18} className="text-white/60 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city, state or country..."
                className="w-full bg-transparent text-white placeholder-white/50 text-base outline-none font-medium"
              />
              {isSearching ? (
                <Loader2
                  size={18}
                  className="animate-spin text-white/60 shrink-0"
                />
              ) : query ? (
                <button
                  onClick={() => setQuery('')}
                  className="text-white/60 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              ) : null}
            </div>

            <button
              onClick={() => {
                onUseGeolocation();
                handleClose();
              }}
              disabled={isGeolocating}
              className="flex items-center justify-between px-4 py-3 rounded-[30px] bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-500 ease-out cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300">
                  <LocateFixed size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium">
                    Use My Current Location
                  </div>
                  <div className="text-xs text-white/60">
                    Find weather using GPS
                  </div>
                </div>
              </div>
              {isGeolocating && (
                <Loader2 size={16} className="animate-spin text-white/60" />
              )}
            </button>

            {displayResults.length > 0 ? (
              <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-1">
                <div className="text-xs uppercase tracking-wider text-white/50 px-2 pt-1 font-semibold">
                  Search Results
                </div>
                {displayResults.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      onSelectLocation(loc);
                      onClose();
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-[20px] hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-500 ease-out cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin size={16} className="text-white/50 shrink-0" />
                      <div>
                        <span className="font-semibold text-sm">
                          {loc.name}
                        </span>
                        {loc.admin1 && (
                          <span className="text-white/60 text-xs ml-1.5">
                            {loc.admin1},
                          </span>
                        )}
                        {loc.country && (
                          <span className="text-white/60 text-xs ml-1">
                            {loc.country}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query.trim().length >= 2 && !isSearching ? (
              <div className="py-6 text-center text-sm text-white/60">
                No locations found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="text-xs uppercase tracking-wider text-white/50 px-2 font-semibold">
                  Popular Cities
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {popularCities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => {
                        onSelectLocation(city);
                        onClose();
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-[20px] bg-white/5 hover:bg-white/15 transition-all duration-500 ease-out cursor-pointer text-left"
                    >
                      <MapPin size={14} className="text-white/50" />
                      <span className="text-sm font-medium">{city.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
