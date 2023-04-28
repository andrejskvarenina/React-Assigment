import { useState, useEffect, useRef } from "react";

export const useAnimatedText = (targetText: string, deps: string[]) => {
  const [animatedText, setAnimatedText] = useState("");
  const timeoutRef = useRef<number>();

  useEffect(() => {
    let i = 0;

    const animateText = () => {
      if (i <= targetText.length) {
        setAnimatedText(targetText.substring(0, i));
        i++;
        timeoutRef.current = window.setTimeout(animateText, 100);
      }
    };
    animateText();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, deps);

  return animatedText;
};
