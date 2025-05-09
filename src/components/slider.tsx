import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Autoplay, Navigation, Scrollbar } from "swiper/modules";

const SwiperSlider = () => {
  const images = ["/k-1.jpg", "/k-2.jpg", "/k-3.jpg"];
  return (
    <div className="w-full flex">
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
        scrollbar={{ draggable: true }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="h-96 flex">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
