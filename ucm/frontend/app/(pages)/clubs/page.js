// components
import Navbar from "@/components/Navbar";
import Carousel from "./_components/Carousel";

// auth
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";

export const metadata = {
  title: "Clubs",
};

// Fetch Clubs
const getClubs = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/all-clubs`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      console.log("Failed to load Clubs");
      return;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export default async function Clubs() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  const clubs = await getClubs();
  return (
    <main className="w-full h-screen bg-black">
      <Navbar active="/clubs" />
      <Carousel session={session} clubs={clubs} />
    </main>
  );
}
