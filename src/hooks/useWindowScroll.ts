import { useEffect, useState } from "react";

/**
 * A hook that returns the current window scroll position and a function to
 * scroll to the given x and y coordinates.
 *
 * @returns {Array} A tuple with the current scroll position and a function to
 *   scroll to the given x and y coordinates.
 * @example
 * const [scroll, scrollTo] = useWindowScroll();
 *
 * // scroll to the top of the page
 * scrollTo({ x: 0, y: 0 });
 */
export function useWindowScroll() {
  const [scroll, setScroll] = useState({
    x: 0,
    y: 0,
  });

  /**
   * Scrolls the window to the given x and y coordinates. The coordinates are
   * optional and default to 0.
   *
   * @param {Object} options - Options object with x and y properties.
   * @param {number} [options.x=0] - The x coordinate to scroll to.
   * @param {number} [options.y=0] - The y coordinate to scroll to.
   */
  function scrollTo({ x = 0, y = 0 }: { x: number; y: number }) {
    window.scrollTo(x, y);
  }

  useEffect(() => {
    setScroll({
      x: window.scrollX,
      y: window.scrollY,
    });

    function handleScroll() {
      setScroll({
        x: window.scrollX,
        y: window.scrollY,
      });
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return [scroll, scrollTo] as const;
}
