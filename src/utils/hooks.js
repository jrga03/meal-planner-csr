import { useState, useEffect } from 'react';

/**
 * Hook for getting window size
 * @returns {object} Window width and height
 */
export function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // eslint-disable-line

  return windowSize;
}

/**
 * Hook for getting header height based on window size
 * @returns {number} Header height
 */
export function useHeaderHeight() {
  const { width } = useWindowSize();
  const { screen } = window;
  const orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

  return width < 600
    ? new RegExp( 'landscape', 'i' ).test(orientation)
      ? 48
      : 56
    : 64;
}

/**
 * Hook for debouncing fast-changing value
 * @param {*} value
 * @param {number} [delay = 500] - Delay before returning value
 * @returns {*}
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}
