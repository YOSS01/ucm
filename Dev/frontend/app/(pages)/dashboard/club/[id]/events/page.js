// components
import Events from "./_components/Events";

// Fetch Events
const getEvents = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/club-events/${id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    return result?.events;
  } catch (error) {
    console.error(error);
  }
};

export default async function EventsPage({ params }) {
  const id = params.id;
  const data = await getEvents(id);

  return (
    <div className="h-full w-full flex flex-col gap-y-28 p-10 overflow-y-auto">
      <Events data={data} id={id} />
    </div>
  );
}

export const revalidate = 0;
