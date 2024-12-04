"use client";
import { useState, useEffect } from "react";
import Participant from "./Participant";

const data = [
  {
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "approved",
  },
  {
    fullName: "Bob Smith",
    email: "bob.smith@example.com",
    status: "pending",
  },
  {
    fullName: "Charlie Brown",
    email: "charlie.brown@example.com",
    status: "rejected",
  },
  {
    fullName: "Diana Prince",
    email: "diana.prince@example.com",
    status: "approved",
  },
  {
    fullName: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    status: "pending",
  },
];

export default function Participants() {
  const [participants, setParticipants] = useState(data);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setParticipants(
      data?.filter((event) =>
        event?.fullName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);
  return (
    <>
      {/* Search Input */}
      <form onSubmit={(event) => event.preventDefault()} className="w-full">
        <div className="w-full max-w-[350px] relative text-sm">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className="w-full py-3 outline-none border-b border-solid text-black placeholder:text-gray-400 focus:border-black/80"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
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

      {/* Participants */}
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex justify-between items-center bg-white py-2">
          <h1 className="font-medium">Participants ({participants?.length})</h1>
        </div>
        <table className="table-fixed">
          <thead className="border-b border-gray-100">
            <tr className="h-14 font-original_surfer font-bold">
              <th className="px-2 text-start">Full name</th>
              <th className="px-2 text-start">Email</th>
              <th className="px-2 text-start">Request Date</th>
              <th className="px-2"></th>
            </tr>
          </thead>

          <tbody className="text-start text-sm divide-y divide-gray-100">
            {participants?.map((item, key) => (
              <Participant item={item} key={key} index={key} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
