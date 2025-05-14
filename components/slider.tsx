"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Autoplay, Navigation, Scrollbar } from "swiper/modules";
import Image from "next/image";

const SwiperSlider = () => {
  const images = [
    "/k-1.jpg",
    "/k-2.jpg",
    "/k-3.jpg",
    "/k-4.jpg",
    "/k-5.jpg",
    "/k-6.jpg",
  ];

  return (
    <div className="relative w-full flex h-[50vh] md:mt-0 -mt-2">
      <Swiper
        modules={[Navigation, Scrollbar, A11y, Autoplay]} // Add Autoplay module here
        spaceBetween={50}
        slidesPerView={3}
        autoplay={{
          delay: 10000, // Delay between slides in milliseconds (3000ms = 3s)
          disableOnInteraction: false, // Continue autoplay even after user interaction
          pauseOnMouseEnter: true, // Pause autoplay on hover
        }}
        loop={true}
        centeredSlides={true}
        navigation
        breakpoints={{
          0: {
            slidesPerView: 1, // small screens
          },
          768: {
            slidesPerView: 1, // medium screens
          },
          1024: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 3,
          },
        }}
        scrollbar={{ draggable: true }}
        className="w-full h-full relative"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative ">
            <Image
              src={image}
              fill
              style={{ objectFit: "contain" }}
              alt="Displayed Image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
