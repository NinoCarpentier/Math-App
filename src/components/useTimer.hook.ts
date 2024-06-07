import { useEffect, useRef, useState } from "react";

export const useTimer = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const start = () => {
    if (!started) {
      setStarted(true);
    }
  };

  const stop = () => {
    setStarted(false);
  };

  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (started) {
      interval.current = setInterval(() => {
        setCounter((counter) => counter + 1);
      }, 1000);
    } else {
      if (interval.current !== null) {
        clearInterval(interval.current);
      }
    }
  }, [started]);

  useEffect(
    () => () => {
      if (interval.current !== null) {
        clearInterval(interval.current);
      }
    },
    []
  );

  return { start, stop, counter };
};
