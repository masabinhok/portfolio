import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Footer from "@/components/ui/Footer";

const quickSand = Quicksand({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})


export const metadata: Metadata = {
  title: "Sabin Shrestha | Full-Stack Developer",
  description: "I don't just build APIs, I build foundations. Portfolio showcasing full-stack development, open source contributions, and problem-solving expertise.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "Node.js", "NestJS", "TypeScript", "Web Development"],
  authors: [{ name: "Sabin Shrestha" }],
  openGraph: {
    title: "Sabin Shrestha | Full-Stack Developer",
    description: "I don't just build APIs, I build foundations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quickSand.variable} antialiased w-full min-h-screen flex flex-col items-center overflow-x-hidden`}
      >
        <AnimatedBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
