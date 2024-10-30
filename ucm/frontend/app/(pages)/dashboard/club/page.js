import Link from "next/link";
import Image from "next/image";

const statistics = [
  {
    title: "Club Members",
    value: "23",
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
    value: "54",
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
    value: "5",
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

export default function Dashboard() {
  return (
    <div className="h-full w-full flex flex-col gap-y-24 p-10">
      <AdminCard />
      <div className="grid grid-cols-3 gap-x-10">
        {statistics?.map((item, key) => (
          <Card key={key} item={item} />
        ))}
      </div>
    </div>
  );
}

function AdminCard() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="size-14 rounded-full border overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517630800677-932d836ab680?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user profile"
          width={400}
          height={400}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div className="flex flex-col">
        <h1 className="font-original_surfer">
          Taylor Wright{" "}
          <span className="font-poppins text-xs text-gray-400 italic">
            /President
          </span>
        </h1>
        <Link
          href="mailto:alahyane.yo@gmail.com"
          className="text-xs text-gray-400"
        >
          wright.taylor@example.com
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
