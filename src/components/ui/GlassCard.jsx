export function GlassCard({
  children,
  className = '',
  isParent = false,
  onClick,
  interactive = false,
}) {
  const radius = isParent ? 'rounded-[20px]' : 'rounded-[30px]';
  const hoverClass = interactive
    ? 'cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99] transition-all duration-500 ease-out'
    : 'transition-all duration-500 ease-out';

  return (
    <div
      onClick={onClick}
      className={`relative backdrop-blur-[50px] bg-white/15 dark:bg-white/5 text-white overflow-hidden ${radius} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
