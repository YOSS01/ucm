"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function View({ event }) {
  const [isViewBttnActive, setIsViewBttnActive] = useState(false);
  const [club, setClub] = useState({});

  useEffect(() => {
    // Fetch Users
    const getClub = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/club/${event?.id_club}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          // toast.error("Faild to load club!");
          return;
        }

        const result = await response.json();
        setClub(result);
        return;
      } catch (error) {
        console.error(error);
      }
    };

    getClub();
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsViewBttnActive(true)}
        className="size-6 bg-gray-500/70 text-white flex justify-center items-center rounded text-sm hover:bg-gray-500/100 scale-0 group-hover:scale-100 duration-300"
      >
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
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>

      {isViewBttnActive && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  h-[550px] w-full max-w-[450px] bg-[#252525] text-white rounded-3xl flex flex-col justify-center gap-y-10 z-50 p-5 overflow-hidden">
          <button
            onClick={() => setIsViewBttnActive(false)}
            type="button"
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
          <div className="max-h-[400px] overflow-y-auto visible-scrollbar flex flex-col gap-y-3">
            <h1 className="font-original_surfer text-2xl">{event?.name}</h1>

            <div className="w-full flex flex-col gap-y-3 text-xs">
              <p className="text-white/80 text-justify">{event?.description}</p>
              <p className="text-white/80 font-light">
                Club:{" "}
                <Link
                  href={`/clubs/${club?.slug}`}
                  className="text-white font-original_surfer"
                >
                  {club?.name}
                </Link>
              </p>
              <p className="text-white/80 font-light">
                Location:{" "}
                <span className="text-white font-medium">
                  {event?.location}
                </span>
              </p>
              <p className="text-white/80 font-light">
                Date:{" "}
                <span className="text-white font-medium">{event?.date}</span>
              </p>
              <p className="text-white/80 font-light">
                Participants:{" "}
                <span className="text-green-500 font-medium">77</span>
              </p>
              {/* <p className="text-white/80 font-light">
                Status:{" "}
                <span
                  className={`${
                    event?.status === "approved"
                      ? "text-green-500"
                      : event?.status === "pending"
                      ? "text-orange-500"
                      : event?.status === "rejected" && "text-red-500"
                  } capitalize`}
                >
                  {event?.status}
                </span>
              </p> */}

              <p className="text-white/80 font-light">
                Created At:{" "}
                <span className="text-white">{event?.created_at}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
