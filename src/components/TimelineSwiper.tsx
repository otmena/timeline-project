import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../styles/timelineswitcher.scss";

interface EventData {
  date: string;
  description: string;
}

interface SliderProps {
  events: EventData[]; 
}

const Slider: React.FC<SliderProps> = ({ events }) => {
  return (
    <div className="container">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        }}
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div>
              <strong className="title">{event.date}</strong>
              <p className="subtitle">{event.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev" />
      <div className="swiper-button-next" />
    </div>
  );
};

export default Slider;
