import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { news, pillarColor } from "../../lib/site-data";

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = news.find((n) => n.slug === slug);

  if (!article) return <Navigate to="/news" replace />;

  return (
    <div className="min-h-full bg-dash-bg p-6">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/news"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-dash-red"
        >
          <ArrowLeft className="h-4 w-4" /> Back to News
        </Link>

        <div className="rounded-xl bg-white border border-dash-border shadow-sm overflow-hidden">
          {/* Pillar header */}
          <div className={`px-6 py-3 ${pillarColor[article.color]}`}>
            <span className="text-xs font-semibold uppercase tracking-widest text-white">
              {article.tag}
            </span>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="font-display text-2xl font-semibold leading-tight text-gray-900 md:text-3xl">
              {article.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400 border-b border-dash-border pb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {article.place}
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-gray-700">{article.excerpt}</p>
            <p className="mt-4 leading-relaxed text-gray-600 text-sm">{article.body}</p>
          </div>
        </div>

        {/* Related */}
        {news.filter((n) => n.slug !== article.slug && n.color === article.color).length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
              Related Stories
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {news
                .filter((n) => n.slug !== article.slug && n.color === article.color)
                .slice(0, 2)
                .map((n) => (
                  <Link
                    key={n.slug}
                    to={`/news/${n.slug}`}
                    className="group flex gap-4 rounded-xl border border-dash-border bg-white p-4 shadow-sm transition-all hover:border-dash-red/40 hover:shadow-md"
                  >
                    <div className={`h-16 w-16 shrink-0 rounded-lg ${pillarColor[n.color]}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-semibold leading-snug text-gray-900 group-hover:text-dash-red line-clamp-2">
                        {n.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-400">{n.date}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
