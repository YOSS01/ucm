"use client";
import "@/styles/clubs/observer.css";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// gsap
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Observer from "gsap/Observer";
gsap.registerPlugin(useGSAP, Observer);

// images
import oxford_logo from "@/public/images/clubs/Oxford_University_Exploration_Club_Logo.png";

// data
const events = [
  {
    title: "Tech Innovation Hackathon",
    image:
      "https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Cultural Diversity Night",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Startup Pitch Competition",
    image:
      "https://images.unsplash.com/photo-1560523160-754a9e25c68f?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Open Mic Night: Talent Showcase",
    description:
      "Open Mic Night is a platform for students to showcase their talents in front of a supportive audience. Whether it's singing, poetry, stand-up comedy, spoken word, or playing an instrument, everyone is welcome to perform. This casual event is perfect for students who want to express themselves creatively or enjoy a fun, relaxing evening with friends.",
    image:
      "https://images.unsplash.com/photo-1692552950929-395ee3797684?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Game Development Jam",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Debate Tournament: Environmental Policy Edition",
    image:
      "https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Soon ...",
    image:
      "https://images.unsplash.com/photo-1661697522368-f09157f69b6c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Soon ...",
    image:
      "https://images.unsplash.com/photo-1664575599736-c5197c684128?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Soon ...",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function ObserverContainer() {
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
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </>
  );
}

function SectionOne() {
  return (
    <section className="section first">
      <div className="outer">
        <div className="inner">
          <div className="bg one">
            <div className="flex flex-col items-center gap-y-7 z-10 text-white text-center">
              <div className="size-[150px] bg-white/5 rounded-full flex justify-center items-center p-2">
                <Image
                  src={oxford_logo}
                  alt="Logo club"
                  className="max-w-full max-h-full object-contain pointer-events-none"
                />
              </div>

              <h1 className="font-original_surfer text-6xl font-black">
                Photography and Film Club
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTwo() {
  return (
    <section className="section second">
      <div className="outer">
        <div className="inner">
          <div className="bg">
            <div className="w-full h-full flex items-center justify-between mx-[5%] z-10">
              <div className="flex flex-col gap-y-5 text-white">
                <p className="max-w-[500px] text-base">
                  The Photography and Film Club brings together students
                  passionate about visual storytelling through photography and
                  filmmaking. The club focuses on enhancing students' creative
                  and technical skills by exploring various genres and styles.
                  Whether you're a beginner or an experienced photographer or
                  filmmaker, the club offers a space to collaborate, learn, and
                  showcase your work.
                </p>
                <ul className="flex items-center gap-x-3 text-xs">
                  <li>
                    Created At: <span className="font-semibold">08/2023</span>
                  </li>
                  <li>
                    Members: <span className="font-semibold">24</span>
                  </li>
                </ul>
              </div>
              <div className="deadzone h-full max-h-full flex justify-center items-start px-10 overflow-y-auto">
                <ul className="grid grid-cols-2 gap-x-5 mt-32 mb-10">
                  {events?.map((item, key) => (
                    <li
                      key={key}
                      className={`group w-[280px] h-[170px] skew-x-12 relative opacity-50 hover:opacity-100 duration-300 ${
                        key % 2 !== 0 && "mt-5"
                      }`}
                    >
                      <h3 className="text-white text-start absolute top-1 left-1 text-xs opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 duration-300">
                        {item?.title}
                      </h3>
                      <Image
                        src={item?.image}
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

function SectionThree() {
  return (
    <section className="section third">
      <div className="outer">
        <div className="inner">
          <div className="bg">
            <div className="flex flex-col items-center gap-y-7 z-10 text-white text-center">
              <Image
                src="https://images.unsplash.com/photo-1517630800677-932d836ab680?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="President Img"
                width={300}
                height={300}
                className="size-[150px] object-cover pointer-events-none rounded-full"
              />
              <div className="flex flex-col items-center gap-y-2">
                <h1 className="font-original_surfer text-xl font-black">
                  Taylor Wright{" "}
                  <span className="font-extralight text-white/70 text-sm">
                    /Owner
                  </span>
                </h1>
                <Link
                  href="mailto:clubexample@gmail.com"
                  className="text-xs text-white/80"
                >
                  clubexample@gmail.com
                </Link>
                <button className="group size-[40px] rounded-full border border-solid border-white flex justify-center items-center mt-5 relative">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
