"use client"

import CarouselGrid from "@/components/gridCarousel/gridCarousel";
import React from "react";
import { galleryImages,products } from "@/data/galleryPage";
import ServiceHerobanner from "@/components/serviceHero/serviceHero";
import bg from '../../public/print-popup.jpg'
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Product from "@/components/product/product";
const GalleryPage = () => {


    return (
        <main className="bg-blue-100 space-y-6">
            <Navbar
            currentPage="Gallery"
            />
            <ServiceHerobanner
            title="All of our products"
            description="Here you can see all of our current products and gallery some of our best work"
            src={bg.src}
            alt="alt"
            />
           

                   

<div className="grid grid-cols-1 gap-8 p-8">
      {products.map((prod, i) => (
        <Product key={i} {...prod} />
      ))}
    </div>

    <CarouselGrid
                    images={galleryImages}
                    isMobile={false}
                    />


                    <Footer/>

        </main>
    )
}

export default GalleryPage