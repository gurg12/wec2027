import GearDecor from '../decor/GearDecor.jsx';

export default function LoadingSpinner({ label = 'Loading…', light = false }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <GearDecor size={48} color={light ? '#ffd600' : '#000b3a'} spin="slow" />
      <div
        className={`text-xs font-display font-extrabold uppercase tracking-[0.22em] ${
          light ? 'text-ivory/70' : 'text-navy/60'
        }`}
      >
        {label}
      </div>
    </div>
  );
}
