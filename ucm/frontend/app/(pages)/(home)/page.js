// components
import Navbar from "@/components/Navbar";
import Carousel from "./_components/Carousel";

// auth
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return (
    <main className="w-full h-screen bg-black">
      <Navbar active="/" />
      <Carousel session={session} />
    </main>
  );
}
