import { motion } from 'framer-motion';
import { Calendar, CloudSun, MapPin, Search, Settings } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab, onOpenSearch }) {
  const navItems = [
    { id: 'weather', label: 'WEATHER', icon: CloudSun },
    { id: 'forecast', label: 'FORECAST', icon: Calendar },
    { id: 'locations', label: 'LOCATIONS', icon: MapPin },
    { id: 'settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <header className="fixed top-3 left-0 right-0 z-40 flex items-center justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto h-12 px-1 backdrop-blur-[50px] bg-white/15 dark:bg-black/25 rounded-full flex items-center gap-1 text-white">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative h-10 px-3 md:px-4 rounded-full flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide uppercase transition-all duration-500 ease-out cursor-pointer ${
                isActive ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  className="absolute inset-0 bg-white/20 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon size={16} className="relative z-10 shrink-0" />
              <span className="relative z-10 hidden sm:inline">
                {item.label}
              </span>
            </button>
          );
        })}

        <div className="w-[1px] h-5 bg-white/20 mx-1" />

        <button
          onClick={onOpenSearch}
          aria-label="Search City"
          className="h-10 w-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all duration-500 ease-out cursor-pointer"
        >
          <Search size={18} />
        </button>
      </nav>
    </header>
  );
}
