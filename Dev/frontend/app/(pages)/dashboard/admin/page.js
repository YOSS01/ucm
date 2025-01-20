import Link from "next/link";
import Image from "next/image";

// images
import logo from "@/public/images/logo-uiz.png";

// Fetch Statistics
const getStatistics = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/statistics`
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

export default async function Dashboard() {
  const result = await getStatistics();

  const statistics = [
    {
      title: "Total Clubs",
      value: result?.clubs,
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
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      ),
    },
    {
      title: "Total Users",
      value: result?.users,
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
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Total Events",
      value: result?.events,
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
      <Image
        src={logo}
        className="size-14 object-contain pointer-events-none"
        alt="uiz logo"
      />
      <div className="flex flex-col">
        <h1 className="font-original_surfer">Administrator</h1>
        <Link
          href="mailto:alahyane.yo@gmail.com"
          className="text-xs text-gray-400"
        >
          administrator@uiz.ac.ma
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
