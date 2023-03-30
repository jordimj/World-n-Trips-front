import { RefObject, useEffect, useRef, useState } from 'react';

const useElementOnScreen = <T extends Element>(
  options?: IntersectionObserverInit
): [RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observeCallback: IntersectionObserverCallback = ([entry]) =>
    setIsIntersecting(entry.isIntersecting);

  useEffect(() => {
    const { current } = ref;
    if (!current || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(observeCallback, options);
    observer.observe(current);

    return () => observer.unobserve(current);
  }, [ref, options]);

  return [ref, isIntersecting];
};

export default useElementOnScreen;
