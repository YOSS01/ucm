"use server";
import { AddClubFormSchema } from "@/app/_lib/definitions";

// Administrator API

// Add Club
export async function addClub(state, formData) {
  // Validate form fields
  const validatedFields = AddClubFormSchema.safeParse({
    logo: formData.get("logo"),
    background: formData.get("background"),
    presidentID: formData.get("presidentID"),
    email: formData.get("email"),
    name: formData.get("name"),
    description: formData.get("description"),
    slug: formData.get("slug"),
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
    formData.append("logo", validatedFields.data.logo);
    formData.append("background", validatedFields.data.background);
    formData.append("id_president", validatedFields.data.presidentID);
    formData.append("email", validatedFields.data.email);
    formData.append("name", validatedFields.data.name);
    formData.append("description", validatedFields.data.description);
    formData.append("slug", validatedFields.data.slug);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/add-club`,
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
          message: "An error occurred while creating the club.",
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
          message: "An error occurred while creating the club.",
        },
      };
    }

    return {
      response: {
        status: 200,
        message: "Club Added Successfully",
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      response: {
        status: 500,
        message: "An error occurred while creating the club.",
      },
    };
  }
}

// Edit Club
export async function editClub(state, formData) {
  const id = formData.get("clubID");
  const data = new FormData();

  // Handle the logo & background field separately
  const logoFile = formData.get("logo");
  if (logoFile && logoFile.size > 0) {
    data.append("logo", logoFile);
  }

  const backgroundFile = formData.get("background");
  if (backgroundFile && backgroundFile.size > 0) {
    data.append("background", backgroundFile);
  }

  // Handle other attributes dynamically
  const attributes = ["id_president", "email", "name", "status", "slug"];
  attributes.forEach((attr) => {
    const value = formData.get(attr);
    if (value) {
      data.append(attr, value);
    }
  });

  // Call the provider or db to create a user...
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/update-club/${id}`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        response: {
          status: 500,
          message: "An error occurred while updating the club.",
        },
      };
    } else if (result?.status === "error") {
      return {
        response: {
          status: 500,
          message: result?.message,
        },
      };
    }

    return {
      response: {
        status: 200,
        message: "Club Updated Successfully",
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      response: {
        status: 500,
        message: "An error occurred while updating the club.",
      },
    };
  }
}
