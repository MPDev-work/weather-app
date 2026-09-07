import { motion } from 'framer-motion';
import { Calendar, CloudSun, MapPin, Settings } from 'lucide-react';

export function MobileNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'forecast', label: 'Forecast', icon: Calendar },
    { id: 'locations', label: 'Cities', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="md:hidden fixed bottom-3 left-4 right-4 z-40 h-14 backdrop-blur-[50px] bg-white/20 dark:bg-black/40 rounded-full px-2 hidden items-center justify-around text-white">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative flex-1 h-10 flex flex-col items-center justify-center rounded-full transition-all duration-500 ease-out cursor-pointer ${
              isActive ? 'text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="mobileNavHighlight"
                className="absolute inset-0 bg-white/20 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <Icon size={18} className="relative z-10" />
            <span className="relative z-10 text-[10px] font-medium mt-0.5">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
