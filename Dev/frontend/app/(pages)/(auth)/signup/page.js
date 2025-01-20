import Image from "next/image";

// components
import Navbar from "@/components/Navbar";
import Form from "./_components/Form";

export const metadata = {
  title: "Sign up",
};

export default function SignUp() {
  return (
    <main className="w-full h-screen flex flex-row items-center">
      <Navbar active="/login" />
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="h-full max-h-[580px] w-full max-w-[500px] flex flex-col justify-between items-center z-40">
          <h1 className="font-original_surfer text-6xl font-black">Sign up</h1>
          <Form />
        </div>
      </div>
      <div className="w-1/2 h-full">
        <Image
          src="https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login background"
          width={2000}
          height={1080}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
    </main>
  );
}
