import { verifySession } from "@/app/_lib/dal";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";

// components
import Navbar from "./_components/Navbar";

export default async function RootLayout({ children, params }) {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session) {
    redirect("/login");
  }
  return (
    <main className="w-full h-screen flex justify-center items-center overflow-hidden">
      <Navbar id={params.id} />
      {children}
    </main>
  );
}
