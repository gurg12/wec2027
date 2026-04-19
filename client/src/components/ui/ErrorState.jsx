import { AlertTriangle } from 'lucide-react';

export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  light = false,
}) {
  return (
    <div
      className={`rounded-2xl p-8 text-center ${
        light
          ? 'bg-white/10 border border-ivory/20 text-ivory'
          : 'bg-white border border-navy/10 text-navy'
      }`}
    >
      <AlertTriangle className="mx-auto mb-3" size={32} />
      <div className="font-display font-extrabold uppercase tracking-[0.18em] text-sm">
        {title}
      </div>
      {message && <p className="mt-2 opacity-80 max-w-md mx-auto">{message}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className={`mt-5 btn ${
            light ? 'btn-ghost-light' : 'btn-ghost'
          }`}
        >
          Try again
        </button>
      )}
    </div>
  );
}
