import { EffectCallback, RefObject, useEffect } from 'react';

export function useOutsideClick(
  ref: RefObject<HTMLDivElement>,
  callback: EffectCallback,
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      callback();
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [ref, callback]);
}
