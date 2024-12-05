// components
import Participants from "./_components/Participants";

// Fetch Participants
const getParticipants = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/get-event-participants/${id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    return result?.participants;
  } catch (error) {
    console.error(error);
  }
};

export default async function EventPage({ params }) {
  const eventID = params?.eventID;
  const data = await getParticipants(eventID);

  return (
    <div className="h-full w-full flex flex-col gap-y-28 p-10 overflow-y-auto">
      <Participants data={data} />
    </div>
  );
}

export const revalidate = 0;
