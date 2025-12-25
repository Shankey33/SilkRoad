//React Imports
import React, { useState, useEffect } from 'react'

//External Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';

                                                
const Banner = () => {
    const API_BASE = import.meta.env.VITE_API_URL;
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchBannerImages = async () => {
            axios.get(`${API_BASE}/banner/all`)
                .then(response => {
                    setImages(response.data);
                }).catch(error => {
                    console.error('Error fetching banner images:', error);
                })
        }
        fetchBannerImages();
    }, [API_BASE]);


    return (

        // Image Slider with Swiper npm package
        <div className='w-full banner-container'>
            <Swiper
                loop={images.length > 1}
                autoplay={{delay: 4000, disableOnInteraction: false}}
                modules={[Autoplay]}
                className="rounded-none md:rounded-none"
            >
                {/* To do -> Add click to open functionality */}
                
                {images.map((image) => (
                    <SwiperSlide key={image._id}>
                        <div className="relative">
                            <a href={image.link}>
                                <img 
                                    src={image.image} 
                                    alt="banner image" 
                                    className='w-full h-56 sm:h-72 md:h-96 lg:h-[480px] object-cover cursor-pointer' 
                                />
                            </a>
                            {/* Optional: Text overlay like in the reference */}
                            <div className="banner-overlay"></div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper> 
        </div>
    )
}

export default Banner
