import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getCategories, getDuasByCategory } from "@/lib/category";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateStaticParams() {
  return getCategories().map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;

  return {
    title: `${category} Duas | Dua Finder`,
    description: `Browse authentic Quran and Hadith duas for ${category}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const duas = getDuasByCategory(category);

  if (duas.length === 0) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="text-cyan-400 hover:text-cyan-300"
      >
        ← Back to Home
      </Link>

      <h1 className="text-5xl font-bold mt-6">
        {category} Duas
      </h1>

      <p className="text-slate-400 mt-3">
        {duas.length} authentic duas from the Quran and Hadith.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {duas.map((dua) => (
          <Link
            key={dua.id}
            href={`/dua/${dua.slug}`}
            className="glass rounded-2xl p-6 border border-slate-700 hover:border-cyan-500 transition"
          >
            <p className="text-sm text-cyan-400 mb-2">
              {dua.sourceType}
            </p>

            <h2 className="text-xl font-semibold">
              {dua.title}
            </h2>

            <p className="text-slate-400 mt-3 line-clamp-3">
              {dua.translation}
            </p>

            <div className="mt-5 text-cyan-400 font-medium">
              Read Dua →
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}