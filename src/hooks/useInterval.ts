import { useRef, useEffect } from "react";

export function useInterval(callback, delay: number | null) {
  const savedCallback = useRef(null);
 
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });
 
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if(savedCallback.current){
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay])
}