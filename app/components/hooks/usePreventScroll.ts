import { useEffect } from 'react';

export function usePreventScroll({ isDisabled }: { isDisabled: boolean }) {
  useEffect(() => {
    if (isDisabled) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDisabled]);
}