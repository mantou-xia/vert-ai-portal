import { useState, useEffect, useRef, useCallback } from 'react';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export type UseCountUpOptions = {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
};

export const useCountUp = ({
  end,
  duration = 2000,
  start = 0,
  enabled = false,
}: UseCountUpOptions): number => {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasRun = useRef(false);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.round(start + (end - start) * easedProgress);
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [start, end, duration]
  );

  useEffect(() => {
    if (!enabled || hasRun.current) return;
    hasRun.current = true;
    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled, animate]);

  return value;
};
