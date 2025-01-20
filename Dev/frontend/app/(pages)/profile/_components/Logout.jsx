"use client";
import { logout } from "@/app/_actions/auth";

export default function Logout() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="w-full flex justify-center items-center">
      <button
        onClick={handleLogout}
        className="w-fit flex items-center gap-x-1 text-sm text-red-500 hover:text-red-600 duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 scale-x-[-1]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
        <span>logout</span>
      </button>
    </div>
  );
}
