import { Link } from "react-router-dom";
import { Calendar, MapPin, Newspaper } from "lucide-react";
import { news, pillarColor } from "../../lib/site-data";

export default function NewsIndex() {
  return (
    <div className="min-h-full bg-dash-bg p-6">
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-dash-red">
          <Newspaper className="h-3.5 w-3.5" /> News &amp; Stories
        </div>
        <h1 className="font-display text-2xl font-semibold text-gray-900">
          From the field, across the network
        </h1>
        <p className="mt-1 text-sm text-gray-500 max-w-2xl">
          Updates, peer stories and results from National Societies and Consortium Partners.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {news.map((n) => (
          <Link
            key={n.slug}
            to={`/news/${n.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-dash-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-dash-red/40 hover:shadow-md"
          >
            <div className={`relative h-28 ${pillarColor[n.color]}`}>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <span className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-widest text-white">
                {n.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-display text-base font-semibold leading-snug text-gray-900 group-hover:text-dash-red">
                {n.title}
              </h2>
              <p className="mt-2 text-xs text-gray-500 line-clamp-2">{n.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> {n.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" /> {n.place}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
