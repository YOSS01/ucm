"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav({ item }) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <Link
      href={item?.href}
      className={`w-full flex justify-start items-center gap-x-2 py-2 rounded-lg ${
        item?.href === pathname
          ? "ps-5 bg-white"
          : "ps-2 hover:bg-white hover:ps-5 duration-300"
      } `}
    >
      {item?.icon}
      {item?.label}
    </Link>
  );
}
