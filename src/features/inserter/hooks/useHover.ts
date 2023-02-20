import { useEffect, useRef, useState } from 'react';

function useHover<T extends HTMLElement = HTMLElement>() {
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<T>();

  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  useEffect(() => {
    const node = ref.current;

    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);

      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref]);

  return { ref, isHovering };
}

export default useHover;
