// components
import Navbar from "@/components/Navbar";
import Carousel from "./_components/Carousel";

export const metadata = {
  title: "Clubs",
};

export default function Clubs() {
  return (
    <main className="w-full h-screen bg-black">
      <Navbar active="/clubs" />
      <Carousel />
    </main>
  );
}
