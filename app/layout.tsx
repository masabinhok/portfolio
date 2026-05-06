import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";


const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sabinshrestha69.com.np"),
  title: {
    default: "Sabin Shrestha",
    template: "%s | Sabin Shrestha",
  },
  description:
    "Sabin Shrestha is a backend developer from Kathmandu, Nepal, building backend systems with SQL, cloud, and modern web tools.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sabin Shrestha | Backend Developer",
    description:
      "Sabin Shrestha is a backend developer from Kathmandu, Nepal, building backend systems with SQL, cloud, and modern web tools.",
    url: "https://sabinshrestha69.com.np",
    siteName: "Sabin Shrestha Portfolio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sabin Shrestha Portfolio",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className="min-h-screen bg-white text-zinc-900 antialiased" suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  );
}