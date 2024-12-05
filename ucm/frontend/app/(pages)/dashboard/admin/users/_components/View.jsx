"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function View({ user }) {
  const [isViewBttnActive, setIsViewBttnActive] = useState(false);

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
          <div className="flex flex-col items-center gap-y-2">
            <div className="size-[150px] flex justify-center items-center border rounded-full overflow-hidden mb-3">
              {user?.picture ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/users/${user?.picture}`}
                  alt="Profile User"
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
                  className="size-14 text-gray-300"
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
              {user?.first_name + " " + user?.last_name} /{" "}
              <Link
                href={`mailto:${user?.email}}`}
                className="text-xs text-white/80 font-light"
              >
                {user?.email}
              </Link>
            </h1>

            <span className="text-xs text-white/80 font-light uppercase">
              CIN: <span className="font-medium text-white">{user?.cin}</span>
            </span>
            <span className="text-xs text-white/80 font-light">
              Created At:{" "}
              <span className="font-medium text-white">{user?.created_at}</span>
            </span>
          </div>
          <div>
            <h2 className="text-sm">Clubs:</h2>
            <ul className="min-h-[80px] max-h-[80px] flex flex-wrap justify-center items-center py-3 gap-2 text-xs overflow-y-auto">
              {user?.clubs?.length !== 0 ? (
                user?.clubs?.map((club, key) => (
                  <li
                    key={key}
                    className="size-14 bg-white/10 rounded-full flex justify-center items-center p-1"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/clubs/${club?.club_logo}`}
                      alt={club?.club_name}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </li>
                ))
              ) : (
                <li className="text-white/40">Not member in any club yet</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
