import { useState, useRef, useEffect } from 'react';

export type UseWheelScrollOptions = {
  /** Accumulated wheel delta threshold for one index switch. */
  scrollThreshold?: number;
  /** Lock mode: capture wheel globally while section is locked. */
  lockMode?: boolean;
  /** Backward-compatible lock threshold. */
  lockThreshold?: number;
  /** Enter lock when intersectionRatio >= this value. */
  lockEnterThreshold?: number;
  /** Exit lock when intersectionRatio <= this value. */
  lockExitThreshold?: number;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/**
 * Wheel-driven item switch hook.
 * In lock mode, it captures wheel events when the section is considered locked.
 */
export const useWheelScroll = (
  itemCount: number,
  options: UseWheelScrollOptions = {}
) => {
  const {
    scrollThreshold = 120,
    lockMode = false,
    lockThreshold = 0.8,
    lockEnterThreshold,
    lockExitThreshold,
  } = options;

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLocked, setIsLocked] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const accumulatedRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const enterThreshold = clamp01(lockEnterThreshold ?? lockThreshold);
  const defaultExitThreshold = clamp01(enterThreshold - 0.2);
  const normalizedExit = clamp01(lockExitThreshold ?? defaultExitThreshold);
  const exitThreshold = Math.min(normalizedExit, Math.max(0, enterThreshold - 0.01));

  // Lock mode: use hysteresis thresholds to avoid lock/unlock oscillation near boundaries.
  useEffect(() => {
    if (!lockMode) return;
    const el = sectionRef.current;
    if (!el) return;

    const thresholds = Array.from(
      new Set([0, exitThreshold, enterThreshold, 1])
    ).sort((a, b) => a - b);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const ratio = entry.intersectionRatio;
        setIsLocked((locked) => {
          if (!locked && ratio >= enterThreshold) return true;
          if (locked && ratio <= exitThreshold) return false;
          return locked;
        });
      },
      { threshold: thresholds }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [lockMode, enterThreshold, exitThreshold]);

  // Prevent stale accumulated wheel delta from causing jump on re-enter.
  useEffect(() => {
    if (!lockMode) return;
    if (!isLocked) {
      accumulatedRef.current = 0;
    }
  }, [isLocked, lockMode]);

  useEffect(() => {
    if (itemCount <= 0) return;

    const handleWheel = (e: WheelEvent) => {
      const atFirst = activeIndexRef.current === 0;
      const atLast = activeIndexRef.current === itemCount - 1;
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      if (lockMode) {
        // In lock mode, allow leaving section at boundaries.
        if (atLast && scrollingDown) {
          accumulatedRef.current = 0;
          return;
        }

        if (atFirst && scrollingUp) {
          accumulatedRef.current = 0;
          return;
        }
      } else {
        // In normal mode, release at boundaries.
        if ((atFirst && scrollingUp) || (atLast && scrollingDown)) {
          accumulatedRef.current = 0;
          return;
        }
      }

      if (lockMode) {
        e.preventDefault();
      }

      // Reset accumulated delta when wheel direction changes.
      if (
        (e.deltaY > 0 && accumulatedRef.current < 0) ||
        (e.deltaY < 0 && accumulatedRef.current > 0)
      ) {
        accumulatedRef.current = 0;
      }
      accumulatedRef.current += e.deltaY;

      if (Math.abs(accumulatedRef.current) >= scrollThreshold) {
        const steps = Math.floor(
          Math.abs(accumulatedRef.current) / scrollThreshold
        );
        const direction = accumulatedRef.current > 0 ? 1 : -1;
        accumulatedRef.current = accumulatedRef.current % scrollThreshold;

        setActiveIndex((prev) => {
          const next = Math.max(
            0,
            Math.min(prev + direction * steps, itemCount - 1)
          );
          return next;
        });
      }
    };

    if (lockMode) {
      if (!isLocked) return;
      const opts = { passive: false, capture: true } as const;
      document.addEventListener('wheel', handleWheel, opts);
      return () => document.removeEventListener('wheel', handleWheel, opts);
    }

    const el = sectionRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [itemCount, scrollThreshold, lockMode, isLocked]);

  return { sectionRef, activeIndex, setActiveIndex, isLocked };
};
