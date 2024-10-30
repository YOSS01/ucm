import Image from "next/image";
import Link from "next/link";

// data
const events = [
  {
    title: "Tech Innovation Hackathon",
    location: "San Francisco, CA",
    date: "2024-11-15",
    image:
      "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Cultural Diversity Night",
    location: "New York, NY",
    date: "2024-12-05",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Startup Pitch Competition",
    location: "Austin, TX",
    date: "2025-01-10",
    image:
      "https://images.unsplash.com/photo-1560523160-754a9e25c68f?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Open Mic Night: Talent Showcase",
    location: "Los Angeles, CA",
    date: "2025-01-22",
    image:
      "https://images.unsplash.com/photo-1692552950929-395ee3797684?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Game Development Jam",
    location: "Chicago, IL",
    date: "2025-02-07",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Debate Tournament: Environmental Policy Edition",
    location: "Boston, MA",
    date: "2024-12-18",
    image:
      "https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Events() {
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

      {/* Events */}
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex justify-between items-center bg-white py-2">
          <h1 className="font-medium">Events ({events?.length})</h1>
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
          {events?.map((item, key) => (
            <li key={key}>
              <div className="w-full flex justify-center items-center">
                <div className="group w-full max-w-[300px] h-[300px] rounded-3xl border flex flex-col justify-start items-center overflow-hidden">
                  <div className="w-full h-1/2 overflow-hidden">
                    <Image
                      src={item?.image}
                      alt="Profile User"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <div className="w-full h-1/2 flex flex-col justify-between items-center gap-y-3 p-3 text-sm">
                    <h2 className="font-original_surfer text-center line-clamp-2">
                      {item?.title}
                    </h2>
                    <div className="w-full flex flex-col gap-y-1 text-xs text-gray-600">
                      <span>
                        Location:{" "}
                        <span className="text-black font-medium">
                          {item?.location}
                        </span>
                      </span>
                      <span>
                        Date:{" "}
                        <span className="text-black font-medium">
                          {item?.date}
                        </span>
                      </span>
                    </div>
                    <div className="w-full flex justify-end items-center gap-x-1">
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
