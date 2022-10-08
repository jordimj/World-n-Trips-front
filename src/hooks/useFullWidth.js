import { useEffect, useState } from 'react';

const useFullWidth = () => {
  const getFullWidth = () => localStorage.getItem('fullWidth') === 'true';

  const [fullWidth, setFullWidth] = useState(getFullWidth());
  const handleChangeStorage = () => setFullWidth(getFullWidth());

  useEffect(() => {
    window.addEventListener('storage', handleChangeStorage);

    return () => window.removeEventListener('storage', handleChangeStorage);
  }, []);

  const saveFullWidth = (fullWidth) => {
    localStorage.setItem('fullWidth', fullWidth);

    // Since the storage Event is not caught by the same tab that dispatches it, we shall dispatch it
    window.dispatchEvent(new Event('storage'));
  };

  return {
    saveFullWidth,
    fullWidth,
  };
};

export default useFullWidth;
