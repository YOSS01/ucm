"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { editUser } from "@/app/_actions/users";

// Toaster
import toast from "react-hot-toast";

export default function Edit({ user }) {
  const [userPic, setUserPic] = useState(
    user?.picture
      ? `${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/users/${user?.picture}`
      : ""
  );
  const [isEditBttnActive, setIsEditBttnActive] = useState(false);
  const [state, action] = useFormState(editUser, undefined);

  useEffect(() => {
    if (state?.response?.status === 500) {
      toast.error(state?.response?.message);
    } else if (state?.response?.status === 200) {
      toast.success(state?.response?.message);
      setIsEditBttnActive(false);
    }
  }, [state]);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsEditBttnActive(true)}
        className="size-6 bg-orange-500/80 text-white flex justify-center items-center rounded text-sm hover:bg-orange-500/100 scale-0 group-hover:scale-100 duration-300"
      >
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
          />
        </svg>
      </button>
      {isEditBttnActive && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-[#252525] text-white px-5 py-5 z-50">
          <button
            onClick={() => setIsEditBttnActive(false)}
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
              Edit User
            </h1>
            <div className="w-full flex flex-col gap-y-5 text-sm max-h-[400px] overflow-y-auto visible-scrollbar">
              <input type="hidden" name="userID" id="userID" value={user?.id} />
              <div className="flex flex-col">
                <label for="picture" className="w-fit">
                  Picture
                </label>
                <div className="w-full flex items-center gap-x-3 border-b">
                  {userPic && (
                    <Image
                      src={userPic}
                      alt="pic"
                      width={100}
                      height={100}
                      className="min-w-10 min-h-10 size-10 rounded-full object-cover border"
                    />
                  )}
                  <input
                    type="file"
                    name="picture"
                    id="picture"
                    className="w-full outline-none py-2 bg-transparent focus:border-white file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-xs
                  file:bg-white/80 file:text-black
                  hover:file:bg-white file:duration-300"
                    onChange={({ target }) =>
                      setUserPic(URL.createObjectURL(target.files[0]))
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label for="first_name" className="w-fit">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder={user?.first_name}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
              </div>
              <div className="flex flex-col">
                <label for="last_name" className="w-fit">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder={user?.last_name}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
              </div>
              <div className="flex flex-col">
                <label for="cin" className="w-fit">
                  CIN
                </label>
                <input
                  type="text"
                  name="cin"
                  id="cin"
                  placeholder={user?.cin}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
              </div>
              <div className="flex flex-col">
                <label for="email" className="w-fit">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={user?.email}
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
              </div>
              <div className="flex flex-col">
                <label for="password" className="w-fit">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="outline-none border-b py-2 bg-transparent focus:border-white"
                />
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
