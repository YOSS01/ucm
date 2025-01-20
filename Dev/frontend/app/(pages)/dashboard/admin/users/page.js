// components
import Users from "./_components/Users";

// Fetch Users
const getUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/all-users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      // toast.error("Faild to load users!");
      return;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export default async function UsersPage() {
  const data = await getUsers();

  return (
    <div className="h-full w-full flex flex-col gap-y-28 p-10 overflow-y-auto">
      <Users data={data} />
    </div>
  );
}

export const revalidate = 0;
