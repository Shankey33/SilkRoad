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
        <div className='w-full'>
            <Swiper
                loop={images.length > 1}
                autoplay={{delay: 3000}}
                modules={[Autoplay]}
            >
                {/* To do -> Add click to open functionality */}
                
                {images.map((image) => (
                    <SwiperSlide key={image._id}>                        
                        <a href={image.link}><img src={image.image} alt="banner image" className='w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover cursor-pointer' /></a>
                    </SwiperSlide>
                ))}
            </Swiper> 
        </div>
    )
}

export default Banner
