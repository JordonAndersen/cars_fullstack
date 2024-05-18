import React from "react";
import './carsswiper.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination'

import { Autoplay, EffectCoverflow } from "swiper/modules";
import Cars from "./Cars";
function CarSwiper({slides}) {
    return ( 
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            slidesPerView={'auto'}
            autoplay={
                {delay:2500,
                disableOnInteraction: false,
            }}
            coverfloweffects={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            loop={true}
            modules ={{Autoplay,EffectCoverflow}}
            className="CarSwiper">
                 {slides.map((car) => (  // Use cars prop for iteration
        <SwiperSlide key={car.car_model_id.id}>  {/* Ensure a unique key */}
          <Cars car={car} />
        </SwiperSlide>
      ))}

        </Swiper>



     );
}

export default CarSwiper;