import { useEffect, useState } from 'react';

function diff(target) {
  const now = Date.now();
  const ms = Math.max(0, target - now);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((ms / (1000 * 60)) % 60);
  const secs = Math.floor((ms / 1000) % 60);
  return { days, hours, mins, secs, done: ms === 0 };
}

export function useCountdown(targetDate) {
  const target = targetDate instanceof Date ? targetDate.getTime() : new Date(targetDate).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return t;
}
