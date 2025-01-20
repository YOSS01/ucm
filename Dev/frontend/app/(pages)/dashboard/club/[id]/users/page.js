// components
import Users from "./_components/Users";

// Fetch Users
const getUsers = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/club-users/${id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return;
    }

    const result = await response.json();
    return result?.users;
  } catch (error) {
    console.error(error);
  }
};

export default async function UsersPage({ params }) {
  const id = params.id;
  const data = await getUsers(id);

  return (
    <div className="h-full w-full flex flex-col gap-y-28 p-10 overflow-y-auto">
      <Users data={data} />
    </div>
  );
}

export const revalidate = 0;
