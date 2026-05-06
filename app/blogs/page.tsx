import Link from "next/link";
import PageShell from "@/components/PageShell";
import Illustration from "@/components/Illustration";

export default function Blogs() {
  return (
    <PageShell>
      <main className="page-grid">
        <section className="page-content">
          <div className="section-block">
            <span className="page-label">// blogs.tsx</span>
            <h2>
              blogs{" "}
              <Link href="/" className="link-item blue" style={{ fontSize: "0.8rem" }}>home</Link>
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--gray-700)" }}>
              writing — check my{" "}
              <a className="link-item green" target="_blank" rel="noopener noreferrer" href="https://medium.com/@sabin.shrestha.er">
                medium
              </a>{" "}
              for everything published.
            </p>
          </div>

          {/* drop your blog cards here */}
          <div className="section-block" style={{ gap: 0 }}>
            {[
              { title: "i will be writing someday", date: "apr 2025", desc: "currently exploring things, will share for sure" }
            ].map(b => (
              <div className="blog-card" key={b.title}>
                <div className="blog-card-title">{b.title}</div>
                <div className="blog-card-meta">{b.date}</div>
                <div className="blog-card-desc">{b.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <Illustration />
      </main>
    </PageShell>
  );
}