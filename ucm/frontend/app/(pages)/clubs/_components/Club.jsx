import Link from "next/link";
import Image from "next/image";

// Toaster
import toast from "react-hot-toast";

export default function Club({ item, session }) {
  return (
    <div className="w-full h-screen text-white relative">
      <div className="absolute bottom-10 left-10 z-10 flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl font-original_surfer font-black">
            {item?.name}
          </h1>
          <p className="max-w-[500px] text-sm font-light line-clamp-4">
            {item?.description}
          </p>
        </div>
        <div className="text-sm flex items-center gap-x-5">
          <Signup session={session} />
          <Link
            href={`/clubs/${item?.slug}`}
            className="h-[45px] flex justify-center items-center border-2 border-solid border-white rounded-full px-7 hover:bg-white hover:text-black duration-300"
          >
            See more
          </Link>
        </div>
      </div>
      {/* Background */}
      <>
        <Image
          src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/clubs/${item?.background}`}
          alt="Event Background"
          width={2070}
          height={1080}
          className="absolute z-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute w-full h-full bg-black/50 z-[1]"></div>
      </>
    </div>
  );
}

const Signup = ({ session }) => {
  function handleSignup() {
    if (!session) {
      toast("Please create an account to proceed!", {
        icon: "🔔",
      });
    }
  }
  return (
    <>
      <button
        onClick={handleSignup}
        className="h-[45px] border-2 border-solid border-white rounded-full px-7 bg-white text-black hover:bg-transparent hover:text-white duration-300"
      >
        Get in
      </button>
    </>
  );
};
