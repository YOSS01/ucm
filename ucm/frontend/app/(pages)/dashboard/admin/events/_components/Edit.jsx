"use client";
import { useState, useEffect } from "react";

export default function Edit({ event }) {
  const [isEditBttnActive, setIsEditBttnActive] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState(event?.date);

  useEffect(() => {
    // Fetch Clubs
    const getClubs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/all-clubs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          // toast.error("Faild to load Clubs!");
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
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-[500px] h-fit bg-[#252525] text-white px-5 py-5 z-50">
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
              Edit Event
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
                  defaultValue={event?.id_club}
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
                  placeholder={event?.name}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="w-fit">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder={event?.description}
                  className="outline-none border-b py-2 bg-transparent focus:border-white placeholder:line-clamp-1"
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
                  placeholder={event?.location}
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
                  placeholder={event?.date}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  required
                  value={date}
                  onChange={({ target }) => setDate(target.value)}
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
