import Link from "next/link";
import Image from "next/image";

import { getUser } from "@/app/_lib/dal";

// Fetch Statistics
const getStatistics = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/club-statistics/${id}`
    );

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default async function Dashboard({ params }) {
  const result = await getStatistics(params.id);
  const user = await getUser();

  const statistics = [
    {
      title: "Club Members",
      value: result?.statistics?.total_members,
      color: "text-green-500",
      icon: (
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
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Total Requests",
      value: result?.statistics?.total_requests,
      color: "text-orange-500",
      icon: (
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
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
      ),
    },
    {
      title: "Total Events",
      value: result?.statistics?.total_events,
      color: "text-gray-500",
      icon: (
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
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="h-full w-full flex flex-col gap-y-24 p-10">
      <AdminCard user={user} />
      <div className="grid grid-cols-3 gap-x-10">
        {statistics?.map((item, key) => (
          <Card key={key} item={item} />
        ))}
      </div>
    </div>
  );
}

function AdminCard({ user }) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="size-14 rounded-full border flex justify-center items-center overflow-hidden">
        {user?.picture ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/users/${user?.picture}`}
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
            className="size-5 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        )}
      </div>
      <div className="flex flex-col">
        <h1 className="font-original_surfer">
          {user?.first_name + " " + user?.last_name}{" "}
          <span className="font-poppins text-xs text-gray-400 italic">
            /President
          </span>
        </h1>
        <Link
          href="mailto:alahyane.yo@gmail.com"
          className="w-fit text-xs text-gray-400"
        >
          {user?.email}
        </Link>
      </div>
    </div>
  );
}

function Card({ item }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full h-[120px] flex flex-col justify-between gap-y-2 bg-slate-50/50 shadow-[0_0_16px_2px_rgba(0,0,0,0.1)] rounded-xl p-5">
        <div className="flex items-center gap-x-2 text-black/50">
          {item?.icon}
          <span className="text-xs font-medium">{item?.title}</span>
        </div>
        <span
          className={`text-4xl ${item?.color} font-original_surfer font-black`}
        >
          {item?.value}
        </span>
      </div>
    </div>
  );
}

export const revalidate = 0;
