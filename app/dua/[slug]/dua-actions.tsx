"use client";

interface DuaActionsProps {
  arabicText: string;
  title: string;
  translation: string;
  slug: string;
}

export function DuaActions({ 
  arabicText, 
  title, 
  translation, 
  slug 
}: DuaActionsProps) {
  return (
    <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigator.clipboard.writeText(arabicText)}
          className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600"
        >
          📋 Copy Arabic
        </button>

        <button
          onClick={() =>
            navigator.share?.({
              title: title,
              text: translation,
              url: `/dua/${slug}`,
            })
          }
          className="rounded-xl border border-cyan-500 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500 hover:text-white"
        >
          📤 Share
        </button>
      </div>
    </section>
  );
}
