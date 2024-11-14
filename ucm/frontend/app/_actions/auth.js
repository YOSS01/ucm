"use server";
import { SignupFormSchema, SigninFormSchema } from "@/app/_lib/definitions";
import { createSession, deleteSession } from "@/app/_lib/session";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export async function signup(state, formData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    cin: "testtest",
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      toast.error("An error occurred. Please try again.");
      return;
    } else if (result?.status === "error") {
      result?.errors?.email
        ? toast.error("Email is already taken!")
        : toast.error(result?.message);

      return;
    }
  } catch (error) {
    console.error(error.message);
  }

  // 4. Create user session
  await createSession(28);

  // 5. Redirect user
  redirect("/profile");
}

export async function signin(state, formData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to create a user...
  // try {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_APP_BASE_URL}/register`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(validatedFields.data),
  //     }
  //   );

  //   const result = await response.json();

  //   if (!response.ok) {
  //     toast.error("An error occurred. Please try again.");
  //     return;
  //   } else if (result?.status === "error") {
  //     result?.errors?.email
  //       ? toast.error("Email is already taken!")
  //       : toast.error(result?.message);

  //     return;
  //   }
  // } catch (error) {
  //   console.error(error.message);
  // }

  // 4. Create user session
  await createSession(28);

  // 5. Redirect user
  redirect("/profile");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
