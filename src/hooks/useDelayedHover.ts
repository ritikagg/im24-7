import { useCallback, useRef, useState } from "react";

export const useDelayedHover = (
  delayIn: number = 300,
  delayOut: number = 100
) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, delayIn);
  }, [delayIn]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, delayOut);
  }, [delayOut]);

  return { isHovered, handleMouseEnter, handleMouseLeave };
};
