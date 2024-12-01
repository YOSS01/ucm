import Image from "next/image";
import Link from "next/link";

// components
import Edit from "./_components/Edit";

// Fetch Users
const getUsers = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/club-users/${id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    return result?.users;
  } catch (error) {
    console.error(error);
  }
};

export default async function Users({ params }) {
  const id = params.id;
  const data = await getUsers(id);

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

      {/* Users */}
      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full flex justify-between items-center bg-white py-2">
          <h1 className="font-medium">Users ({data?.length})</h1>
          <form>
            <div className="relative">
              <select
                defaultValue="none"
                className="w-fit text-sm border rounded-lg ps-3 pe-8 py-1 outline-none appearance-none cursor-pointer relative bg-transparent z-10"
              >
                <option value="none" disabled>
                  Status
                </option>
                <option value="approved">Approved</option>
                <option value="request">Request</option>
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
          </form>
        </div>

        <ul className="w-full grid grid-cols-4 gap-5">
          {data?.map((item, key) => (
            <li key={key}>
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
          ))}
        </ul>
      </div>
    </div>
  );
}

export const revalidate = 0;
