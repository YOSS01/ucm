// components
import Navbar from "@/components/Navbar";
import Observer from "./_components/Observer";

// auth
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";

// Redirect
import { notFound } from "next/navigation";

export const metadata = {
  title: "EcoAction Club",
};

// Fetch Club
const getClub = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/club-slug/${slug}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      console.log("Failed to load Club");
      return;
    }
    const result = await response.json();
    if (result?.status === "error") return;
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default async function Club({ params }) {
  const slug = params.slug;
  const data = await getClub(slug);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (data) {
    return (
      <div className="w-full h-screen bg-black">
        <Navbar />
        <Observer
          club={data?.club}
          president={data?.president}
          events={data?.events}
          members_count={data?.members_count}
          session={session}
        />
      </div>
    );
  } else {
    return notFound();
  }
}

export const revalidate = 0;
