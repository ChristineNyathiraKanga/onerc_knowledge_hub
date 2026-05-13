import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { SiteHeader, SiteFooter } from "../layout/SiteHeader";
import { news, pillarColor } from "../../lib/site-data";

export default function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = news.find((n) => n.slug === slug);

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to news
        </Link>

        <div className={`mb-8 rounded-2xl ${pillarColor[article.color]} px-6 py-4`}>
          <span className="text-xs font-semibold uppercase tracking-widest text-white">
            {article.tag}
          </span>
        </div>

        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl">
          {article.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600 border-b border-gray-200 pb-6">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {article.date}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {article.place}
          </span>
        </div>

        <div className="prose prose-lg mt-8 max-w-none">
          <p className="text-xl leading-relaxed text-gray-700">{article.excerpt}</p>
          <p className="mt-6 leading-relaxed text-gray-600">{article.body}</p>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-4">
            Related Stories
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {news
              .filter((n) => n.slug !== article.slug && n.color === article.color)
              .slice(0, 2)
              .map((n) => (
                <Link
                  key={n.slug}
                  to={`/news/${n.slug}`}
                  className="group flex gap-4 rounded-xl border border-gray-200 p-4 transition-all hover:border-red-500/40 hover:shadow-md"
                >
                  <div className={`h-20 w-20 shrink-0 rounded-lg ${pillarColor[n.color]}`} />
                  <div className="flex-1">
                    <h4 className="font-display text-sm font-semibold leading-snug text-gray-900 group-hover:text-red-500">
                      {n.title}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">{n.date}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
