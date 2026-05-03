"use client";

import { useEffect, useState } from "react";

const useMediaWindow = (query: string) => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (window) {
      const handleResize = () => {
        const mediaQuery = window.matchMedia(query);

        if (mediaQuery.matches) {
          setFlag(true);
        } else {
          setFlag(false);
        }
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [query]);
  return flag;
};
export default useMediaWindow;
