import { useState } from "react";
import gsap from "gsap";
import { EventData, PointData } from "./types";

export const useYearAndEvents = (
  pointsData: PointData[],
  activeIndex: number,
  currentYear: number
) => {
  const [activeEvents, setActiveEvents] = useState<EventData[]>(pointsData[activeIndex]?.events || []);
  const [minYear, setMinYear] = useState<number>(Math.min(...pointsData[activeIndex]?.events.map((event) => parseInt(event.date)) || []));
  const [maxYear, setMaxYear] = useState<number>(Math.max(...pointsData[activeIndex]?.events.map((event) => parseInt(event.date)) || []));

  const updateYear = (targetYear: number) => {
    gsap.to({ year: currentYear }, {
      year: targetYear,
      duration: 1,
      onUpdate: function () {
        const newYear = Math.round(this.year);
        if (!isNaN(newYear)) {
          setMinYear(newYear);
        }
      },
      onComplete: () => {
        setMinYear(targetYear);
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

  const setActivePointEvents = (index: number) => {
    setActiveEvents(pointsData[index].events);
    setMinYear(Math.min(...pointsData[index]?.events.map((event) => parseInt(event.date)) || []));
    setMaxYear(Math.max(...pointsData[index]?.events.map((event) => parseInt(event.date)) || []));
  };

  return {
    activeEvents,
    minYear,
    maxYear,
    setActivePointEvents,
    updateYear,
  };
};
