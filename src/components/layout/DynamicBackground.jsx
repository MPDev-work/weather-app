import { AnimatePresence, motion } from 'framer-motion';

export function DynamicBackground({ scene = 'sun', isNight = false }) {
  const getGradientStyles = () => {
    if (isNight) {
      return 'from-[#0b1021] via-[#111a3b] to-[#060914]';
    }

    switch (scene) {
      case 'clouds':
      case 'clouds-night':
        return 'from-[#475569] via-[#334155] to-[#1e293b]';
      case 'rain':
        return 'from-[#1e293b] via-[#0f172a] to-[#020617]';
      case 'thunderstorm':
        return 'from-[#181126] via-[#0f1026] to-[#05050f]';
      case 'snow':
        return 'from-[#64748b] via-[#475569] to-[#334155]';
      case 'fog':
        return 'from-[#52525b] via-[#3f3f46] to-[#27272a]';
      case 'sun':
      default:
        return 'from-[#0284c7] via-[#0369a1] to-[#075985]';
    }
  };

  const key = `${scene}-${isNight}`;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className={`absolute inset-0 bg-gradient-to-b ${getGradientStyles()}`}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/25 pointer-events-none" />
    </div>
  );
}
