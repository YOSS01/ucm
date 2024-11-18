"use server";
import { SignupFormSchema, SigninFormSchema } from "@/app/_lib/definitions";
import { createSession, deleteSession } from "@/app/_lib/session";
import { redirect } from "next/navigation";

export async function signup(state, formData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    cin: formData.get("cin"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
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
      return {
        message: "An error occurred while creating your account.",
      };
    } else if (result?.status === "error") {
      if (result?.errors?.email) {
        return {
          message: "Email is already taken!",
        };
      }
      return {
        message: "An error occurred while creating your account.",
      };
    }

    // 4. Create user session
    await createSession(result.user_id);
  } catch (error) {
    console.error(error.message);
    return {
      message: "An error occurred while creating your account.",
    };
  }

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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/login`,
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
      return {
        message: "An error occurred. Please try again.",
      };
    } else if (result?.status === "error") {
      return {
        message: "Invalid email or password",
      };
    }

    // 4. Create user session
    await createSession(result.data.user_id);
  } catch (error) {
    console.error(error.message);
    return {
      message: "An error occurred. Please try again.",
    };
  }

  // 5. Redirect user
  redirect("/profile");
}

export async function adminLogin(state, formData) {
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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/login-admin`,
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
      return {
        message: "An error occurred. Please try again.",
      };
    } else if (result?.status === "error") {
      return {
        message: "Invalid email or password",
      };
    }

    // 4. Create user session
    await createSession(1, "admin");
  } catch (error) {
    console.error(error.message);
    return {
      message: "An error occurred. Please try again.",
    };
  }

  // 5. Redirect user
  redirect("/dashboard/admin");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
