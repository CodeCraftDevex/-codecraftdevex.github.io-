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

  // Función para manejar el movimiento del ratón, envuelta en throttle
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }, 10),
    [] // No hay dependencias dinámicas
  );

  useEffect(() => {
    // Añadir el event listener usando la versión "throttled" de la función
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      // Asegurarse de limpiar el event listener
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]); // handleMouseMove es ahora estable

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
