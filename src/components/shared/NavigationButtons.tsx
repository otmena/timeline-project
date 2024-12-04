import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
}) => {
  return (
    <div className="buttons">
      <button className="button" onClick={onPrev} disabled={isPrevDisabled}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button className="button" onClick={onNext} disabled={isNextDisabled}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default NavigationButtons;
