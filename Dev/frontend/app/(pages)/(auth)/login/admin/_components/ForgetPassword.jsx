"use client";
import { useState } from "react";

export default function ForgetPassword() {
  const [isForgetPasswordBttnActive, setIsForgetPasswordBttnActive] =
    useState(false);
  return (
    <>
      <button
        onClick={() => setIsForgetPasswordBttnActive(true)}
        type="button"
        className="text-xs text-red-600 hover:underline"
      >
        Forgot password?
      </button>

      {isForgetPasswordBttnActive && (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-[#252525] text-white px-5 py-5 z-50">
          <button
            onClick={() => setIsForgetPasswordBttnActive(false)}
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
          <form className="flex flex-col gap-y-8">
            <h1 className="font-original_surfer text-3xl text-center">
              Forget password?
            </h1>
            <div className="flex flex-col gap-y-5 text-sm">
              <div className="flex flex-col">
                <label for="email" className="w-fit">
                  Email
                </label>
                <input
                  type="email"
                  name=""
                  id="email"
                  placeholder="Type your email here..."
                  className="outline-none border-b py-2 bg-transparent"
                  required
                />
              </div>
            </div>

            <button className="w-full h-[50px] text-black bg-white/90 hover:bg-white duration-300 font-original_surfer">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
