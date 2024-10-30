import Image from "next/image";
import Link from "next/link";

// images
import oxford_logo from "@/public/images/clubs/Oxford_University_Exploration_Club_Logo.png";
import robotics_logo from "@/public/images/clubs/robotics_logo.png";
import photography_logo from "@/public/images/clubs/photography_logo.png";

// data
const clubs = [
  {
    logo: oxford_logo,
    title: "EcoAction Club",
    email: "ecoaction.club@gmail.com",
  },
  {
    logo: robotics_logo,
    title: "Robotics and Engineering Club",
    email: "robotics_engineering.club@gmail.com",
  },
  {
    logo: photography_logo,
    title: "Photography and Film Club",
    email: "photography_film.club@gmail.com",
  },
];

export default function Clubs() {
  return (
    <div className="h-full w-full flex flex-col gap-y-28 p-10 overflow-y-auto">
      {/* Search Input */}
      <form className="w-full">
        <div className="w-full max-w-[350px] relative text-sm">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className="w-full py-3 outline-none border-b border-solid text-black placeholder:text-gray-400"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4 absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </form>

      {/* Clubs */}
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex justify-between items-center bg-white py-2">
          <h1 className="font-medium">Clubs ({clubs?.length})</h1>
          <button
            type="button"
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
        </div>

        <ul className="w-full grid grid-cols-4 gap-5">
          {clubs?.map((item, key) => (
            <li key={key}>
              <div className="w-full flex justify-center items-center">
                <div className="group w-full max-w-[300px] h-[300px] rounded-3xl border flex flex-col gap-y-3 justify-center items-center p-2 relative">
                  <div className="size-24 border rounded-full p-2">
                    <Image
                      src={item?.logo}
                      alt="Club Logo"
                      width={500}
                      height={500}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <h2 className="font-original_surfer">{item?.title}</h2>
                    <Link href="mailto:" className="text-xs text-gray-500">
                      {item?.email}
                    </Link>
                  </div>
                  <div className="absolute top-3 right-3 w-full flex justify-end items-center gap-x-1">
                    <button
                      type="button"
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
                    <button
                      type="button"
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
                    <button
                      type="button"
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
