import React, { useState, useEffect } from "react";
import gsap from "gsap";
import Slider from "./TimelineSwiper";
import Point from "./shared/Point";
import NavigationButtons from "./shared/NavigationButtons";
import YearRange from "./shared/YearRange";
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
  const [activeEvents, setActiveEvents] = useState<EventData[]>(pointsData[0]?.events || []);
  const [currentYear, setCurrentYear] = useState<number>(pointsData[0]?.year || 2024);

  const findMinMaxYears = (events: EventData[]) => {
    const years = events.map((event) => parseInt(event.date));
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    return { minYear, maxYear };
  };

  const { minYear, maxYear } = findMinMaxYears(pointsData[activeIndex]?.events || []);

  const positionPoints = () => {
    const points = document.querySelectorAll(".point");
    const radius = 265;
    const offset = -50; // Смещение на 50 градусов
    points.forEach((point, i) => {
      const angle = ((i * 360) / points.length) + offset;
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);
      const element = point as HTMLElement;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  useEffect(() => {
    positionPoints();
  }, [pointsData.length]);

  const rotateCircle = (index: number) => {
    const rotationAngle = (360 / pointsData.length) * index;
    const adjustedRotation = -rotationAngle;

    gsap.to(".circle", {
      rotation: adjustedRotation,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: function () {
        const updatedRotation = gsap.getProperty(".circle", "rotation") as number;
        setRotation(updatedRotation);
      },
    });

    gsap.to(".point", {
      scale: 0.8,
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(`.point:nth-child(${index + 1})`, {
      scale: 2,
      borderColor: "#42567A",
      duration: 0.3,
    });
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setActiveEvents(pointsData[index].events);
    rotateCircle(index);

    const targetYear = pointsData[index].year;

    gsap.to({ year: currentYear }, {
      year: targetYear,
      duration: 1,
      onUpdate: function () {
        const newYear = Math.round(this.year);
        if (!isNaN(newYear)) {
          setCurrentYear(newYear);
        }
      },
      onComplete: () => {
        setCurrentYear(targetYear);
      }
    });

    gsap.to(".min-year", {
      textContent: minYear.toString(),
      duration: 1,
      ease: "power2.inOut",
      snap: { textContent: 1 },
    });

    gsap.to(".max-year", {
      textContent: maxYear.toString(),
      duration: 1,
      ease: "power2.inOut",
      snap: { textContent: 1 },
    });
  };

  const handleButtonClick = (direction: "prev" | "next") => {
    let newIndex = activeIndex;

    if (direction === "prev" && activeIndex > 0) {
      newIndex = activeIndex - 1;
    } else if (direction === "next" && activeIndex < pointsData.length - 1) {
      newIndex = activeIndex + 1;
    }

    setActiveIndex(newIndex);
    setActiveEvents(pointsData[newIndex].events);
    rotateCircle(newIndex);

    const targetYear = pointsData[newIndex].year;
    gsap.to({ year: currentYear }, {
      year: targetYear,
      duration: 1,
      onUpdate: function () {
        const newYear = Math.round(this.year);
        if (!isNaN(newYear)) {
          setCurrentYear(newYear);
        }
      },
      onComplete: () => {
        setCurrentYear(targetYear);
      }
    });

    gsap.to(".min-year", {
      textContent: minYear.toString(),
      duration: 1,
      ease: "power2.inOut",
      snap: { textContent: 1 },
    });

    gsap.to(".max-year", {
      textContent: maxYear.toString(),
      duration: 1,
      ease: "power2.inOut",
      snap: { textContent: 1 },
    });
  };

  useEffect(() => {
    const points = document.querySelectorAll(".point");
    points.forEach((point) => {
      const element = point as HTMLElement;
      element.style.setProperty("--circle-rotation", `${rotation}deg`);
    });
  }, [rotation]);

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

      {activeEvents.length > 0 && <Slider events={activeEvents} />}
    </div>
  );
};

export default TimelineCircle;
