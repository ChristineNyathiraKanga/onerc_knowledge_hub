import { Link } from "react-router-dom";
import { Calendar, MapPin, Newspaper, TrendingUp } from "lucide-react";
import { news, featured, pillarColor } from "../../lib/site-data";

export default function NewsIndex() {
  // Get all news except featured
  const regularNews = news.filter(n => n.slug !== featured.slug);

  return (
    <div className="min-h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center gap-2 mb-3">
            <Newspaper className="h-5 w-5 text-dash-red" />
            <span className="text-xs font-bold uppercase tracking-wider text-dash-red">
              News &amp; Stories
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            From the field, across the network
          </h1>
          <p className="mt-3 text-base text-gray-600 max-w-3xl">
            Updates, peer stories and results from National Societies and Consortium Partners.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Featured Story */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-dash-red" />
            <span className="text-xs font-bold uppercase tracking-wider text-dash-red">
              Featured Story
            </span>
          </div>

          <Link
            to={`/news/${featured.slug}`}
            className="group block overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
          >
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image/Color block - 2 columns */}
              <div className={`relative md:col-span-2 h-64 md:h-auto ${pillarColor[featured.color]}`}>
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 50%, white 2px, transparent 2px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-sm rounded">
                    {featured.tag}
                  </span>
                </div>
              </div>

              {/* Content - 3 columns */}
              <div className="md:col-span-3 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 leading-tight group-hover:text-dash-red transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base text-gray-600 leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {featured.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {featured.place}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Latest News Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Latest News</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularNews.map((n) => (
            <Link
              key={n.slug}
              to={`/news/${n.slug}`}
              className="group flex flex-col overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-dash-red/30"
            >
              {/* Category header */}
              <div className={`relative h-32 ${pillarColor[n.color]}`}>
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 50%, white 1.5px, transparent 1.5px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <span className="absolute top-4 left-4 inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-white/20 backdrop-blur-sm rounded">
                  {n.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-dash-red transition-colors">
                  {n.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {n.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-gray-500 border-t border-gray-100">
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
      </div>
    </div>
  );
}
