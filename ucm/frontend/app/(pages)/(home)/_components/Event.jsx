"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Event({ item }) {
  const [isSeeMoreBttnActive, setIsSeeMoreBttnActive] = useState(false);
  const [isGetInBttnActive, setIsGetInBttnActive] = useState(false);
  return (
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
          <button
            onClick={() => {
              setIsSeeMoreBttnActive(false);
              setIsGetInBttnActive(true);
            }}
            className="h-[45px] border-2 border-solid border-white rounded-full px-7 bg-white text-black hover:bg-transparent hover:text-white duration-300"
          >
            Get in
          </button>
          <button
            onClick={() => {
              setIsGetInBttnActive(false);
              setIsSeeMoreBttnActive(true);
            }}
            className="h-[45px] border-2 border-solid border-white rounded-full px-7 hover:bg-white hover:text-black duration-300"
          >
            See more
          </button>
        </div>
      </div>
      {isSeeMoreBttnActive && (
        <SeeMore
          item={item}
          setIsSeeMoreBttnActive={setIsSeeMoreBttnActive}
          setIsGetInBttnActive={setIsGetInBttnActive}
        />
      )}
      {isGetInBttnActive && (
        <GetIn setIsGetInBttnActive={setIsGetInBttnActive} />
      )}

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
  );
}

function SeeMore({ item, setIsSeeMoreBttnActive, setIsGetInBttnActive }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-white text-black px-5 py-14 z-50">
      <button
        onClick={() => setIsSeeMoreBttnActive(false)}
        className="absolute right-5 top-5 z-[9999]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-original_surfer">{item?.title}</h1>
          <p className="text-xs text-black/80 text-justify">
            {item?.description}
          </p>
        </div>

        <div className="flex flex-col gap-y-2 text-sm text-black/80">
          <div className="flex gap-x-2">
            <span>Location:</span>
            <span className="text-black font-medium">New York, NY</span>
          </div>
          <div className="flex gap-x-2">
            <span>Date:</span>
            <span className="text-black font-medium">2024-12-05</span>
          </div>
          <div className="flex gap-x-2">
            <span>Organized by:</span>
            <Link
              href="/clubs/ecoaction_club"
              className="text-black font-medium font-original_surfer flex items-center gap-x-1"
            >
              EcoAction Club{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
          </div>
        </div>

        <button
          onClick={() => {
            setIsGetInBttnActive(true);
            setIsSeeMoreBttnActive(false);
          }}
          className="w-full h-[50px] bg-black/70 hover:bg-black duration-300 text-white mt-10"
        >
          Get in
        </button>
      </div>
    </div>
  );
}

function GetIn({ setIsGetInBttnActive }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-white text-black px-5 py-14 z-50">
      <button
        onClick={() => setIsGetInBttnActive(false)}
        className="absolute right-5 top-5 z-[9999]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <form className="flex flex-col gap-y-10">
        <h1 className="font-original_surfer text-3xl text-center">
          Participate in
        </h1>
        <div className="flex flex-col gap-y-5 text-sm">
          <div className="flex flex-col">
            <label for="name" className="w-fit">
              Full Name
            </label>
            <input
              type="text"
              name=""
              id="name"
              placeholder="Type your name here..."
              className="outline-none border-b py-2"
              required
            />
          </div>
          <div className="flex flex-col">
            <label for="email" className="w-fit">
              Email
            </label>
            <input
              type="email"
              name=""
              id="email"
              placeholder="Type your email here..."
              className="outline-none border-b py-2"
              required
            />
          </div>
        </div>

        <button className="w-full h-[50px] text-white bg-black/80 hover:bg-black duration-300 font-original_surfer">
          Submit
        </button>
      </form>
    </div>
  );
}
