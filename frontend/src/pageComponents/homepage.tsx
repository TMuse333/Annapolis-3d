"use client"

import { heroData, placeholderImages,features, parallaxIntro, sampleAbout, contactCloserData } from "@/data/homepageData";
import React from "react";
import CarouselHero from "../components/carouselHero/carouselHero";
import FeatureBoxes from "../components/featureBoxes/featureBoxes";
// import ExperienceCard from "@/components/experienceCard/experienceCard";
import Carousel from "@/components/carousel/carousel";
import ParallaxText from "@/components/parallaxText/parallaxText";
import InteractiveStepper from "@/components/steps/steps";
import SlidingText from "@/components/slidingText/slidingText";
import ImageTextBox from "@/components/imageTextBox/imageTextBox";
import ContactCloser from "@/components/contactCloser/contactCloser";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";


const Homepage = () => {



    return (
        <main className="w-screen bg-blue-100 ">
            <Navbar
            currentPage="Home"
            />
            <CarouselHero
            {...heroData}
            />
            <ParallaxText
            {...parallaxIntro}
            />
            {/* <ExperienceCard
            {...introProps}
            /> */}

<SlidingText
  text="Our Standout Features"
  subText="Discover what makes us the right choice for you"
  styles="text-black text-center text-5xl sm:text-6xl"
/>



        <section className=""
        id='features'>

           
            <FeatureBoxes
            boxData={features}
            />

            <InteractiveStepper/>

            

            <Carousel
            images={placeholderImages}
            hasDescription
            />

            <ImageTextBox
            {...sampleAbout}
            />
             </section>

            <ContactCloser
            {...contactCloserData}
            />

            <Footer
            />

            {/* <FeatureBoxes/> */}

            
        </main>
    )
}

export default Homepage