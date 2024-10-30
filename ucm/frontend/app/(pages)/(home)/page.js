// components
import Navbar from "@/components/Navbar";
import Carousel from "./_components/Carousel";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="w-full h-screen bg-black">
      <Navbar active="/" />
      <Carousel />
    </main>
  );
}
