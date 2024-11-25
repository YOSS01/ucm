"use server";
import { SignupFormSchema } from "@/app/_lib/definitions";

// Administrator API

// Add User
export async function addUser(state, formData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    picture: formData.get("picture"),
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
    const formData = new FormData();
    formData.append("picture", validatedFields.data.picture);
    formData.append("first_name", validatedFields.data.first_name);
    formData.append("last_name", validatedFields.data.last_name);
    formData.append("cin", validatedFields.data.cin);
    formData.append("email", validatedFields.data.email);
    formData.append("password", validatedFields.data.password);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/register`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        response: {
          status: 500,
          message: "An error occurred while creating your account.",
        },
      };
    } else if (result?.status === "error") {
      if (result?.errors?.email) {
        return {
          response: {
            status: 500,
            message: "Email is already taken!",
          },
        };
      }
      return {
        response: {
          status: 500,
          message: "An error occurred while creating your account.",
        },
      };
    }

    return {
      response: {
        status: 200,
        message: "User Added Successfully",
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      response: {
        status: 500,
        message: "An error occurred while creating your account.",
      },
    };
  }
}

// Edit User
