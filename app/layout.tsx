import type { Metadata } from "next";
import { Poppins, Roboto, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/sections/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Srinjani's Portfolio",
  description:
    "Portfolio of Srinjani Roy Chowdhury, an AI Engineer and Full Stack Developer building scalable web applications and user-focused applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", poppins.variable, roboto.variable, "font-sans", geist.variable)}
    >
      <body className="gradient min-h-full flex flex-col text-slate-100 selection:bg-purple-500 selection:text-white relative">
        <CustomCursor />
        <Navbar />
        <main className="flex-grow relative z-10">{children}</main>
      </body>
    </html>
  );
}
