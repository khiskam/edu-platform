import { useTheme } from "@emotion/react";
import { useLayoutEffect, useRef, useState } from "react";

export const useMatchMedia = () => {
  const theme = useTheme();
  const matchMediaRef = useRef(matchMedia(`(max-width: ${theme.screenMD}px)`));
  const [isSmallSize, setIsSmallSize] = useState(matchMediaRef.current.matches);

  useLayoutEffect(() => {
    const onChange = (e: MediaQueryListEvent) => setIsSmallSize(e.matches);
    matchMediaRef.current.addEventListener("change", onChange);

    const temp = matchMediaRef.current;
    return () => {
      temp.removeEventListener("change", onChange);
    };
  }, [theme]);

  return isSmallSize;
};
