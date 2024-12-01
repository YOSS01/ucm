// components
import Events from "./_components/Events";

// Fetch Events
const getEvents = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/all-events`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // toast.error("Faild to load events!");
      return;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default async function EventsPage() {
  const data = await getEvents();

  return (
    <div className="h-full w-full flex flex-col gap-y-28 p-10 overflow-y-auto">
      <Events data={data} />
    </div>
  );
}

export const revalidate = 0;
