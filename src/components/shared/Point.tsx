import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface PointProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const Point: React.FC<PointProps> = ({ index, isActive, onClick }) => {
  const pointRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pointRef.current) {
      const pointElement = pointRef.current;
      
      const handleMouseEnter = () => {
        if (!isActive) {
          gsap.to(pointElement, {
            scale: 2,
            duration: 0,
            ease: "power2.inOut",
          });
        }
      };

      const handleMouseLeave = () => {
        if (!isActive) {
          gsap.to(pointElement, {
            scale: 1,
            duration: 0,
            ease: "power2.inOut",
          });
        }
      };

      pointElement.addEventListener("mouseenter", handleMouseEnter);
      pointElement.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        pointElement.removeEventListener("mouseenter", handleMouseEnter);
        pointElement.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isActive]);

  return (
    <div
      ref={pointRef}
      className={`point ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="circle-point">{index}</div>
    </div>
  );
};

export default Point;
