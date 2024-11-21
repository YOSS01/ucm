"use client";
import { useState } from "react";

export default function Edit({ user }) {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  return (
    <>
      <button
        className="absolute right-5 top-3 group w-fit h-fit cursor-pointer"
        onClick={() => {
          setIsEditFormOpen((prev) => !prev);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 text-black/60 group-hover:text-black duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
      {isEditFormOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[500px] w-full h-fit bg-[#252525] text-white px-5 py-5 z-50">
          <form
            method="POST"
            className="w-full flex flex-col items-center gap-y-8"
          >
            <h1 className="font-original_surfer text-3xl text-center">
              Edit Infos
            </h1>
            <div className="w-full flex flex-col gap-y-5 text-sm">
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="first_name">First name</label>
                <input
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder={user?.first_name}
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="last_name">Last name</label>
                <input
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder={user?.last_name}
                />
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="">Email</label>
                <div className="w-full border-b border-solid border-gray-500 py-2 text-white/40 bg-transparent cursor-not-allowed">
                  <span className="lowercase">{user?.email}</span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="">CIN</label>
                <div className="w-full border-b border-solid border-gray-500 py-2 text-white/40 bg-transparent cursor-not-allowed">
                  <span className="uppercase">{user?.cin}</span>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-x-5">
              <button className="w-full h-[50px] text-white bg-green-500/80 hover:bg-green-500 duration-300 font-original_surfer">
                Save
              </button>
              <button
                onClick={() => setIsEditFormOpen(false)}
                className="w-full h-[50px] text-black bg-white/90 hover:bg-white duration-300 font-original_surfer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
