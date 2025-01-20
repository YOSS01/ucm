// components
import Clubs from "./_components/Clubs";

// Fetch Clubs
const getClubs = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/all-clubs`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // toast.error("Faild to load clubs!");
      return;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default async function ClubsPage() {
  const data = await getClubs();

  return (
    <div className="h-full w-full flex flex-col gap-y-28 p-10 overflow-y-auto">
      <Clubs data={data} />
    </div>
  );
}

export const revalidate = 0;
