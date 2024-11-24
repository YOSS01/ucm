"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function View({ club }) {
  const [isViewBttnActive, setIsViewBttnActive] = useState(false);
  const [president, setPresident] = useState({});

  useEffect(() => {
    // Fetch Users
    const getUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/user-number/${club?.id_president}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // toast.error("Faild to load users!");
          return;
        }

        const result = await response.json();
        setPresident(result);
        return;
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
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
          <div className="max-h-[400px] overflow-y-auto visible-scrollbar flex flex-col items-center gap-y-2">
            <div className="min-h-[130px] min-w-[130px] size-[130px] flex justify-center items-center border rounded-full overflow-hidden mb-3">
              {false ? (
                <Image
                  src={club?.logo}
                  alt="Club Logo"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="size-12 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              )}
            </div>
            <h1 className="font-original_surfer">
              {club?.name} /{" "}
              <Link
                href={`mailto:${club?.email}}`}
                className="text-xs text-white/80 hover:text-white duration-300 font-light"
              >
                {club?.email}
              </Link>
            </h1>

            <div className="w-full flex flex-col gap-y-2 text-xs">
              <p className="text-white/80 text-justify">{club?.description}</p>
              <p className="text-white/80 font-light">
                Slug: <span className="text-white">{club?.slug}</span>
              </p>
              <p className="text-white/80 font-light">
                Status:{" "}
                <span
                  className={`${
                    club?.status === "approved"
                      ? "text-green-500"
                      : club?.status === "pending"
                      ? "text-orange-500"
                      : club?.status === "rejected" && "text-red-500"
                  } capitalize`}
                >
                  {club?.status}
                </span>
              </p>
              <p className="text-white/80 font-light">
                President:{" "}
                <span className="text-white">
                  <span className="font-original_surfer">
                    {president?.first_name + " " + president?.last_name}
                  </span>{" "}
                  /{" "}
                  <Link
                    href={`mailto:${president?.email}`}
                    className="text-[10px] italic font-original_surfer text-white/80 hover:text-white duration-300"
                  >
                    {president?.email}
                  </Link>
                </span>
              </p>
              <p className="text-white/80 font-light">
                Created At:{" "}
                <span className="text-white">{club?.created_at}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
