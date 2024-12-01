import { verifySession } from "@/app/_lib/dal";
import { redirect } from "next/navigation";

// components
import Navbar from "./_components/Navbar";

export default async function RootLayout({ children, params }) {
  const session = await verifySession();

  if (session?.role === "user") {
    return (
      <main className="w-full h-screen flex justify-center items-center overflow-hidden">
        <Navbar id={params.id} />
        {children}
      </main>
    );
  } else {
    redirect("/");
  }
}
