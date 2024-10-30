import Image from "next/image";

// components
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Profile",
};

export default function page() {
  return (
    <div className="w-full h-screen relative">
      <Navbar active="/profile" />
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-[550px] w-full max-w-[450px] bg-white rounded-3xl flex flex-col justify-center gap-y-10 relative z-20 p-5">
          <div className="flex flex-col items-center gap-y-2">
            <div className="size-[150px] border rounded-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="user pic"
                width={500}
                height={500}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            <h1 className="font-original_surfer">Jack Finnigan</h1>
            <Link
              href="mailto:userexample@gmail.com"
              className="text-xs text-black/60 font-light"
            >
              userexample@gmail.com
            </Link>
          </div>
          <div>
            <h2 className="text-sm">Clubs:</h2>
            <ul className="min-h-[100px] flex justify-center items-center text-xs text-black/40">
              Not member in any club yet
            </ul>
          </div>
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
