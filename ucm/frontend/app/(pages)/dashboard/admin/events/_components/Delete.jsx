"use client";
import { useState } from "react";

export default function Delete({ id }) {
  const [isDeleteBttnActive, setIsDeleteBttnActive] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsDeleteBttnActive(true)}
        className="size-6 bg-red-500/80 text-white flex justify-center items-center rounded text-sm hover:bg-red-500/100 scale-0 group-hover:scale-100 duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>

      {isDeleteBttnActive && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-red-500 text-white px-5 py-5 z-50">
          <div className="flex flex-col items-center gap-y-8">
            <h1 className="font-original_surfer text-3xl text-center">
              Are you sure?
            </h1>
            <p className="max-w-[400px] text-sm text-center">
              Please confirm that you want to permanently remove this event.
            </p>

            <div className="w-full flex gap-x-5">
              <button className="w-full h-[50px] text-red-500 bg-white/90 hover:bg-white duration-300 font-original_surfer">
                Confirm
              </button>
              <button
                onClick={() => setIsDeleteBttnActive(false)}
                className="w-full h-[50px] text-black bg-white/90 hover:bg-white duration-300 font-original_surfer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
