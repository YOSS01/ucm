import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";
import { cache } from "react";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId, role: session.role };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/user-number/${session.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) return;

    const user = await response.json();

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
