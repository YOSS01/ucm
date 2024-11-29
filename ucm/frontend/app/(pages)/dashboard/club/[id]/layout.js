// components
import Navbar from "./_components/Navbar";

export default function RootLayout({ children, params }) {
  return (
    <main className="w-full h-screen flex justify-center items-center overflow-hidden">
      <Navbar id={params.id} />
      {children}
    </main>
  );
}
