import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getDuaBySlug,
  getDuas,
  getRelatedDuas,
} from "@/lib/dua";
import { DuaActions } from "./dua-actions";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getDuas().map((dua) => ({
    slug: dua.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const dua = getDuaBySlug(slug);

  if (!dua) {
    return {
      title: "Dua Not Found | Dua Finder",
    };
  }

  return {
    title: `${dua.title} | Dua Finder`,
    description: dua.translation,
    keywords: [
      dua.category,
      "dua",
      "islam",
      "quran",
      "hadith",
      "muslim",
      "dua finder",
    ],
    openGraph: {
      title: `${dua.title} | Dua Finder`,
      description: dua.translation,
      type: "article",
    },
  };
}

export default async function DuaPage({
  params,
}: Props) {
  const { slug } = await params;

  const dua = getDuaBySlug(slug);

  if (!dua) {
    notFound();
  }

  const related = getRelatedDuas(
    dua.category,
    dua.slug
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto max-w-5xl px-6 py-12">

        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-slate-700 px-5 py-2 text-sky-400 hover:bg-slate-900 transition"
        >
          ← Back to Home
        </Link>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl">

          <div className="inline-block rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300 font-semibold">
            {dua.category}
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
            {dua.title}
          </h1>

          <p className="mt-4 text-slate-400 text-lg">
            Authentic {dua.sourceType} Dua
          </p>

        </div>

        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold text-cyan-400">
            Arabic
          </h2>

          <div className="mt-6 rounded-2xl bg-slate-950 border border-slate-800 p-8">

            <p className="text-right text-4xl leading-loose">
              {dua.arabic}
            </p>

          </div>

        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold text-cyan-400">
            Transliteration
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            {dua.transliteration}
          </p>

        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold text-cyan-400">
            Translation
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            {dua.translation}
          </p>

        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold text-cyan-400">
            Context
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            {dua.context}
          </p>

        </section>

        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8">

          <h2 className="text-2xl font-bold text-cyan-400">
            Reference
          </h2>

          <p className="mt-5 text-lg text-slate-300">
            {dua.source}
          </p>

        </section>
                <DuaActions 
          arabicText={dua.arabic}
          title={dua.title}
          translation={dua.translation}
          slug={dua.slug}
        />

        <section className="mt-10">

          <h2 className="mb-6 text-3xl font-bold">
            Related Duas
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {related.length === 0 ? (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                No related duas found.
              </div>
            ) : (
              related.map((item) => (
                <Link
                  key={item.id}
                  href={`/dua/${item.slug}`}
                  className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-500 hover:-translate-y-1"
                >
                  <div className="inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">
                    {item.category}
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-slate-400">
                    {item.translation}
                  </p>

                  <span className="mt-5 inline-block text-cyan-400">
                    Read Dua →
                  </span>
                </Link>
              ))
            )}

          </div>

        </section>

        <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8">

          <h2 className="text-3xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 space-y-8">

            <div>
              <h3 className="text-xl font-semibold text-cyan-400">
                When should I read this dua?
              </h3>

              <p className="mt-3 text-slate-300">
                You can read this dua whenever it applies to your situation,
                while asking Allah sincerely.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-cyan-400">
                Is this dua authentic?
              </h3>

              <p className="mt-3 text-slate-300">
                Yes. The source is shown above and comes from your verified dua
                database.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-cyan-400">
                What is the source?
              </h3>

              <p className="mt-3 text-slate-300">
                {dua.source}
              </p>
            </div>

          </div>

        </section>

        <footer className="mt-16 border-t border-slate-800 pt-8 text-center text-slate-500">

          <p>
            © {new Date().getFullYear()} Dua Finder
          </p>

          <p className="mt-2">
            Authentic Quran & Hadith Duas
          </p>

        </footer>

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: dua.title,
            description: dua.translation,
            inLanguage: "ar",
            about: dua.category,
            author: {
              "@type": "Organization",
              name: "Dua Finder",
            },
          }),
        }}
      />

    </main>
  );
}