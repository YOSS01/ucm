"use client";
import { useState, useEffect } from "react";

// components
import Add from "./Add";
import User from "./User";

export default function Users({ data }) {
  const [users, setUsers] = useState(data);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setUsers(
      data?.filter((user) =>
        `${user?.first_name} ${user?.last_name}`
          ?.toLowerCase()
          .includes(search.toLowerCase())
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

      {/* Users */}
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex justify-between items-center bg-white py-2">
          <h1 className="font-medium">Users ({users?.length})</h1>
          <Add />
        </div>

        <ul className="w-full grid grid-cols-4 gap-5">
          {users?.map((item, key) => (
            <User item={item} key={key} />
          ))}
        </ul>
      </div>
    </>
  );
}
