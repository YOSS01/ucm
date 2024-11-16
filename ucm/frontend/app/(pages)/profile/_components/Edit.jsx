"use client";
import { useState } from "react";

export default function Edit() {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  return (
    <>
      <button
        className="absolute right-5 top-3 group w-fit h-fit cursor-pointer z-[60]"
        onClick={() => {
          setIsEditFormOpen((prev) => !prev);
        }}
      >
        {isEditFormOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
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
        )}
      </button>
      {isEditFormOpen && (
        <div className="absolute inset-0 w-full h-full bg-white flex justify-center items-center p-10 z-50">
          <form
            method="post"
            className="w-full h-full flex flex-col justify-between pt-10"
          >
            <div className="flex flex-col gap-y-5">
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="first_name">First name</label>
                <div className="flex flex-col gap-y-1">
                  <div className="group w-full relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>

                    <input
                      className="w-full border-b border-solid border-gray-500 focus:border-black outline-none py-2 px-6 placeholder:text-gray-500 placeholder:font-light text-sm"
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="Jack"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="last_name">Last name</label>
                <div className="flex flex-col gap-y-1">
                  <div className="group w-full relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>

                    <input
                      className="w-full border-b border-solid border-gray-500 focus:border-black outline-none py-2 px-6 placeholder:text-gray-500 placeholder:font-light text-sm"
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Finnigan"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="">Email</label>
                <div className="flex flex-col gap-y-1">
                  <div className="group w-full relative cursor-not-allowed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>

                    <div className="w-full border-b border-solid border-gray-500 py-2 px-6 text-gray-500 bg-gray-50 text-sm">
                      <span>userexample@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-1">
                <label htmlFor="">CIN</label>
                <div className="flex flex-col gap-y-1">
                  <div className="group w-full relative cursor-not-allowed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>

                    <div className="w-full border-b border-solid border-gray-500 py-2 px-6 text-gray-500 bg-gray-50 text-sm">
                      <span>JM90150</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full h-[60px] bg-green-600/80 hover:bg-green-600/100 text-white duration-300">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
