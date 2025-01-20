"use client";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addClub } from "@/app/_actions/clubs";
import toast from "react-hot-toast";

const generateSlug = (text) => {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^a-z0-9 -]/g, "") // Remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
};

export default function Add() {
  const [isAddBttnActive, setIsAddBttnActive] = useState(false);
  const [state, action] = useFormState(addClub, undefined);

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
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
        setUsers(result);
        return;
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

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
              Add Club
            </h1>
            <div className="w-full flex flex-col gap-y-5 text-sm max-h-[400px] overflow-y-auto visible-scrollbar pe-3">
              <div className="w-full flex gap-x-3">
                <div className="w-full flex flex-col">
                  <label htmlFor="logo" className="w-fit">
                    Logo
                  </label>
                  <input
                    type="file"
                    name="logo"
                    id="logo"
                    className="w-full outline-none border-b py-2 bg-transparent focus:border-white file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-xs
                  file:bg-white/80 file:text-black
                  hover:file:bg-white file:duration-300"
                  />
                  {state?.errors?.logo && (
                    <p className="text-red-500 text-xs">{state.errors.logo}</p>
                  )}
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="background" className="w-fit">
                    Background
                  </label>
                  <input
                    type="file"
                    name="background"
                    id="background"
                    className="w-full outline-none border-b py-2 bg-transparent focus:border-white file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-xs
                  file:bg-white/80 file:text-black
                  hover:file:bg-white file:duration-300"
                  />
                  {state?.errors?.background && (
                    <p className="text-red-500 text-xs">
                      {state.errors.background}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="president" className="w-fit">
                  President
                </label>
                <select
                  name="presidentID"
                  id="president"
                  className="outline-none border-b py-2 bg-transparent focus:border-white cursor-pointer"
                >
                  {users?.map((item, key) => (
                    <option key={key} value={item?.id} className="text-black">
                      {item?.first_name + " " + item?.last_name}
                    </option>
                  ))}
                </select>
                {state?.errors?.presidentID && (
                  <p className="text-red-500 text-xs">
                    {state.errors.presidentID}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="w-fit">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
                {state?.errors?.email && (
                  <p className="text-red-500 text-xs">{state.errors.email}</p>
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
                  value={name}
                  onChange={({ target }) => setName(target.value)}
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
                <label htmlFor="slug" className="w-fit">
                  Slug
                </label>
                <div className="w-full flex items-end gap-x-3">
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    placeholder="Slug"
                    className="w-full outline-none border-b py-2 bg-transparent focus:border-white"
                    value={generateSlug(slug)}
                    onChange={({ target }) => setSlug(target.value)}
                  />
                  <button
                    onClick={() => setSlug(generateSlug(name))}
                    type="button"
                    className="h-[30px] bg-slate-100 text-black/80 px-3 rounded-md text-xs font-medium hover:bg-white hover:text-black duration-300"
                  >
                    Generate
                  </button>
                </div>
                {state?.errors?.slug && (
                  <p className="text-red-500 text-xs">{state.errors.slug}</p>
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
