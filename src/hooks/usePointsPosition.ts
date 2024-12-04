import { useEffect } from "react";
import gsap from "gsap";

export const usePointsPosition = (pointsCount: number, rotation: number) => {
  useEffect(() => {
    const points = document.querySelectorAll(".point");
    const radius = 265;
    const offset = -50;

    points.forEach((point, i) => {
      const angle = ((i * 360) / pointsCount) + offset;
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);
      const scaleFactor = point.classList.contains("active") ? 2 : 0.8;
      const adjustedRadius = scaleFactor === 2 ? radius * 1 : radius;
      const adjustedX = adjustedRadius * Math.cos((angle * Math.PI) / 180);
      const adjustedY = adjustedRadius * Math.sin((angle * Math.PI) / 180);
      
      gsap.to(point, {
        x: adjustedX,
        y: adjustedY,
        scale: scaleFactor,
        duration: 0,
        ease: "power2.inOut",
      });
    });
  }, [pointsCount, rotation]);
};
