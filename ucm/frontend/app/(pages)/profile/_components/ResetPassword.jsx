"use client";
import { useState } from "react";

export default function ResetPassword() {
  const [isResetFormOpen, setIsResetFormOpen] = useState(false);
  return (
    <>
      <button
        className="absolute right-14 top-3 group w-fit h-fit cursor-pointer"
        onClick={() => {
          setIsResetFormOpen(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 text-red-500/80 group-hover:text-red-500 duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
          />
        </svg>
      </button>
      {isResetFormOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-[#252525] text-white px-5 py-5 z-50">
          <form method="POST" className="flex flex-col items-center gap-y-8">
            <h1 className="font-original_surfer text-3xl text-center">
              Reset Password
            </h1>
            <div className="w-full flex flex-col gap-y-5 text-sm">
              <div className="w-full flex flex-col gap-y-0">
                <label htmlFor="password">Password</label>
                <input
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="w-full flex flex-col gap-y-0">
                <label htmlFor="newPassword">New Password</label>
                <input
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password"
                />
              </div>
              <div className="w-full flex flex-col gap-y-0">
                <label htmlFor="confirmPassword">Confrim password</label>
                <input
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div className="w-full flex gap-x-5">
              <button className="w-full h-[50px] text-red-500 bg-white/90 hover:bg-white duration-300 font-original_surfer">
                Confirm
              </button>
              <button
                onClick={() => setIsResetFormOpen(false)}
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
