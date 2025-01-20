import Image from "next/image";

// components
import Navbar from "@/components/Navbar";
import Form from "./_components/Form";

export const metadata = {
  title: "Login",
};

export default function LoginAdmin() {
  return (
    <main className="w-full h-screen flex items-center">
      <Navbar active="/login/admin" />
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="h-full max-h-[500px] w-full max-w-[400px] flex flex-col justify-between items-center">
          <h1 className="font-original_surfer text-6xl font-black">
            Admin space
          </h1>
          <Form />
        </div>
      </div>
      <div className="w-1/2 h-full">
        <Image
          src="https://images.unsplash.com/photo-1588534331122-77ac46322dd2?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login background"
          width={1000}
          height={600}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
    </main>
  );
}
