import { useEffect, useRef } from "react";

export const useObserver = <T extends Element>(callback: () => void) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const targetNode = elementRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const node = entries[0];

        if (node.isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (targetNode) {
      observer.observe(targetNode);
    }

    observerRef.current = observer;

    return () => {
      if (targetNode) {
        observer.unobserve(targetNode);
      }
    };
  }, [callback]);

  return elementRef;
};
