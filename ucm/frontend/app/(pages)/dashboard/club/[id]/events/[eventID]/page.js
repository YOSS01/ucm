// components
import Participants from "./_components/Participants";

export default async function EventPage({ params }) {
  const eventID = params?.eventID;

  return (
    <div className="h-full w-full flex flex-col gap-y-28 p-10 overflow-y-auto">
      <Participants />
    </div>
  );
}

export const revalidate = 0;
