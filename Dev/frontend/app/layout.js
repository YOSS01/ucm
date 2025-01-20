import { Poppins, Original_Surfer } from "next/font/google";
import "@/styles/globals.css";

// Toaster
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const original_surfer = Original_Surfer({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-original_surfer",
});

export const metadata = {
  title: {
    default: "University Clubs Management",
    template: "%s | University Clubs Management",
  },
  description:
    "University Clubs Management (UCM) is a comprehensive platform for managing university clubs, providing tools for club leaders to organize events, track member participation, handle registrations, and manage communication. The system supports club administrators with features like member management, event scheduling, announcements, and reporting, enhancing the overall student engagement and club operations.",
  keywords: [
    "University clubs management",
    "Club event scheduling",
    "Member registration system",
    "Student club platform",
    "Club communication tools",
    "Event tracking",
    "Club administration software",
    "Student engagement platform",
    "University club portal",
    "Club membership management",
    "Club reporting system",
    "University activities management",
  ],
  authors: [
    { name: "Alahyane Youssef", url: "https://youssef-ae.vercel.app/" },
    { name: "Amaali Oussama", url: "" },
  ],
  publisher: "UCM",
  creator: "UCM",
  metadataBase: new URL(`https://ucm.ma/`),
  alternates: {
    canonical: "./",
    languages: {},
  },
  openGraph: {
    title: "University Clubs Management",
    description:
      "University Clubs Management (UCM) is a comprehensive platform for managing university clubs, providing tools for club leaders to organize events, track member participation, handle registrations, and manage communication. The system supports club administrators with features like member management, event scheduling, announcements, and reporting, enhancing the overall student engagement and club operations.",
    images: [""],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${original_surfer.variable}`}
    >
      <body
        className={`${poppins.className} antialiased selection:bg-black/70 selection:text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
