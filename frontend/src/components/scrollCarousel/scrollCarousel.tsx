"use client"

import { useRef, useState } from "react";

interface Step {
  number: number;
  title: string;
  description: string;
}

const buyerJourneySteps: Step[] = [
  {
    number: 1,
    title: "Define Your Vision & Budget",
    description:
      "We’ll start with a personal consultation to explore your lifestyle goals, must-haves, and what drew you to Fall River. I’ll connect you with trusted mortgage experts to get pre-approved, helping you understand your budget and buying power. We’ll discuss family size, commute, amenities like schools or parks, and set realistic expectations based on your financial readiness.",
  },
  {
    number: 2,
    title: "Understand the Market & Costs",
    description:
      "You’ll receive a detailed overview of the Fall River real estate market, including current prices (around $930,900 as of May 2025), competition, and timelines (homes often sell within 30 days). We’ll break down all costs—down payment, closing fees, property taxes, and more—so you’re fully prepared and confident.",
  },
  {
    number: 3,
    title: "Start the Home Search",
    description:
      "I’ll set up a personalized MLS search with real-time listing alerts tailored to your criteria. We’ll review homes together, tour properties, and evaluate their fit based on neighborhood specifics and market value. I’ll help you spot hidden value or concerns, ensuring the home aligns with your vision.",
  },
  {
    number: 4,
    title: "Craft a Winning Offer",
    description:
      "When you find the right home, I’ll create a data-backed offer strategy using a comparative market analysis of recent Fall River sales. We’ll discuss conditions, closing dates, and terms to make your offer competitive yet protective, leveraging my negotiation experience to strengthen your position.",
  },
  {
    number: 5,
    title: "Negotiate & Secure the Deal",
    description:
      "I’ll be your advocate during negotiations and counter-offers, keeping you informed and calm. Post-acceptance, we’ll arrange inspections and appraisals, confirm financing, and ensure all conditions are met, guiding you smoothly through this critical phase.",
  },
  {
    number: 6,
    title: "Close & Celebrate",
    description:
      "Before closing, we’ll do a final walk-through and coordinate with your real estate lawyer for title searches and paperwork. On closing day, you’ll receive your keys, and I’ll be there to celebrate! My support continues post-sale for any future needs or questions.",
  },
];

const ScrollCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollTo = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.9;
      const newScrollPosition =
        direction === "left"
          ? carouselRef.current.scrollLeft - scrollAmount
          : carouselRef.current.scrollLeft + scrollAmount;
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const StepCard = ({ step }: { step: Step }) => (
    <div className="relative w-[95vw] max-w-[600px] h-[600px] bg-blue-50 rounded-lg flex flex-col items-center justify-center p-8 shadow-lg flex-shrink-0">
      <div className="relative w-[100px] h-[100px] flex items-center justify-center mb-6">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#3B82F6"
            strokeWidth="4"
            fill="none"
            strokeDasharray="282.6"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-900">
          {step.number}
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-center text-gray-900 mb-4">
        {step.title}
      </h3>
      <p className="text-base text-left text-gray-700 leading-relaxed">
        {step.description}
      </p>
    </div>
  );

  return (
    <section className="bg-blue-100 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 bg-gradient-to-br from-gray-900 to-blue-600 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-4xl md:text-5xl">
          Your Path to Homeownership in Fall River
        </h2>
        <p className="mb-12 max-w-2xl mx-auto text-center text-base leading-relaxed text-gray-700 md:text-lg">
          Buying a home in Fall River, Nova Scotia, is a journey we’ll navigate together. Our detailed process ensures you’re informed, confident, and excited every step of the way.
        </p>
        <div className="flex h-24 items-center justify-center">
          <span className="font-semibold uppercase text-gray-600">
            Scroll or use arrows to explore
          </span>
        </div>
        <div className="relative">
          <div
            ref={carouselRef}
            onScroll={checkScrollPosition}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 pb-4"
          >
            {buyerJourneySteps.map((step, index) => (
              <StepCard key={index} step={step} />
            ))}
          </div>
          <button
            onClick={() => scrollTo("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 bg-blue-200/30 p-3 rounded-full text-gray-900 ${
              canScrollLeft ? "opacity-100 hover:bg-blue-200/50" : "opacity-50 cursor-not-allowed"
            } transition-opacity`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scrollTo("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 bg-blue-200/30 p-3 rounded-full text-gray-900 ${
              canScrollRight ? "opacity-100 hover:bg-blue-200/50" : "opacity-50 cursor-not-allowed"
            } transition-opacity`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ScrollCarousel;