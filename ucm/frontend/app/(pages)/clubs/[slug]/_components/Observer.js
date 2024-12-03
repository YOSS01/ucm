"use client";
import "@/styles/clubs/observer.css";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Toaster
import toast from "react-hot-toast";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Observer from "gsap/Observer";
gsap.registerPlugin(useGSAP, Observer);

export default function ObserverContainer({
  session,
  club,
  president,
  events,
}) {
  useEffect(() => {
    let sections = document.querySelectorAll(".section"),
      images = document.querySelectorAll(".bg"),
      outerWrappers = gsap.utils.toArray(".outer"),
      innerWrappers = gsap.utils.toArray(".inner"),
      currentIndex = -1,
      wrap = gsap.utils.wrap(0, sections.length),
      animating;

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });
    function gotoSection(index, direction) {
      index = wrap(index); // make sure it's valid
      if (index === currentIndex || animating) return; // return if already at the target section or animating
      if (!outerWrappers[index] || !innerWrappers[index] || !sections[index]) {
        return; // ensure elements exist before trying to animate them
      }
      animating = true;
      let fromTop = direction === -1,
        dFactor = fromTop ? -1 : 1,
        tl = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => (animating = false),
        });
      if (currentIndex >= 0) {
        // The first time this function runs, current is -1
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
          sections[currentIndex],
          { autoAlpha: 0 }
        );
      }
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0
      ).fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);
      currentIndex = index;
    }
    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      onUp: () => !animating && gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
      ignore: ".deadzone",
    });
    gotoSection(0, 1);
  }, []);
  return (
    <>
      <SectionOne logo={club?.logo} name={club?.name} />
      <SectionTwo
        description={club?.description}
        createdAt={club?.created_at}
        events={events}
      />
      <SectionThree session={session} clubID={club?.id} president={president} />
    </>
  );
}

function SectionOne({ logo, name }) {
  return (
    <section className="section first">
      <div className="outer">
        <div className="inner">
          <div className="bg one">
            <div className="flex flex-col items-center gap-y-7 z-10 text-white text-center">
              <div className="size-[150px] bg-white/5 rounded-full flex justify-center items-center p-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/clubs/${logo}`}
                  alt="Logo club"
                  width={500}
                  height={500}
                  className="max-w-full max-h-full object-contain pointer-events-none"
                />
              </div>

              <h1 className="font-original_surfer text-6xl font-black">
                {name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTwo({ description, createdAt, events }) {
  return (
    <section className="section second">
      <div className="outer">
        <div className="inner">
          <div className="bg">
            <div className="w-full h-full flex items-center justify-between mx-[5%] z-10">
              <div className="flex flex-col gap-y-5 text-white">
                <p className="max-w-[500px] text-base">{description}</p>
                <ul className="flex items-center gap-x-3 text-xs">
                  <li>
                    Created At:{" "}
                    <span className="font-semibold">{createdAt}</span>
                  </li>
                  <li>
                    Members: <span className="font-semibold">24</span>
                  </li>
                </ul>
              </div>
              <div className="deadzone h-full max-h-full flex justify-center items-start px-10">
                <ul className="grid grid-cols-2 gap-x-5 mt-32 mb-10">
                  {events?.slice(0, 6)?.map((item, key) => (
                    <li
                      key={key}
                      className={`group w-[280px] h-[170px] skew-x-12 relative opacity-50 hover:opacity-100 duration-300 ${
                        key % 2 !== 0 && "mt-5"
                      }`}
                    >
                      <h3 className="text-white text-start absolute top-1 left-1 text-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 duration-300">
                        {item?.name}
                      </h3>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/events/${item?.picture}`}
                        className="w-full h-full object-cover"
                        alt="event backgorund"
                        width={600}
                        height={500}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionThree({ session, clubID, president }) {
  return (
    <section className="section third">
      <div className="outer">
        <div className="inner">
          <div className="bg">
            <div className="flex flex-col items-center gap-y-7 z-10 text-white text-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/users/${president?.picture}`}
                alt="President Img"
                width={300}
                height={300}
                className="size-[150px] object-cover pointer-events-none rounded-full"
              />
              <div className="flex flex-col items-center gap-y-2">
                <h1 className="font-original_surfer text-xl font-black">
                  {president?.first_name + " " + president?.last_name}{" "}
                  <span className="font-extralight text-white/70 text-sm">
                    /Owner
                  </span>
                </h1>
                <Link
                  href={`mailto:${president?.email}`}
                  className="text-xs text-white/80"
                >
                  {president?.email}
                </Link>
                <Signup session={session} clubID={clubID} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Signup = ({ session, clubID }) => {
  async function handleSignup() {
    if (!session) {
      toast("Please create an account to proceed!", {
        icon: "🔔",
      });
    } else {
      const formData = new FormData();
      formData.append("id_user", session?.userId);
      formData.append("id_club", clubID);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/add-clubmembership`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (!response.ok) {
          toast.error("An error occurred while sending request.");
          return;
        }
        const result = await response.json();
        if (result?.status === "error") {
          toast.error(result?.message);
        } else {
          toast.success(result?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while sending request.");
      }
    }
  }
  return (
    <button
      onClick={handleSignup}
      className="group size-[40px] rounded-full border border-solid border-white flex justify-center items-center mt-5 relative"
    >
      <span className="absolute -bottom-8 text-xs text-nowrap bg-black p-1 rounded text-white/90 scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 duration-300">
        Join the club
      </span>
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
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};
