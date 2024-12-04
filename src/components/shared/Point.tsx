import React from "react";

interface PointProps {
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const Point: React.FC<PointProps> = ({ index, isActive, onClick }) => {
  return (
    <div className={`point ${isActive ? "active" : ""}`} onClick={onClick}>
      <div className="circle-point">{index}</div>
    </div>
  );
};

export default Point;
