import Image from "next/image";
import Link from "next/link";

// components
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Sign up",
};

export default function SignUp() {
  return (
    <main className="w-full h-screen flex flex-row items-center">
      <Navbar active="/login" />
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="h-full max-h-[580px] w-full max-w-[500px] flex flex-col justify-between items-center z-40">
          <h1 className="font-original_surfer text-6xl font-black">Sign up</h1>
          <form className="w-full flex flex-col gap-y-5">
            <div className="flex justify-between items-center gap-x-2">
              <div className="w-full flex flex-col gap-y-0">
                <label for="first_name">First Name</label>
                <div className="group w-full relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  <input
                    className="w-full border-b border-solid border-gray-500 focus:border-black outline-none py-2 ps-6 placeholder:text-gray-500 placeholder:font-light"
                    type="text"
                    id="first_name"
                    name=""
                    placeholder="First name"
                    required
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-y-0">
                <label for="last_name">Last name</label>
                <div className="group w-full relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <input
                    className="w-full border-b border-solid border-gray-500 focus:border-black outline-none py-2 ps-6 placeholder:text-gray-500 placeholder:font-light"
                    type="text"
                    id="last_name"
                    name=""
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-0">
              <label for="email">Email</label>
              <div className="w-full relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                  />
                </svg>

                <input
                  className="w-full border-b border-solid border-gray-500 focus:border-black outline-none py-2 px-6 placeholder:text-gray-500 placeholder:font-light"
                  type="email"
                  id="email"
                  name=""
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-0">
              <label for="password">Password</label>
              <div className="w-full relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>

                <input
                  className="w-full border-b border-solid border-gray-500 focus:border-black outline-none py-2 px-6 placeholder:text-gray-500 placeholder:font-light"
                  type="password"
                  id="password"
                  name=""
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-0">
              <label for="confirm_password">Confirm password</label>
              <div className="w-full relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 absolute left-0 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>

                <input
                  className="w-full border-b border-solid border-gray-500 focus:border-black outline-none py-2 px-6 placeholder:text-gray-500 placeholder:font-light"
                  type="password"
                  id="confirm_password"
                  name=""
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <button className="w-full h-[60px] bg-black/80 text-white flex justify-center items-center hover:bg-black duration-300 mt-3">
              Register
            </button>
            <div className="text-xs">
              Already have an account?{" "}
              <Link href="/login" className="text-red-600 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <Image
          src="https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login background"
          width={2000}
          height={1080}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
    </main>
  );
}
