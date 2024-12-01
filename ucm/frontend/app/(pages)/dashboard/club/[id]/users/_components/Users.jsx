"use client";
import { useState, useEffect } from "react";

// components
import User from "./User";

export default function Users({ data }) {
  const [users, setUsers] = useState(data);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("none");

  useEffect(() => {
    setUsers(
      data?.filter((user) => {
        const matchesSearch = user?.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStatus =
          status === "none" ||
          user?.status.toLowerCase() === status.toLowerCase();
        return matchesSearch && matchesStatus;
      })
    );
  }, [search, status, data]);

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
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex items-center gap-x-1"
          >
            <div className="relative">
              <select
                defaultValue="none"
                className="w-fit text-sm border rounded-lg ps-3 pe-8 py-1 outline-none appearance-none cursor-pointer relative bg-transparent z-10"
                value={status}
                onChange={({ target }) => setStatus(target.value)}
              >
                <option value="none" disabled>
                  Status
                </option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 absolute top-1/2 -translate-y-1/2 right-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
            {status !== "none" && (
              <button
                onClick={() => setStatus("none")}
                type="button"
                className="text-black/70"
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
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            )}
          </form>
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
