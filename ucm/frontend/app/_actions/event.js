"use server";
import {
  ParticipateInFormSchema,
  AddEventFormSchema,
} from "@/app/_lib/definitions";

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

// Administrator API

// Add Event
export async function addEvent(state, formData) {
  // Validate form fields
  const validatedFields = AddEventFormSchema.safeParse({
    picture: formData.get("picture"),
    clubID: formData.get("clubID"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: formData.get("location"),
    datetime: formData.get("datetime"),
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
    formData.append("id_club", validatedFields.data.clubID);
    formData.append("name", validatedFields.data.name);
    formData.append("description", validatedFields.data.description);
    formData.append("location", validatedFields.data.location);
    formData.append("date", validatedFields.data.datetime);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/add-event`,
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
        message: "Event has been added successfully",
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

// Edit Event
