import Image from "next/image";
import Link from "next/link";

export default function Blogs() {
  return (
    <main className="lowercase">
      <div className="mx-auto grid min-h-screen w-full max-w-[1320px] md:grid-cols-2">
        <section className="px-4 py-10 sm:px-6 lg:px-10">
            <section className="mt-10 space-y-4 max-w-2xl">
              <h2 className="text-2xl text-black">blogs <Link href="/" className="text-blue-600 text-sm ">home</Link></h2>
            <p className="leading-7 text-gray-700">writing, check my  <a
                  className="text-green-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://medium.com/@sabin.shrestha.er"
                >
                  medium
                </a></p>
            </section>
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