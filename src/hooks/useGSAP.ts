import { useEffect } from "react";
import gsap from "gsap";

export const useGSAP = (target: string, animationProps: object) => {
  useEffect(() => {
    gsap.to(target, animationProps);
  }, [target, animationProps]);
};
