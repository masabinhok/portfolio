import Hero from "@/components/pages/Hero";
import IcebergShowcase from "@/components/showcase/IcebergShowcase";


export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-[1320px] px-4 py-10 mx-auto sm:px-6 lg:px-10">
      <Hero />
      {/* Showcase - Storytelling !! */}
     <IcebergShowcase/>
  
    </main>
  );
}
