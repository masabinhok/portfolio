import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col max-w-[1320px] w-full p-10">
      <Hero />
    </main>
  );
}
