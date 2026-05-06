import Link from "next/link";
import PageShell from "@/components/PageShell";
import Illustration from "@/components/Illustration";

export default function Projects() {
  return (
    <PageShell>
      <main className="page-grid">
        <section className="page-content">
          <div className="section-block">
            <span className="page-label">// projects.tsx</span>
            <h2>
              projects{" "}
              <Link href="/" className="link-item blue" style={{ fontSize: "0.8rem" }}>home</Link>
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--gray-700)" }}>
              working — check my{" "}
              <a className="link-item green" target="_blank" rel="noopener noreferrer" href="https://github.com/masabinhok">
                github
              </a>{" "}
              for everything live.
            </p>
          </div>

          {/* drop your project cards here */}
          <div className="section-block" style={{ gap: 12 }}>
            {[
              { title: "e4", desc: "Practice, learn, quiz openings, upload PGNs, record lines, and manage content via admin panel.", tags: ["next.js", "nest.js"], gh: "https://github.com/masabinhok/e4", live: "https://e4-learnchess.vercel.app" },
              { title: "smgts", desc: "Event driven microservices School Management System", tags: ["nest.js", "next.js"],    gh: "https://github.com/masabinhok/sms-web", live: "https://sms-nest.vercel.app/" },
            ].map(p => (
              <div className="project-card" key={p.title}>
                <div className="project-card-title">{p.title}</div>
                <div className="project-card-desc">{p.desc}</div>
                <div className="project-card-footer">
                  <div className="tags" style={{ animation: "none", opacity: 1 }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="project-card-links">
                    <a className="link-item green" target="_blank" rel="noopener noreferrer" href={p.gh}>github</a>
                    <a className="link-item blue"  target="_blank" rel="noopener noreferrer" href={p.live}>live</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Illustration />
      </main>
    </PageShell>
  );
} 