"use client"

import CarouselGrid from "@/components/gridCarousel/gridCarousel";
import React from "react";
import { galleryImages } from "@/data/galleryPage";
import ServiceHerobanner from "@/components/serviceHero/serviceHero";
import bg from '../../public/print-popup.jpg'
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
const GalleryPage = () => {


    return (
        <main className="bg-blue-100 space-y-6">
            <Navbar
            currentPage="Gallery"
            />
            <ServiceHerobanner
            title="Our gallery"
            description="Checkout our favourite pieces"
            src={bg.src}
            alt="alt"
            />

                    <CarouselGrid
                    images={galleryImages}
                    isMobile={false}
                    />

                    <Footer/>

        </main>
    )
}

export default GalleryPage