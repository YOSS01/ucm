import Image from "next/image";
import Link from "next/link";

// data
const users = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    picture:
      "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "President",
    status: "Approved",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    picture:
      "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Member",
    status: "Request",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    picture:
      "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Member",
    status: "Approved",
  },
  {
    name: "Diana Prince",
    email: "diana.prince@example.com",
    picture:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Member",
    status: "Approved",
  },
  {
    name: "Evan Martinez",
    email: "evan.martinez@example.com",
    picture:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Vice President",
    status: "Rejected",
  },
  {
    name: "Fiona Green",
    email: "fiona.green@example.com",
    picture:
      "https://images.unsplash.com/photo-1475048975523-705992b13a68?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Member",
    status: "Approved",
  },
  {
    name: "George White",
    email: "george.white@example.com",
    picture:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    role: "Member",
    status: "Rejected",
  },
];

export default function Users() {
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
          {users?.map((item, key) => (
            <li key={key}>
              <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-[300px] h-[300px] rounded-3xl border flex flex-col gap-y-3 justify-center items-center">
                  <div className="size-24 border rounded-full overflow-hidden">
                    <Image
                      src={item?.picture}
                      alt="Profile User"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover pointer-events-none"
                    />
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
                    <span>{item?.role}</span>
                  </h3>
                  <div
                    className={`flex items-center gap-x-1 font-poppins text-xs font-light ${
                      item?.status === "Approved"
                        ? "text-green-500"
                        : item?.status === "Rejected"
                        ? "text-red-500"
                        : item?.status === "Request"
                        ? "text-orange-500"
                        : ""
                    }`}
                  >
                    <div
                      className={`size-[6px] rounded-full ${
                        item?.status === "Approved"
                          ? "bg-green-500"
                          : item?.status === "Rejected"
                          ? "bg-red-500"
                          : item?.status === "Request"
                          ? "bg-orange-500"
                          : ""
                      }`}
                    />
                    <span>{item?.status}</span>
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
