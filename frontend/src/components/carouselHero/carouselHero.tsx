import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticlesComponent from "../particles/particles";
import logo from '../../../public/logo.jpg'

interface CarouselData {
  src: string;
  alt: string;
  description: string;
}

interface CarouselHeroProps {
  mainHeader: string;
  titleText: string;
  descriptionText: string;
  carouselData: CarouselData[];
  button?: React.ReactNode;
}

const Carousel = ({ carouselData }: { carouselData: CarouselData[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [tabProgress, setTabProgress] = useState<number>(0);
  const [slideInProgress, setSlideInProgress] = useState(true);

  useEffect(() => {
    setTabProgress(0);
    setSlideInProgress(false);
  }, [currentIndex]);

  useEffect(() => {
    if (tabProgress === 100) {
      setSlideInProgress(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }
  }, [tabProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tabProgress < 100) {
        setTabProgress((prev) => prev + 0.5);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [tabProgress]);

  return (
    <section
      className={`relative w-[98vw] bg-black md:w-[60vw] rounded-2xl object-contain mx-auto md:block h-[80vh] mt-auto mb-auto  text-center`}
    >
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[80%] mb-auto"
        >
          <Image
            src={carouselData[currentIndex].src}
            height={600}
            width={1300}
            alt={carouselData[currentIndex].alt}
            className="w-full rounded-2xl object-cover mx-auto h-full mb-auto"
          />
          <p className="bg-black">{carouselData[currentIndex].description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute  flex bottom-[5%] left-1/2 -translate-x-1/2">
        {carouselData.map((_, index) => (
          <div
            key={index}
            className={`h-[8px] relative w-[50px] bg-gray-600 mr-3 hover:scale-[1.2] transition-all`}
            onClick={() => setCurrentIndex(index)}
          >
            {index === currentIndex && (
              <div
                className="bg-white h-full"
                style={{
                  width: `${tabProgress}%`,
                  transition: slideInProgress ? "width 0.3s ease-in" : "none",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const CarouselHero = ({
  mainHeader,
  titleText,
  descriptionText,
  carouselData,
  button,
}: CarouselHeroProps): React.JSX.Element => {
  return (
    <header className="w-full">
      <section className="flex flex-col md:flex-row md:h-screen relative items-center mx-auto max-w-[2200px] md:mt-[-4rem]">
        <Image
        src={"/bg.png"}
        alt="alt"
        className="absolute z-0 w-full h-full object-cover top-0 left-0"
        width={600}
        height={1300}
        />
        <section className="flex relative z-[2] flex-col md:w-[40vw] justify-center items-center py-4">
          <Image
          src={logo}
          alt='Logo'
          className="w-[35vw] object-contain max-w-[300px] rounded-full"
          />
          <motion.h1
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mx-auto p-3 text-center text-lg mt-4 font-semibold"
          >
            {titleText}
          </motion.h1>

          <h2 className="mx-auto py-3 break-words max-w-full px-2 font-semibold whitespace-pre-line text-3xl sm:text-4xl md:text-4xl">
            {mainHeader}
          </h2>

          <p className="pt-4 mx-3">{descriptionText}</p>

          <section className="flex mt-4 mr-auto ml-4 w-full">
            {button && button}
          </section>
        </section>

        <Carousel carouselData={carouselData} />
      </section>
    </header>
  );
};

export default CarouselHero;
