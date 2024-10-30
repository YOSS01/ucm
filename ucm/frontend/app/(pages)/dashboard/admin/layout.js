// components
import Navbar from "./_components/Navbar";

export default function RootLayout({ children }) {
  return (
    <main className="w-full h-screen flex justify-center items-center overflow-hidden">
      <Navbar />
      {children}
    </main>
  );
}
