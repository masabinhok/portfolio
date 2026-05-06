import Link from "next/link";
import PageShell from "@/components/PageShell";
import Illustration from "@/components/Illustration";
import EmailLink from "@/components/EmailLink";

export default function Home() {
  return (
    <PageShell>
      <main className="page-grid">
        <section className="page-content">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <span className="page-label">// home.tsx</span>

            <h1>hi, i am <strong>sabin shrestha</strong></h1>

            <div className="bio">
              <p>
                a computer science student from nepal who enjoys{" "}
                <span className="highlight">designing systems</span>, working with{" "}
                <span className="highlight">databases</span>, and building products
                that are simple to use and reliable underneath.
              </p>
              <p className="accent">i build software applications.</p>
              <p>
                currently exploring <span className="highlight">sql</span>,{" "}
                <span className="highlight">multi-tenant saas</span>, and{" "}
                <span className="highlight">event-driven systems</span>.
              </p>
            </div>

            <div className="tags">
              {["typescript", "sql", "next.js", "nest.js", "systems design", "saas"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            <div className="links">
              <a className="link-item green" target="_blank" rel="noopener noreferrer" href="https://github.com/masabinhok">github</a>
              <a className="link-item green" target="_blank" rel="noopener noreferrer" href="https://github.com/masabinhok">resume</a>
              <a className="link-item green" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/sabinshresthaa/">linkedin</a>
              <Link className="link-item blue" href="/projects">projects</Link>
              <Link className="link-item blue" href="/blogs">blogs</Link>
            </div>
          </div>

          <section className="contact">
            <h2>get in touch</h2>
            <p>for internships, collaboration, freelance work, or just to talk about systems and product ideas.</p>
            <EmailLink />
          </section>
        </section>

        <Illustration />
      </main>
    </PageShell>
  );
}