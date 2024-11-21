"use client";
import { useState } from "react";

export default function Edit({ user }) {
  const [isEditBttnActive, setIsEditBttnActive] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsEditBttnActive(true)}
        className="size-6 bg-orange-500/80 text-white flex justify-center items-center rounded text-sm hover:bg-orange-500/100 scale-0 group-hover:scale-100 duration-300"
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      {isEditBttnActive && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-[#252525] text-white px-5 py-5 z-50">
          <button
            onClick={() => setIsEditBttnActive(false)}
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
          <form className="flex flex-col items-center gap-y-8">
            <h1 className="font-original_surfer text-3xl text-center">
              Edit User
            </h1>
            <div className="w-full flex flex-col gap-y-5 text-sm">
              <div className="flex flex-col">
                <label for="picture" className="w-fit">
                  Picture
                </label>
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label for="first_name" className="w-fit">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder={user?.first_name}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label for="last_name" className="w-fit">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder={user?.last_name}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label for="cin" className="w-fit">
                  CIN
                </label>
                <input
                  type="text"
                  name="cin"
                  id="cin"
                  placeholder={user?.cin}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
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
                  placeholder={user?.email}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                />
              </div>
            </div>

            <button className="w-full h-[50px] text-black bg-white/90 hover:bg-white duration-300 font-original_surfer">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
