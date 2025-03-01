import { useEffect, useState } from "react";

/**
 * useWindowSize
 *
 * A hook to get the current window size.
 *
 * It returns an object with two properties:
 * - width: the current window width.
 * - height: the current window height.
 *
 * The returned value is updated whenever the window is resized.
 *
 * @returns {Object} an object with the current window size.
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
