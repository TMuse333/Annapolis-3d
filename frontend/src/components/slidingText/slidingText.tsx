import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export interface SlidingTextProps {
  text: string;
  setSlideComplete?: React.Dispatch<React.SetStateAction<boolean>>;
  subText?: string;
  reverse?: boolean;
  styles?: string;
  slideColor?: string;
  xPercent?: number;
}

const SlidingText = ({
  text,
  setSlideComplete,
  subText,
  styles,
  reverse,
  slideColor,
  xPercent,
}: SlidingTextProps): React.JSX.Element => {
  const targetRef = useRef(null);
  const [slideComplete, setLocalSlideComplete] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, xPercent ?? 0.7], [!reverse ? 350 : -350, 0]);
  const opacity = useTransform(scrollYProgress, [0, (xPercent ?? 0.7) - 0.15], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [5, -5]);

  useMotionValueEvent(x, "change", (latestX) => {
    if (latestX === 0 && !slideComplete) {
      setLocalSlideComplete(true);
      if (setSlideComplete) setSlideComplete(true);
    }
  });

  return (
    <div ref={targetRef}>
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          slideComplete
            ? {
                scale: 1,
                opacity: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              }
            : {}
        }
        className={`${styles} ${
          slideComplete
            ? "bg-gradient-to-t from-[#87CEEB] to-[#1E90FF] bg-clip-text text-transparent"
            : ""
        }`}
        style={
          !slideComplete
            ? { x, opacity, rotateX, rotateY }
            : {} // no slide transform after complete
        }
      >
        {text}
      </motion.h2>

      {subText && (
        <motion.h3
          animate={slideComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-4 text-center text-xl sm:text-2xl md:text-3xl px-4"
        >
          {subText}
        </motion.h3>
      )}
    </div>
  );
};

export default SlidingText;
