import React, { useState, useEffect, useCallback } from "react";
// Función de throttling con anotaciones TypeScript, movida fuera del componente.
const throttle = <T extends (...args: any[]) => any>(
  func: (this: unknown, ...args: Parameters<T>) => ReturnType<T>,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastFunc: NodeJS.Timeout | null = null;
  let lastRan: number | null = null;

  return function (this: unknown, ...args: Parameters<T>) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      if (lastFunc) {
        clearTimeout(lastFunc);
      }
      lastFunc = setTimeout(() => {
        if (Date.now() - (lastRan as number) >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - (lastRan as number)));
    }
  };
};

const CustomCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 10), // Actualizar una vez cada 100ms
    [] // Dependencias vacías, por lo que la función no se recreará
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]); // Añadido handleMouseMove como dependencia

  return (
    <div
      className="custom-cursor"
      style={{
        transform: `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`,
      }}
    ></div>
  );
};

export default CustomCursor;
