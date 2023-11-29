import React, { useState, useEffect, useCallback } from "react";

// Definición de la función throttle fuera del componente
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

  // Define una función para actualizar la posición del cursor
  const updateCursorPosition = (e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  // Envuelve la función de actualización con throttle
  const throttledUpdateCursorPosition = useCallback(
    throttle(updateCursorPosition, 10),
    []
  );

  useEffect(() => {
    // Añadir el event listener usando la versión "throttled" de la función
    document.addEventListener("mousemove", throttledUpdateCursorPosition);
    return () => {
      // Asegurarse de limpiar el event listener
      document.removeEventListener("mousemove", throttledUpdateCursorPosition);
    };
  }, [throttledUpdateCursorPosition]); // Depende de la versión memorizada de la función

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
