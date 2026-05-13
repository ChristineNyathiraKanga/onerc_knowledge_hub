import { Link } from "react-router-dom";
import { Calendar, MapPin, Newspaper } from "lucide-react";
import { SiteHeader, SiteFooter } from "../layout/SiteHeader";
import { news, pillarColor } from "../../lib/site-data";

export default function NewsIndex() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500">
            <Newspaper className="h-3.5 w-3.5" /> News & Stories
          </div>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl">
            From the field, across the network
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Updates, peer stories and results from National Societies and Consortium Partners advancing locally led humanitarian action.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <Link
              key={n.slug}
              to={`/news/${n.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-red-500/40 hover:shadow-lg"
            >
              <div className={`relative h-40 ${pillarColor[n.color]}`}>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-widest text-white">
                  {n.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl font-semibold leading-tight text-gray-900 group-hover:text-red-500">
                  {n.title}
                </h2>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{n.excerpt}</p>
                <div className="mt-auto flex items-center justify-between pt-6 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> {n.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {n.place}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
