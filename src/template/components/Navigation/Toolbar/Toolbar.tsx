import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import Settings from '../Settings';
import styles from './Toolbar.module.css';

function Toolbar({ overHero = false }: { overHero?: boolean }) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [overlapsHero, setOverlapsHero] = useState(false);

  useEffect(() => {
    if (!overHero) return;

    const updateOverlap = () => {
      const hero = document.querySelector('[data-trip-hero]');
      const toolbar = toolbarRef.current;
      if (!hero || !toolbar) {
        setOverlapsHero(false);
        return;
      }
      const heroBounds = hero.getBoundingClientRect();
      const toolbarBounds = toolbar.getBoundingClientRect();
      const controlsCenter = (toolbarBounds.top + toolbarBounds.bottom) / 2;
      setOverlapsHero(heroBounds.top <= controlsCenter && heroBounds.bottom > controlsCenter);
    };

    updateOverlap();
    // Covers asynchronous trip loading and responsive changes to the hero height.
    const observer = new ResizeObserver(updateOverlap);
    observer.observe(document.body);
    window.addEventListener('scroll', updateOverlap, { passive: true });
    window.addEventListener('resize', updateOverlap);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateOverlap);
      window.removeEventListener('resize', updateOverlap);
    };
  }, [overHero]);

  return (
    <Box
      ref={toolbarRef}
      className={`${styles.toolbar} ${overHero && overlapsHero ? styles.overHero : ''}`}
    >
      <Settings />
    </Box>
  );
}
export default Toolbar;
