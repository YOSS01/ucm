"use client";
import { useState, useEffect } from "react";

export default function Add() {
  const [isEditBttnActive, setIsEditBttnActive] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // Fetch Users
    const getClubs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/all-clubs`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          // toast.error("Faild to load clubs!");
          return;
        }

        const result = await response.json();
        setClubs(result);
        return;
      } catch (error) {
        console.error(error);
      }
    };

    getClubs();
  }, []);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsEditBttnActive(true)}
        className="size-7 bg-green-500/80 text-white flex justify-center items-center rounded text-sm hover:bg-green-500/100 duration-300"
      >
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
            d="M12 4.5v15m7.5-7.5h-15"
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
              Add Event
            </h1>
            <div className="w-full flex flex-col gap-y-5 text-sm max-h-[400px] overflow-y-auto visible-scrollbar pe-3">
              <div className="w-full flex flex-col">
                <label htmlFor="picture" className="w-fit">
                  Picture
                </label>
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  className="w-full outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="club" className="w-fit">
                  Club
                </label>
                <select
                  name="club"
                  id="club"
                  className="outline-none border-b py-2 bg-transparent focus:border-white cursor-pointer"
                  required
                >
                  {clubs?.map((item, key) => (
                    <option key={key} value={item?.id} className="text-black">
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="name" className="w-fit">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="w-fit">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description ..."
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="location" className="w-fit">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="datetime" className="w-fit">
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="datetime"
                  id="datetime"
                  placeholder="Date"
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-[50px] text-black bg-white/90 hover:bg-white duration-300 font-original_surfer"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
}
