"use client";
import { useState } from "react";

// Toaster
import toast from "react-hot-toast";

export default function Delete({ id }) {
  const [isDeleteBttnActive, setIsDeleteBttnActive] = useState(false);

  const deleteClub = async (id) => {
    // Delete user logic here
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASE_URL}/deleteClub/${id}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error("Error");
        return;
      } else if (result?.status === "error") {
        toast.error("Failed to delete the club. Please try again.");
        return;
      }

      toast.success("Club has been deleted successfully!");
      setIsDeleteBttnActive(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setIsDeleteBttnActive(true)}
        className="size-6 bg-red-500/80 text-white flex justify-center items-center rounded text-sm hover:bg-red-500/100 scale-0 group-hover:scale-100 duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>

      {isDeleteBttnActive && (
        <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-red-500 text-white px-5 py-5 z-50">
          <div className="flex flex-col items-center gap-y-8">
            <h1 className="font-original_surfer text-3xl text-center">
              Are you sure?
            </h1>
            <p className="max-w-[400px] text-sm text-center">
              Please confirm that you want to permanently remove this club.
            </p>

            <div className="w-full flex gap-x-5">
              <button
                onClick={() => deleteClub(id)}
                className="w-full h-[50px] text-red-500 bg-white/90 hover:bg-white duration-300 font-original_surfer"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsDeleteBttnActive(false)}
                className="w-full h-[50px] text-black bg-white/90 hover:bg-white duration-300 font-original_surfer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
