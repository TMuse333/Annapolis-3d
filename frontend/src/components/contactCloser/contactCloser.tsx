"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
  useInView,
  Variants,
} from "framer-motion";
import axios from "axios";


const COLORS_TOP = ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.6 + i * 0.2, ease: "easeOut" },
  }),
};

interface ContactCloserProps {
  imageSrc: string;
  imageAlt: string;
  headline: string;
  paragraph: string;
  ctaText:string
}

const ContactCloser: React.FC<ContactCloserProps> = ({
  imageSrc,
  imageAlt,
  headline,
  paragraph,
  ctaText
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const color = useMotionValue(COLORS_TOP[0]);
  const border = useMotionTemplate`2px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 8px 32px ${color}`;

  // Hardcoded questions inside the component
  const questions = [
    {
      name: "name",
      type: "text",
      placeholder: "Your Name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Your Email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      placeholder: "Your Phone Number",
      required: true,
    },
    {
      name: "intention",
      type: "text",
      placeholder: "Are you looking to buy, sell, or something else?",
      required: true,
    },
    {
      name: "extras",
      type: "textarea",
      placeholder: "Let us know any extra details about your situation.",
      required: true,
    },
  ];

  const [formData, setFormData] = useState<Record<string, string>>(
    questions.reduce((acc, q) => ({ ...acc, [q.name]: "" }), {})
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://www.naderomarrealtor.com/api/sendEmail", formData);
      setSuccess("Form submitted successfully!");
      setFormData(questions.reduce((acc, q) => ({ ...acc, [q.name]: "" }), {}));
      setError(null);
    } catch (error) {
      setError("Failed to submit form. Please try again.");
      setSuccess(null);
      console.log(error)
    }
  };

  return (
    <motion.section
    id='contact'
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-5xl mx-auto my-12 px-4 py-16 text-gray-900 overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-white"
    >
   
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        
             
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-24 w-24 md:h-48 md:w-48 rounded-full overflow-hidden border-4 border-blue-200 shadow-xl mb-6"
              style={{ boxShadow: boxShadow.get() }}
            >
              <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
            </motion.div>
  
            <motion.h2
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-br from-gray-900 to-blue-600 bg-clip-text text-transparent mb-6"
            >
              {headline}
            </motion.h2>
            <motion.p
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg max-w-2xl leading-relaxed text-gray-700 mb-8 whitespace-pre-line"
            >
              {paragraph}
            </motion.p>
         
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 flex flex-col justify-center items-center"
          >
            <p className="font-semibold mt-[-3rem] mb-4
            sm:text-lg">Fill in this form with your real estate needs and I will gladly get back to you shortly

            </p>
            {/* <div className="mr-auto flex flex-col mb-4">

               
<span><span className="font-bold
text-md sm:text-lg md:text-xl">
Phone: </span> (782)-321-3393</span>
&nbsp;
<span><span className="font-bold
text-md sm:text-lg md:text-xl">
Email: </span> naderomar@remax.ca</span>
</div> */}
            {questions.map((question, index) => (
              <motion.div
                key={question.name}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={staggerItem}
                custom={index}
                className="w-full mb-4"
              >
                {question.type === "textarea" ? (
                  <textarea
                    name={question.name}
                    value={formData[question.name] || ""}
                    onChange={handleChange}
                    className="border-2 border-blue-200 w-full p-3 rounded-lg bg-blue-50/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600"
                    rows={5}
                    required={question.required}
                    placeholder={question.placeholder}
                  />
                ) : (
                  <input
                    type={question.type}
                    name={question.name}
                    value={formData[question.name] || ""}
                    onChange={handleChange}
                    className="border-2 border-blue-200 w-full p-3 rounded-lg bg-blue-50/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-600"
                    required={question.required}
                    placeholder={question.placeholder}
                  />
                )}
              </motion.div>
            ))}
            {error && (
              <motion.p
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                className="text-red-600 mb-4"
              >
                {error}
              </motion.p>
            )}
            {success && (
              <motion.p
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                className="text-green-600 mb-4"
              >
                {success}
              </motion.p>
            )}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ delay: 0.4 + questions.length * 0.1 }}
              className="relative z-20"
            >
              <motion.button
                type="submit"
                style={{ border: border.get(), boxShadow: boxShadow.get() }}
                whileHover={{ scale: 1.05, backgroundColor: "#bfdbfe" }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-2 rounded-full bg-blue-200 px-8 py-4 text-lg font-semibold text-gray-900 transition-colors z-20"
              >
                {ctaText}
                <motion.span
                  className="inline-block"
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-0" />
    </motion.section>
  );
};

export default ContactCloser;