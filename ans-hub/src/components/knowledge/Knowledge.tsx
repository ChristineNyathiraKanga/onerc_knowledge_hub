import { BookOpen, FileText, Download } from "lucide-react";
import { SiteHeader, SiteFooter } from "../layout/SiteHeader";
import { publications, pillarColor } from "../../lib/site-data";

export default function Knowledge() {
  const categories = ["All", "Toolkit", "Report", "Case Study", "Guideline", "Brief"];

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500">
            <BookOpen className="h-3.5 w-3.5" /> Knowledge Resources
          </div>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl">
            Tools, reports & learning resources
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Open resources co-created by the Alliance — toolkits, case studies, guidelines and reports documenting peer practice across the four pillars.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat === "All"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publications.map((pub) => (
            <div
              key={pub.slug}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white transition-all hover:border-red-500/40 hover:shadow-lg"
            >
              <div className={`relative h-32 rounded-t-2xl ${pillarColor[pub.pillar]} flex items-center justify-center`}>
                <FileText className="h-12 w-12 text-white/80" />
                <span className="absolute top-4 left-4 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {pub.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold leading-tight text-gray-900 group-hover:text-red-500">
                  {pub.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{pub.description}</p>
                <div className="mt-auto pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{pub.author}</span>
                    <span>{pub.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="font-semibold">{pub.fileType}</span>
                      <span>·</span>
                      <span>{pub.size}</span>
                      {pub.pages && (
                        <>
                          <span>·</span>
                          <span>{pub.pages} pages</span>
                        </>
                      )}
                    </div>
                    <button className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600">
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
