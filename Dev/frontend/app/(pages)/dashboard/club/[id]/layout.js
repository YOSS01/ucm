import { getUser, verifySession } from "@/app/_lib/dal";
import { notFound } from "next/navigation";

// components
import Navbar from "./_components/Navbar";

// Verification Admin Club
const verifyAdmin = async (clubID) => {
  const session = await verifySession();
  const user = await getUser();
  return (
    user?.clubs?.some(
      (club) => club.club_id === clubID && club.role === "president"
    ) && session?.role === "user"
  );
};

export default async function RootLayout({ children, params }) {
  const authorization = await verifyAdmin(params.id);
  if (authorization) {
    return (
      <main className="w-full h-screen flex justify-center items-center overflow-hidden">
        <Navbar id={params.id} />
        {children}
      </main>
    );
  } else {
    return notFound();
  }
}
