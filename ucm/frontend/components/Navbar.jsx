import Image from "next/image";
import Link from "next/link";

// images
import logo from "@/public/images/logo-uiz.png";

const nav = [
  {
    label: "Admin space",
    href: "/login/admin",
  },
  {
    label: "Clubs",
    href: "/clubs",
  },
  {
    label: "Events",
    href: "/",
  },
  {
    label: "Join us",
    href: "/login",
  },
];

export default function Navbar({ active }) {
  return (
    <div className="w-full h-14 fixed top-10 flex justify-between items-center px-10 z-30 text-white">
      <div>
        <Link href="/">
          <Image
            src={logo}
            className="size-14 object-contain pointer-events-none"
            alt="uiz logo"
          />
        </Link>
      </div>

      <ul className="flex items-center gap-x-16 text-sm">
        {nav?.map((item, key) => (
          <li key={key}>
            <Link
              href={item?.href}
              className={`relative before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 ${
                active === item?.href
                  ? "before:w-full"
                  : "before:w-0 hover:before:w-full before:duration-300"
              } before:h-[.5px] before:bg-white`}
            >
              {item?.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
