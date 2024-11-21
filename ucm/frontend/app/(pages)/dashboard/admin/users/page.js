import Image from "next/image";
import Link from "next/link";

// Toaster
// import toast from "react-hot-toast";

// components
import Add from "./_components/Add";
import View from "./_components/View";
import Edit from "./_components/Edit";
import Delete from "./_components/Delete";

// Fetch Users
const getUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/all-users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // toast.error("Faild to load users!");
      return;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default async function Users() {
  const users = await getUsers();

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
          <h1 className="font-medium">Users ({users?.length})</h1>
          <Add />
        </div>

        <ul className="w-full grid grid-cols-4 gap-5">
          {users?.map((item, key) => (
            <li key={key}>
              <div className="w-full flex justify-center items-center">
                <div className="group w-full max-w-[300px] h-[300px] rounded-3xl border flex flex-col gap-y-3 justify-center items-center p-2 relative">
                  <div className="size-24 border rounded-full flex justify-center items-center overflow-hidden">
                    {item?.picture ? (
                      <Image
                        src={item?.picture}
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
          ))}
        </ul>
      </div>
    </div>
  );
}

export const revalidate = 0;
