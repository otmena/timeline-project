import React from "react";

interface YearRangeProps {
  minYear: number;
  maxYear: number;
}

const YearRange: React.FC<YearRangeProps> = ({ minYear, maxYear }) => {
  return (
    <div className="year-range">
      <span className="min-year">{minYear}</span> - <span className="max-year">{maxYear}</span>
    </div>
  );
};

export default YearRange;
