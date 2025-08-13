import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  src: string;
  alt: string;
  title: string;
  description: string;
  buttonText?: string; // Optional since commented out
  destination?: string; // Optional since commented out
}

const ServiceHerobanner: React.FC<Props> = ({
  src,
  alt,
  title,
  description,
  // buttonText,
  // destination,
}) => {
  return (
    <header
      className="w-screen min-h-[500px] h-[75vh] text-center text-gray-200 relative flex flex-col items-center justify-center transition-colors duration-1000"
      role="banner"
    >
      <Image
        className="w-full h-full object-cover absolute z-[1] brightness-[0.5]"
        src={src}
        priority
        width={600}
        height={1300}
        alt={alt}
      />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.3, delayChildren: 0.2 }}
        className="text-left w-4/5 relative z-[2]"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="text-xl mt-4 sm:text-2xl md:text-3xl"
        >
          {description}
        </motion.h2>

        {/* Uncomment if needed
        <motion.a
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          href={destination}
          className="inline-block mt-8 bg-gray-300 p-4 text-black rounded-md hover:scale-[1.1] hover:bg-slate-900 hover:text-white transition-all"
        >
          {buttonText}
        </motion.a>
        */}
      </motion.section>
    </header>
  );
};

export default ServiceHerobanner;