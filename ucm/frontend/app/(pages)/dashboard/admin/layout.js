import { verifySession } from "@/app/_lib/dal";

// components
import Navbar from "./_components/Navbar";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await verifySession();
  if (session?.role === "admin") {
    return (
      <main className="w-full h-screen flex justify-center items-center overflow-hidden">
        <Navbar />
        {children}
      </main>
    );
  } else {
    redirect("/");
  }
}
