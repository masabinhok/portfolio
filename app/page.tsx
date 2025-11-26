import Hero from "@/components/pages/Hero";
import CliShowcase from "@/components/showcase/CliShowcase";
import GithubShowcase from "@/components/showcase/GithubShowcase";
import IcebergShowcase from "@/components/showcase/iceberg/IcebergShowcase";
import ProblemsShowcase from "@/components/showcase/ProblemsShowcase";
import Collaborate from "@/components/pages/Collaborate";
import SectionWrapper from "@/components/ui/SectionWrapper";


export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-[1320px] px-4 py-10 mx-auto sm:px-6 lg:px-10">
      {/* Hero - No animation wrapper, it has its own */}
      <Hero />

      {/* Story-Driven Showcase Sections */}
      <SectionWrapper animation="fade-up" delay={100}>
        <IcebergShowcase />
      </SectionWrapper>

      <SectionWrapper animation="fade-up" delay={100}>
        <GithubShowcase />
      </SectionWrapper>

      <SectionWrapper animation="fade-up" delay={100}>
        <CliShowcase />
      </SectionWrapper>

      <SectionWrapper animation="fade-up" delay={100}>
        <ProblemsShowcase />
      </SectionWrapper>

      <SectionWrapper animation="scale" delay={100}>
        <Collaborate />
      </SectionWrapper>
    </main>
  );
}
