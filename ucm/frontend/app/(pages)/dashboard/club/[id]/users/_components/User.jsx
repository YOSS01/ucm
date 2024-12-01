import Image from "next/image";
import Link from "next/link";

// components
import Edit from "./Edit";

export default function User({ item }) {
  return (
    <li>
      <div className="w-full flex justify-center items-center">
        <div className="group w-full max-w-[300px] h-[300px] rounded-3xl border flex flex-col gap-y-3 justify-center items-center relative">
          <div className="size-24 border rounded-full flex justify-center items-center overflow-hidden">
            {item?.picture ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/users/${item?.picture}`}
                alt="Profile User"
                width={500}
                height={500}
                className="w-full h-full object-cover pointer-events-none"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="size-10 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            )}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-original_surfer">{item?.name}</h2>
            <Link href="mailto:" className="text-xs text-gray-500">
              {item?.email}
            </Link>
          </div>
          <h3 className="text-sm text-gray-700 flex items-center gap-x-1">
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
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span className="capitalize">{item?.role}</span>
          </h3>
          <div
            className={`flex items-center gap-x-1 font-poppins text-xs font-light ${
              item?.status === "approved"
                ? "text-green-500"
                : item?.status === "rejected"
                ? "text-red-500"
                : item?.status === "pending"
                ? "text-orange-500"
                : ""
            }`}
          >
            <div
              className={`size-[6px] rounded-full ${
                item?.status === "approved"
                  ? "bg-green-500"
                  : item?.status === "rejected"
                  ? "bg-red-500"
                  : item?.status === "pending"
                  ? "bg-orange-500"
                  : ""
              }`}
            />
            <span className="capitalize">{item?.status}</span>
          </div>
          {item?.role !== "president" && (
            <div className="absolute top-3 right-3 w-full flex justify-end items-center gap-x-1">
              <Edit user={item} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
