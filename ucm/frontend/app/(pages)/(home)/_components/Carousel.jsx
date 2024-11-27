"use client";
import { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";

// components
import Event from "./Event";

export default function Carousel({ session, events }) {
  const [swiper, setSwiper] = useState();
  const [index, setIndex] = useState(1);
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute right-10 bottom-10 flex flex-col items-end gap-y-10 z-10">
        <div className="font-original_surfer text-white">
          <span className="text-6xl">
            <sup>{index}</sup>
            <span className="text-7xl">/{events?.length}</span>
          </span>
        </div>
        <div className="flex items-center gap-x-5">
          <button
            onClick={() => swiper.slidePrev()}
            className="size-[50px] flex justify-center items-center border border-white border-solid rounded-full text-white hover:bg-white hover:text-black duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button
            onClick={() => swiper.slideNext()}
            className="size-[50px] flex justify-center items-center border border-white border-solid rounded-full text-white hover:bg-white hover:text-black duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[EffectCube, Autoplay]}
        effect="cube"
        loop={true}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        onSlideChange={(swiper) => {
          setIndex(swiper.realIndex + 1);
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {events?.map((item, key) => (
          <SwiperSlide key={key}>
            <Event item={item} session={session} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
