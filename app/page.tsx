import Hero from "@/components/pages/Hero";
import Projects from "@/components/pages/Projects";

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-[1320px] px-4 py-10 mx-auto sm:px-6 lg:px-10">
      <Hero />
      <Projects />
    </main>
  );
}
