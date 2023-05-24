import { useEffect } from 'react';

const useKeyDown = (
  key: string,
  callback: () => void,
  withCtrlAndShift: boolean = false
) => {
  const downHandler = (event: KeyboardEvent) => {
    const isKey = event.key === key;
    if (
      (isKey && withCtrlAndShift && event.ctrlKey && event.shiftKey) ||
      (isKey && !withCtrlAndShift)
    ) {
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
};

export default useKeyDown;
