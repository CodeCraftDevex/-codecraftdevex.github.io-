import { useState, useEffect } from "react";
interface WindowSizeState {
  width: number | undefined;
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSizeState>({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Establece el tamaño inicial

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
