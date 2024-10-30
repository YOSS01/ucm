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

export default function Carousel() {
  const [swiper, setSwiper] = useState();
  const [index, setIndex] = useState(1);
  const data = [
    {
      title: "Tech Innovation Hackathon",
      description:
        "The Tech Innovation Hackathon is a 48-hour coding competition open to all students passionate about technology, software development, and problem-solving. Participants will work in teams to create innovative solutions to real-world problems using various programming languages and frameworks. There will be industry mentors and professors available for guidance throughout the event.",
      image:
        "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Cultural Diversity Night",
      description:
        "Cultural Diversity Night is a vibrant celebration of the rich cultural heritage represented by the students on campus. The event will feature music, dance, traditional attire, and food from different countries. Students are encouraged to share and showcase their cultural traditions through performances, exhibitions, and food stalls.",
      image:
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Startup Pitch Competition",
      description:
        "The Startup Pitch Competition provides a platform for aspiring entrepreneurs to pitch their business ideas to a panel of experienced judges, including local business leaders and venture capitalists. Students will compete for funding, mentorship, and incubation opportunities. The event is aimed at fostering innovation and supporting student startups.",
      image:
        "https://images.unsplash.com/photo-1560523160-754a9e25c68f?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Open Mic Night: Talent Showcase",
      description:
        "Open Mic Night is a platform for students to showcase their talents in front of a supportive audience. Whether it's singing, poetry, stand-up comedy, spoken word, or playing an instrument, everyone is welcome to perform. This casual event is perfect for students who want to express themselves creatively or enjoy a fun, relaxing evening with friends.",
      image:
        "https://images.unsplash.com/photo-1692552950929-395ee3797684?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Game Development Jam",
      description:
        "The Game Development Jam is a 48-hour event where teams of students come together to design and develop a complete video game from scratch. Participants will be given a theme at the start of the event, and they must create a playable game based on that theme. This event is perfect for anyone interested in game design, development, and storytelling, whether they are experienced or just getting started.",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Debate Tournament: Environmental Policy Edition",
      description:
        "This two-day Debate Tournament will focus on the theme of environmental policy. Teams from various disciplines will engage in structured debates on key issues such as climate change, renewable energy, and governmental policies regarding environmental protection. The event aims to foster critical thinking and public speaking skills while encouraging students to engage with one of the most pressing issues of our time.",
      image:
        "https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute right-10 bottom-10 flex flex-col items-end gap-y-10 z-10">
        <div className="font-original_surfer text-white">
          <span className="text-6xl">
            <sup>{index}</sup>
            <span className="text-7xl">/{data?.length}</span>
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
        {data?.map((item, key) => (
          <SwiperSlide key={key}>
            <Event item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
