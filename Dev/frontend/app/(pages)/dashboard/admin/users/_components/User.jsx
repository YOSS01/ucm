import Image from "next/image";
import Link from "next/link";

// components
import View from "./View";
import Edit from "./Edit";
import Delete from "./Delete";

export default function User({ item }) {
  return (
    <li>
      <div className="w-full flex justify-center items-center">
        <div className="group w-full max-w-[300px] h-[300px] rounded-3xl border flex flex-col gap-y-3 justify-center items-center p-2 relative">
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
            <h2 className="font-original_surfer">
              {item?.first_name + " " + item?.last_name}
            </h2>
            <Link
              href={`mailto:${item?.email}`}
              className="text-xs text-gray-500"
            >
              {item?.email}
            </Link>
          </div>
          <div className="absolute top-3 right-3 w-full flex justify-end items-center gap-x-1">
            <View user={item} />
            <Edit user={item} />
            <Delete id={item?.id} />
          </div>
        </div>
      </div>
    </li>
  );
}
