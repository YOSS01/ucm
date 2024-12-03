"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { participateIn } from "@/app/_actions/event";

// Toaster
import toast from "react-hot-toast";

async function userParticipateIn(id_event, userId) {
  try {
    const data = {
      id_visitor: userId,
      id_event: id_event,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/add-event-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      toast.error("An error occurred while participate in.");
      return;
    } else if (result?.status === "error") {
      toast.error(result?.message);
      return;
    }

    toast.success("You have successfully participated in.");
    return;
  } catch (error) {
    console.error(error.message);
    toast.error("An error occurred while participate in.");
    return;
  }
}

export default function Event({ item, session }) {
  const [isSeeMoreBttnActive, setIsSeeMoreBttnActive] = useState(false);
  const [isGetInBttnActive, setIsGetInBttnActive] = useState(false);

  return (
    <div className="w-full h-screen text-white relative">
      <div className="absolute bottom-10 left-10 z-10 flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl font-original_surfer font-black">
            {item?.name}
          </h1>
          <p className="max-w-[500px] text-sm font-light line-clamp-4">
            {item?.description}
          </p>
        </div>
        <div className="text-sm flex items-center gap-x-5">
          <button
            onClick={() => {
              setIsSeeMoreBttnActive(false);
              !session
                ? setIsGetInBttnActive(true)
                : userParticipateIn(item?.id, session?.userId);
            }}
            className="h-[45px] border-2 border-solid border-white rounded-full px-7 bg-white text-black hover:bg-transparent hover:text-white duration-300"
          >
            Get in
          </button>
          <button
            onClick={() => {
              setIsGetInBttnActive(false);
              setIsSeeMoreBttnActive(true);
            }}
            className="h-[45px] border-2 border-solid border-white rounded-full px-7 hover:bg-white hover:text-black duration-300"
          >
            See more
          </button>
        </div>
      </div>
      {isSeeMoreBttnActive && (
        <SeeMore
          item={item}
          setIsSeeMoreBttnActive={setIsSeeMoreBttnActive}
          setIsGetInBttnActive={setIsGetInBttnActive}
          session={session}
        />
      )}
      {isGetInBttnActive && (
        <GetIn
          setIsGetInBttnActive={setIsGetInBttnActive}
          id_event={item?.id}
        />
      )}

      {/* Background */}
      <>
        <Image
          src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/events/${item?.picture}`}
          alt="Event Background"
          width={2070}
          height={1080}
          className="absolute z-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute w-full h-full bg-black/50 z-[1]"></div>
      </>
    </div>
  );
}

function SeeMore({
  item,
  setIsSeeMoreBttnActive,
  setIsGetInBttnActive,
  session,
}) {
  const [club, setClub] = useState({});

  useEffect(() => {
    // Fetch Users
    const getClub = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/club/${item?.id_club}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          // toast.error("Faild to load club!");
          return;
        }

        const result = await response.json();
        setClub(result);
        return;
      } catch (error) {
        console.error(error);
      }
    };

    getClub();
  }, []);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-white text-black px-5 pt-14 pb-7 z-50">
      <button
        onClick={() => setIsSeeMoreBttnActive(false)}
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
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-original_surfer">{item?.name}</h1>
          <p className="text-xs text-black/80 text-justify">
            {item?.description}
          </p>
        </div>

        <div className="flex flex-col gap-y-2 text-sm text-black/80">
          <div className="flex gap-x-2">
            <span>Location:</span>
            <span className="text-black font-medium">{item?.location}</span>
          </div>
          <div className="flex gap-x-2">
            <span>Date:</span>
            <span className="text-black font-medium">{item?.date}</span>
          </div>
          <div className="flex gap-x-2">
            <span>Organized by:</span>
            <Link
              href={`/clubs/${club?.slug}`}
              className="text-black font-medium font-original_surfer flex items-center gap-x-1"
            >
              {club?.name}{" "}
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
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
          </div>
        </div>

        <button
          onClick={() => {
            !session
              ? setIsGetInBttnActive(true)
              : userParticipateIn(item?.id, session?.userId);
            setIsSeeMoreBttnActive(false);
          }}
          className="w-full h-[50px] bg-black/70 hover:bg-black duration-300 text-white mt-10"
        >
          Get in
        </button>
      </div>
    </div>
  );
}

function GetIn({ setIsGetInBttnActive, id_event }) {
  const [state, action, pending] = useFormState(participateIn, undefined);

  useEffect(() => {
    if (state?.response) {
      state?.response?.status === 200
        ? toast.success(state?.response?.message) && setIsGetInBttnActive(false)
        : state?.response?.status === 500 &&
          toast.error(state?.response?.message);
    }
  }, [state]);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[500px] h-fit bg-white text-black px-5 pt-14 pb-7 z-50">
      <button
        onClick={() => setIsGetInBttnActive(false)}
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
      <form action={action} method="POST" className="flex flex-col gap-y-10">
        <h1 className="font-original_surfer text-3xl text-center">
          Participate in
        </h1>
        <div className="flex flex-col gap-y-5 text-sm">
          <input type="hidden" value={id_event} name="id_event" id="" />
          <div className="flex flex-col">
            <label for="name" className="w-fit">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Type your name here..."
              className="outline-none border-b py-2 focus:border-black"
            />
            {state?.errors?.name && (
              <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label for="email" className="w-fit">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Type your email here..."
              className="outline-none border-b py-2 focus:border-black"
            />
            {state?.errors?.email && (
              <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>
            )}
          </div>
        </div>

        <button
          disabled={pending}
          className="w-full h-[50px] text-white bg-black/80 hover:bg-black duration-300 font-original_surfer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
