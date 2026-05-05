import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="lowercase">
      <div className="mx-auto grid min-h-screen w-full max-w-[1320px] md:grid-cols-2">
        <section className="px-4 py-10 sm:px-6 lg:px-10">
          <div className="max-w-2xl space-y-20">
            <div className="space-y-6">
              <div className="space-y-3 mt-10">
                <h1 className="text-3xl text-black sm:text-4xl">
                  hi, i am <strong>Sabin Shrestha</strong>
                </h1>

              <p className="max-w-xl leading-7 text-gray-600">
                   a computer science student from nepal who enjoys designing systems, working with databases, and building products that are simple to use and reliable underneath.
                </p>
                <p className="max-w-xl leading-7 text-gray-700">
                  i build software applications.
                </p>

                

                <p className="max-w-xl leading-7 text-gray-600">
                  currently exploring sql, multi-tenant saas, and event-driven systems.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-lg">
                <a
                  className="text-green-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/masabinhok"
                >
                  github
                </a>

                <a
                  className="text-green-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/masabinhok"
                >
                  resume
                </a>

                <a
                  className="text-green-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/sabinshresthaa/"
                >
                  linkedin
                </a>

                <Link
                  className="text-blue-600 underline"
                  rel="noopener noreferrer"
                  href="/projects"
                >
                  projects
                </Link>

                <Link
                  className="text-blue-600 underline"
                  rel="noopener noreferrer"
                  href="/blogs"
                >
                  blogs
                </Link>
              </div>
            </div>

            <section className="space-y-4 max-w-2xl pb-10">
              <h2 className="text-2xl text-black">get in touch</h2>

              <p className="mt-3 leading-7 text-gray-700">
                for internships, collaboration, freelance work, or just to talk about systems and product ideas.
              </p>

              <a
                href="mailto:sabin.shrestha.er@gmail.com"
                className="inline-block mt-4 text-lg text-pink-600 underline"
              >
                sabin.shrestha.er@gmail.com
              </a>
            </section>
          </div>
        </section>

        <aside className="sticky top-0 hidden h-screen items-center justify-center md:flex md:px-10">
          <Image
            src="/fl-cut-2.png"
            alt="Sabin Shrestha illustration"
            width={520}
            height={520}
            className="w-full max-w-md"
            priority
          />
        </aside>
      </div>
    </main>
  );
}