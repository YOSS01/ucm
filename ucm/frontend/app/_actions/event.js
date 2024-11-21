"use server";
import { ParticipateInFormSchema } from "@/app/_lib/definitions";

export async function participateIn(state, formData) {
  // Validate form fields
  const validatedFields = ParticipateInFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    id_event: formData.get("id_event"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/addVisitor`,
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
        response: {
          status: 500,
          message: "An error occurred while participate in.",
        },
      };
    } else if (result?.status === "error") {
      return {
        response: {
          status: 500,
          message: "An error occurred while participate in.",
        },
      };
    }

    const id_event = validatedFields.data.id_event;

    const data = {
      id_visitor: result.visitor_id,
      id_event: id_event,
    };

    const responseTwo = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/add-event-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resultTwo = await responseTwo.json();

    if (!responseTwo.ok) {
      return {
        response: {
          status: 500,
          message: "An error occurred while participate in.",
        },
      };
    } else if (resultTwo?.status === "error") {
      return {
        response: {
          status: 500,
          message: "An error occurred while participate in.",
        },
      };
    }

    return {
      response: {
        status: 200,
        message: "You have successfully participated in.",
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      response: {
        status: 500,
        message: "An error occurred while participate in.",
      },
    };
  }
}
