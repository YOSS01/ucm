"use client";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addEvent } from "@/app/_actions/event";
import toast from "react-hot-toast";

export default function Add({ id }) {
  const [isAddBttnActive, setIsAddBttnActive] = useState(false);
  const [state, action] = useFormState(addEvent, undefined);

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
            method="POST"
            className="flex flex-col items-center gap-y-8"
          >
            <h1 className="font-original_surfer text-3xl text-center">
              Add Event
            </h1>
            <div className="w-full flex flex-col gap-y-5 text-sm max-h-[400px] overflow-y-auto visible-scrollbar pe-3">
              <input type="hidden" name="clubID" id="clubID" value={id} />
              <div className="w-full flex flex-col">
                <label htmlFor="picture" className="w-fit">
                  Picture
                </label>
                <input
                  type="file"
                  name="picture"
                  id="picture"
                  className="w-full outline-none border-b py-2 bg-transparent focus:border-white file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-xs
                file:bg-white/80 file:text-black
                hover:file:bg-white file:duration-300"
                />
                {state?.errors?.picture && (
                  <p className="text-red-500 text-xs">{state.errors.picture}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="name" className="w-fit">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
                {state?.errors?.name && (
                  <p className="text-red-500 text-xs">{state.errors.name}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="w-fit">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description ..."
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
                {state?.errors?.description && (
                  <p className="text-red-500 text-xs">
                    {state.errors.description}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="location" className="w-fit">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
                {state?.errors?.location && (
                  <p className="text-red-500 text-xs">
                    {state.errors.location}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="datetime" className="w-fit">
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="datetime"
                  id="datetime"
                  placeholder="Date"
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
                {state?.errors?.datetime && (
                  <p className="text-red-500 text-xs">
                    {state.errors.datetime}
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
