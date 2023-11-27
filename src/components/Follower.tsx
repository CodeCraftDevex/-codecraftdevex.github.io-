import React, { useState, useEffect } from "react";
import styles from "./follower.module.scss";

interface MousePosition {
  x: number;
  y: number;
}

const FollowerComponent: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY, target } = event;
    setMousePosition({ x: clientX, y: clientY });

    const targetElement = target as HTMLElement;
    setIsHoveringLink(
      targetElement.tagName.toLowerCase() === "a" ||
        targetElement.tagName.toLowerCase() === "button" ||
        targetElement.classList.contains(styles.letterAnimation) // Actualizado para usar el módulo CSS
    );
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const outerFollowerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    transform: `translate3d(${mousePosition.x - 15}px, ${
      mousePosition.y - 15
    }px, 0)`,
  };

  const innerFollowerStyle: React.CSSProperties = isHoveringLink
    ? {
        width: "40px",
        height: "40px",
        boxShadow: "0 0 5px 2px rgba(255, 255, 255, 0.8)",
        animation: "resize 3s infinite",
      }
    : {};

  return (
    <div style={outerFollowerStyle}>
      <div
        className={`${styles.circleFollower} ${
          isHoveringLink ? styles.hovering : ""
        }`}
        style={innerFollowerStyle}
      ></div>
    </div>
  );
};

export default FollowerComponent;
