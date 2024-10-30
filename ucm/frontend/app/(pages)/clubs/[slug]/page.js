// components
import Navbar from "@/components/Navbar";
import Observer from "./_components/Observer";

export const metadata = {
  title: "EcoAction Club",
};

export default function Club() {
  return (
    <div className="w-full h-screen bg-black">
      <Navbar />
      <Observer />
    </div>
  );
}
