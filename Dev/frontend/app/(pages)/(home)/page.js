// components
import Navbar from "@/components/Navbar";
import Carousel from "./_components/Carousel";

// auth
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";

export const metadata = {
  title: "Home",
};

// Fetch Events
const getEvents = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/all-events`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      console.log("Failed to load Events");
      return;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const events = await getEvents();
  return (
    <main className="w-full h-screen bg-black">
      <Navbar active="/" />
      <Carousel session={session} events={events} />
    </main>
  );
}
