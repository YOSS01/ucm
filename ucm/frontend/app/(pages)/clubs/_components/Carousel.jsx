"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";

// Toaster
import toast from "react-hot-toast";

export default function Carousel({ session }) {
  const [swiper, setSwiper] = useState();
  const [index, setIndex] = useState(1);
  const data = [
    {
      title: "EcoAction Club",
      description:
        "EcoAction Club is dedicated to raising awareness about environmental issues and promoting sustainable practices within the university and the local community. The club organizes educational events, workshops, and campaigns that encourage students to adopt eco-friendly lifestyles and contribute to environmental preservation.",
      image:
        "https://images.unsplash.com/photo-1694676210590-b1de7d741b81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slug: "ecoaction_club",
    },
    {
      title: "Robotics and Engineering Club",
      description:
        "The Robotics and Engineering Club is dedicated to fostering innovation in the fields of robotics, electronics, and mechanical engineering. Members collaborate on designing, building, and programming robots for various competitions and projects. The club provides hands-on experience in robotics, programming, and mechanical design, encouraging students to push the boundaries of technology.",
      image:
        "https://images.unsplash.com/photo-1590401043335-2c0c4bc19eb5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slug: "robotics_and_engineering_club",
    },
    {
      title: "Photography and Film Club",
      description:
        "The Photography and Film Club brings together students passionate about visual storytelling through photography and filmmaking. The club focuses on enhancing students' creative and technical skills by exploring various genres and styles. Whether you're a beginner or an experienced photographer or filmmaker, the club offers a space to collaborate, learn, and showcase your work.",
      image:
        "https://images.unsplash.com/photo-1647855169746-aa316eae7f46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slug: "photography_and_film_club",
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
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
          setIndex(swiper.realIndex + 1);
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {data?.map((item, key) => (
          <SwiperSlide key={key}>
            <div className="w-full h-screen text-white relative">
              <div className="absolute bottom-10 left-10 z-10 flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-3">
                  <h1 className="text-3xl font-original_surfer font-black">
                    {item?.title}
                  </h1>
                  <p className="max-w-[500px] text-sm font-light line-clamp-4">
                    {item?.description}
                  </p>
                </div>
                <div className="text-sm flex items-center gap-x-5">
                  <Signup session={session} />
                  <Link
                    href={`/clubs/${item?.slug}`}
                    className="h-[45px] flex justify-center items-center border-2 border-solid border-white rounded-full px-7 hover:bg-white hover:text-black duration-300"
                  >
                    See more
                  </Link>
                </div>
              </div>
              {/* Background */}
              <>
                <Image
                  src={item?.image}
                  alt="Event Background"
                  width={2070}
                  height={1080}
                  className="absolute z-0 w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute w-full h-full bg-black/50 z-[1]"></div>
              </>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const Signup = ({ session }) => {
  function handleSignup() {
    if (!session) {
      toast("Please create an account to proceed!", {
        icon: "🔔",
      });
    }
  }
  return (
    <>
      <button
        onClick={handleSignup}
        className="h-[45px] border-2 border-solid border-white rounded-full px-7 bg-white text-black hover:bg-transparent hover:text-white duration-300"
      >
        Get in
      </button>
    </>
  );
};
