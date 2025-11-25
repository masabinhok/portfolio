import Hero from "@/components/pages/Hero";
import CliShowcase from "@/components/showcase/CliShowcase";
import GithubShowcase from "@/components/showcase/GithubShowcase";
import IcebergShowcase from "@/components/showcase/IcebergShowcase";
import ProblemsShowcase from "@/components/showcase/ProblemsShowcase";


export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-[1320px] px-4 py-10 mx-auto sm:px-6 lg:px-10">
      <Hero />
      {/* Showcase - Storytelling !! */}
     <IcebergShowcase/>
     <GithubShowcase/>
     <CliShowcase/>
     <ProblemsShowcase/>
  
    </main>
  );
}
