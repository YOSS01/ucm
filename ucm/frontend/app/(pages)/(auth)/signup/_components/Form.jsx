"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/app/_actions/auth";
import toast from "react-hot-toast";

export default function Form() {
  const [state, action] = useFormState(signup, undefined);

  useEffect(() => {
    if (state?.message) toast.error(state?.message);
  }, [state]);
  return (
    <form
      action={action}
      className="w-full max-h-[450px] flex flex-col gap-y-5 overflow-y-auto"
    >
      <div className="flex justify-between items-center gap-x-2">
        <div className="w-full flex flex-col gap-y-0">
          <label htmlFor="first_name">First Name</label>
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
              name="first_name"
              placeholder="First name"
            />
          </div>
          {state?.errors?.first_name && (
            <p className="text-red-500 text-xs">{state.errors.first_name}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-y-0">
          <label htmlFor="last_name">Last name</label>
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
              name="last_name"
              placeholder="Last name"
            />
          </div>
          {state?.errors?.last_name && (
            <p className="text-red-500 text-xs">{state.errors.last_name}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center gap-x-2">
        <div className="w-1/2 flex flex-col gap-y-0">
          <label htmlFor="email">Email</label>
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
              name="email"
              placeholder="Email"
            />
          </div>
          {state?.errors?.email && (
            <p className="text-red-500 text-xs">{state.errors.email}</p>
          )}
        </div>
        <div className="w-1/2 flex flex-col gap-y-0">
          <label htmlFor="cin">CIN</label>
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
              id="cin"
              name="cin"
              placeholder="CIN"
            />
          </div>
          {state?.errors?.cin && (
            <p className="text-red-500 text-xs">{state.errors.cin}</p>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-0">
        <label htmlFor="password">Password</label>
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
            name="password"
            placeholder="Password"
          />
        </div>
        {state?.errors?.password && (
          <p className="text-red-500 text-xs">{state.errors.password}</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-y-0">
        <label htmlFor="confirm_password">Confirm password</label>
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
            name="confirmPassword"
            placeholder="Confirm password"
          />
        </div>
        {state?.errors?.confirmPassword && (
          <p className="text-red-500 text-xs">{state.errors.confirmPassword}</p>
        )}
      </div>

      <SubmitButton />
      <div className="text-xs">
        Already have an account?{" "}
        <Link href="/login" className="text-red-600 hover:underline">
          Sign in
        </Link>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full min-h-[60px] bg-black/80 text-white flex justify-center items-center hover:bg-black duration-300 mt-3"
    >
      Register
    </button>
  );
}
