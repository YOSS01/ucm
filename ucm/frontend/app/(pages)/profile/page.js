import Image from "next/image";
import Link from "next/link";

// auth
import { getUser } from "@/app/_lib/dal";

// components
import Navbar from "@/components/Navbar";
import Logout from "./_components/Logout";
import Edit from "./_components/Edit";
import ResetPassword from "./_components/ResetPassword";

// images
import userPic from "@/public/images/user.svg";

export const metadata = {
  title: "Profile",
};

export default async function page() {
  const user = await getUser();

  return (
    <div className="w-full h-screen relative">
      <Navbar active="/profile" />
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-[550px] w-full max-w-[450px] bg-white rounded-3xl flex flex-col justify-center gap-y-10 relative z-50 p-5 overflow-hidden">
          <Edit user={user} />
          <ResetPassword />
          <div className="flex flex-col items-center gap-y-2">
            <div className="size-[150px] border rounded-full overflow-hidden">
              {user?.picture ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/users/${user?.picture}`}
                  alt="user pic"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover pointer-events-none"
                />
              ) : (
                <Image
                  src={userPic}
                  alt="user pic"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover pointer-events-none"
                />
              )}
            </div>
            <h1 className="font-original_surfer">
              {user?.first_name + " " + user?.last_name}
            </h1>
            <Link
              href={`mailto:${user?.email}`}
              className="text-xs text-black/60 font-light"
            >
              {user?.email}
            </Link>
          </div>
          <div>
            <h2 className="text-sm">Clubs:</h2>
            <ul className="min-h-[100px] flex justify-center items-center text-xs text-black/40">
              Not member in any club yet
            </ul>
          </div>
          <Logout />
        </div>
      </div>

      <>
        <Image
          src="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile Background"
          width={2070}
          height={1080}
          className="absolute z-0 w-full h-full inset-0 object-cover pointer-events-none"
        />
        <div className="absolute w-full h-full inset-0 bg-black/50 z-10"></div>
      </>
    </div>
  );
}
