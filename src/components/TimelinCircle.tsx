import React, { useState, useEffect } from "react";
import Slider from "./TimelineSwiper";
import Point from "./shared/Point";
import NavigationButtons from "./shared/NavigationButtons";
import YearRange from "./shared/YearRange";
import { useGSAP } from "../hooks/useGSAP";
import { usePointsPosition } from "../hooks/usePointsPosition";
import { useYearAndEvents } from "../hooks/useYearAndEvents";
import "../styles/animatedcircle.scss";

type EventData = {
  date: string;
  description: string;
};

type PointData = {
  label: string;
  year: number;
  index: number;
  events: EventData[];
};

interface TimelineCircleProps {
  pointsData: PointData[];
}

const TimelineCircle: React.FC<TimelineCircleProps> = ({ pointsData }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [fadeKey, setFadeKey] = useState<number>(0);

  const { activeEvents, minYear, maxYear, setActivePointEvents, updateYear } = useYearAndEvents(pointsData, activeIndex, rotation);
  usePointsPosition(pointsData.length, rotation);

  const rotateCircle = (index: number) => {
    const rotationAngle = (360 / pointsData.length) * index;
    const adjustedRotation = -rotationAngle;
    setRotation(adjustedRotation);
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setActivePointEvents(index);
    setFadeKey(prev => prev + 1);
    rotateCircle(index);
    updateYear(pointsData[index].year);
  };

  const handleButtonClick = (direction: "prev" | "next") => {
    let newIndex = activeIndex;

    if (direction === "prev" && activeIndex > 0) {
      newIndex = activeIndex - 1;
    } else if (direction === "next" && activeIndex < pointsData.length - 1) {
      newIndex = activeIndex + 1;
    }

    setActiveIndex(newIndex);
    setActivePointEvents(newIndex);
    setFadeKey(prev => prev + 1);
    rotateCircle(newIndex);
    updateYear(pointsData[newIndex].year);
  };

  useGSAP(".circle", { rotation, duration: 1, ease: "power2.inOut" });
  useGSAP(".point", { scale: 0.8, duration: 0, ease: "power2.inOut" });
  useGSAP(`.point:nth-child(${activeIndex + 1})`, { scale: 2, borderColor: "#42567A", duration: 0 });

  useEffect(() => {
    const points = document.querySelectorAll(".point");
    points.forEach((point, index) => {
      if (point instanceof HTMLElement) {
        const rotationAngle = (360 / pointsData.length) * index + rotation;
        point.style.setProperty("--rotation", `${rotationAngle}deg`);
        point.style.setProperty("--text-rotation", `${-rotationAngle}deg`);
      }
    });
  }, [rotation, pointsData.length]);

  return (
    <div className="timeline-container">
      <div className="background-lines" />
      <div className="timeline-circle">
        <div className="circle">
          {pointsData.map((point, index) => (
            <Point
              key={index}
              index={point.index}
              isActive={activeIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        <h2>{pointsData[activeIndex]?.label || "Выберите событие"}</h2>
      </div>

      <YearRange minYear={minYear} maxYear={maxYear} />

      <div className="timeline-controls">
        <span className="active-info">{`0${activeIndex + 1}/0${pointsData.length}`}</span>
        <NavigationButtons
          onPrev={() => handleButtonClick("prev")}
          onNext={() => handleButtonClick("next")}
          isPrevDisabled={activeIndex === 0}
          isNextDisabled={activeIndex === pointsData.length - 1}
        />
      </div>

      {activeEvents.length > 0 && (
        <div key={fadeKey} className="slider-item fade-in">
          <Slider events={activeEvents} />
        </div>
      )}
    </div>
  );
};

export default TimelineCircle;
