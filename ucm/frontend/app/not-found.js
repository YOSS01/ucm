import Image from "next/image";

// styles
import styles from "@/styles/notFound/background.module.css";

// components
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "404",
};

export default function notFound() {
  return (
    <div
      className={`${styles.bg} w-full h-screen bg-black flex justify-center items-center relative`}
    >
      <Navbar />
      <div className="flex flex-col items-center text-center gap-y-5 text-white relative z-20">
        <h1 className="font-original_surfer text-9xl font-black">404</h1>
        <p className="max-w-[700px] font-light">
          Oops... The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable. Please check back later
          ;)
        </p>
      </div>
    </div>
  );
}
