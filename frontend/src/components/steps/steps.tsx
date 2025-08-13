import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  title: string;
  content: string;
  image?: string;
}

const steps: Step[] = [
  { title: 'Step 1: Introduction', content: 'Welcome to the step-by-step guide. This is the first step where we introduce the concept.', image: '/placeholder.webp' },
  { title: 'Step 2: Details', content: 'In this step, we dive deeper into the details and explain the core functionality.', image: '/placeholder.webp' },
  { title: 'Step 3: Conclusion', content: 'Finally, we wrap up with key takeaways and next actions.', image: '/placeholder.webp' },
];

const InteractiveStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);


  const nextStep = () => {
    if (currentStep < steps.length - 1) {

      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      
      setCurrentStep(currentStep - 1);
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0 },
  };

  const imageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0 },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20 },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto p-8 bg-white rounded-lg shadow-lg min-h-[600px] mb-12">
        <h2 className=' text-center'>How do we make our products?</h2>
      {/* Progress Indicator */}
      <div className="flex justify-between mb-8">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-3 mx-1 rounded-full ${
              index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Step Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-center md:flex md:flex-row md:items-center md:gap-8"
        >
          {steps[currentStep].image && (
            <motion.div
              variants={imageVariants}
              className="w-full md:w-1/2 h-96 bg-gray-200 rounded-lg mb-8 md:mb-0 flex items-center justify-center"
            >
              <span className="text-black text-xl">Image: {steps[currentStep].image}</span>
            </motion.div>
          )}
          <div className="md:w-1/2">
            <motion.h2
              variants={titleVariants}
              className="text-4xl font-bold mb-6 text-black"
            >
              {steps[currentStep].title}
            </motion.h2>
            <motion.p
              variants={contentVariants}
              className="text-xl text-black"
            >
              {steps[currentStep].content}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="flex justify-between mt-10">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-8 py-4 bg-gray-300 text-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 text-3xl font-bold"
        >
          ←
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 text-3xl font-bold"
        >
          {currentStep === steps.length - 1 ? 'Finish' : '→'}
        </button>
      </div>
    </div>
  );
};

export default InteractiveStepper;