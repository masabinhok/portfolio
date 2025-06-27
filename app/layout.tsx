import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";


const quickSand = Quicksand({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})


export const metadata: Metadata = {
  title: "Sabin Shrestha",
  description: "I just don't build APIs, I build foundations.",
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
        {children}
      </body>
    </html>
  );
}
