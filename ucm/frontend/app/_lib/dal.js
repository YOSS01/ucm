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

  return { isAuth: true, userId: session.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    //   const data = await db.query.users.findMany({
    //     where: eq(users.id, session.userId),
    //     // Explicitly return the columns you need rather than the whole user object
    //     columns: {
    //       id: true,
    //       name: true,
    //       email: true,
    //     },
    //   })

    const user = {
      id: 28,
      name: "test",
      email: "test@gmail.com",
    };

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
