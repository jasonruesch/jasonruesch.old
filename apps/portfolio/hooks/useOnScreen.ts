import { useEffect, useState } from 'react';

export const useOnScreen = (ref) => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires
      setIntersecting(entry.isIntersecting);
    });

    if (ref.current) {
      observer.observe(el);
    }

    return () => {
      observer.unobserve(el);
    };
  }, [ref]);
  return isIntersecting;
};

export default useOnScreen;
