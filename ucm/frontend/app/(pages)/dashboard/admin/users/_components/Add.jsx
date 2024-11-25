"use client";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addUser } from "@/app/_actions/users";
import toast from "react-hot-toast";

export default function Add() {
  const [isAddBttnActive, setIsAddBttnActive] = useState(false);
  const [state, action] = useFormState(addUser, undefined);

  useEffect(() => {
    if (state?.response?.status === 500) {
      toast.error(state?.response?.message);
    } else if (state?.response?.status === 200) {
      toast.success(state?.response?.message);
      setIsAddBttnActive(false);
    }
  }, [state]);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsAddBttnActive(true)}
        className="size-7 bg-green-500/80 text-white flex justify-center items-center rounded text-sm hover:bg-green-500/100 duration-300"
      >
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      {isAddBttnActive && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-[#252525] text-white px-5 py-5 z-50">
          <button
            onClick={() => setIsAddBttnActive(false)}
            type="button"
            className="absolute right-5 top-5 z-[9999]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <form
            action={action}
            className="flex flex-col items-center gap-y-8 text-sm"
            method="POST"
          >
            <h1 className="font-original_surfer text-3xl text-center">
              Add User
            </h1>
            <div className="w-full flex flex-col items-center gap-y-8 pe-2 max-h-[450px] overflow-y-auto visible-scrollbar">
              <div className="w-full flex flex-col gap-y-0">
                <label htmlFor="picture">Picture</label>
                <input
                  className="outline-none border-b py-2 bg-transparent focus:border-white file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-xs
                file:bg-white/80 file:text-black
                hover:file:bg-white file:duration-300"
                  type="file"
                  id="picture"
                  name="picture"
                />
                {state?.errors?.picture && (
                  <p className="text-red-500 text-xs">{state.errors.picture}</p>
                )}
              </div>
              <div className="w-full flex justify-between items-center gap-x-2">
                <div className="w-full flex flex-col gap-y-0">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    className="outline-none border-b py-2 bg-transparent focus:border-white"
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="First name"
                  />
                  {state?.errors?.first_name && (
                    <p className="text-red-500 text-xs">
                      {state.errors.first_name}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-y-0">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    className="outline-none border-b py-2 bg-transparent focus:border-white"
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="First name"
                  />
                  {state?.errors?.last_name && (
                    <p className="text-red-500 text-xs">
                      {state.errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-between items-center gap-x-2">
                <div className="w-full flex flex-col gap-y-0">
                  <label htmlFor="email">Email</label>
                  <input
                    className="outline-none border-b py-2 bg-transparent focus:border-white"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                  {state?.errors?.email && (
                    <p className="text-red-500 text-xs">{state.errors.email}</p>
                  )}
                </div>
                <div className="w-full flex flex-col gap-y-0">
                  <label htmlFor="cin">CIN</label>
                  <input
                    className="outline-none border-b py-2 bg-transparent focus:border-white"
                    type="text"
                    id="cin"
                    name="cin"
                    placeholder="CIN"
                  />
                  {state?.errors?.cin && (
                    <p className="text-red-500 text-xs">{state.errors.cin}</p>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col gap-y-0">
                <label htmlFor="password">Password</label>
                <input
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
                {state?.errors?.password && (
                  <p className="text-red-500 text-xs">
                    {state.errors.password}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-y-0">
                <label htmlFor="confirmPassword">Confrim password</label>
                <input
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                />
                {state?.errors?.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {state.errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <SubmitButton />
          </form>
        </div>
      )}
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="w-full h-[50px] text-black bg-white/90 hover:bg-white duration-300 font-original_surfer"
    >
      Save
    </button>
  );
}
