import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Star } from "lucide-react";
import { events } from "../../lib/site-data";

const formatBadge: Record<string, string> = {
  Webinar: "bg-blue-50 text-blue-700 border border-blue-200",
  "In-person": "bg-green-50 text-green-700 border border-green-200",
  Hybrid: "bg-purple-50 text-purple-700 border border-purple-200",
};

const formatColor: Record<string, string> = {
  Webinar: "bg-blue-500",
  "In-person": "bg-green-500",
  Hybrid: "bg-purple-500",
};

export default function EventsIndex() {
  const [featuredEvent, ...upcomingEvents] = events;

  return (
    <div className="min-h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-5 w-5 text-dash-red" />
            <span className="text-xs font-bold uppercase tracking-wider text-dash-red">
              Events &amp; Gatherings
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Convening the network
          </h1>
          <p className="mt-3 text-base text-gray-600 max-w-3xl">
            Webinars, working groups and in-person gatherings that move localisation forward.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Featured Event */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-4 w-4 text-dash-red" />
            <span className="text-xs font-bold uppercase tracking-wider text-dash-red">
              Next Major Event
            </span>
          </div>

          <Link
            to={`/events/${featuredEvent.slug}`}
            className="group block overflow-hidden rounded border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg"
          >
            <div className="grid md:grid-cols-5 gap-0">
              {/* Date block - 2 columns */}
              <div className={`relative md:col-span-2 h-64 md:h-auto ${formatColor[featuredEvent.format]} flex items-center justify-center`}>
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "radial-gradient(circle at 30% 50%, white 2px, transparent 2px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="relative text-center text-white">
                  <div className="text-7xl font-bold leading-none mb-2">{featuredEvent.day}</div>
                  <div className="text-2xl font-bold uppercase tracking-wider mb-1">{featuredEvent.month}</div>
                  <div className="text-lg opacity-90">{featuredEvent.year}</div>
                </div>
                <div className="absolute top-6 left-6">
                  <span className={`inline-block px-3 py-1.5 text-xs font-bold ${formatBadge[featuredEvent.format]} rounded`}>
                    {featuredEvent.format}
                  </span>
                </div>
              </div>

              {/* Content - 3 columns */}
              <div className="md:col-span-3 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 leading-tight group-hover:text-dash-red transition-colors">
                  {featuredEvent.title}
                </h2>
                <p className="mt-4 text-base text-gray-600 leading-relaxed">
                  {featuredEvent.description}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {featuredEvent.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {featuredEvent.time}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Upcoming Events */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        </div>

        <div className="space-y-4">
          {upcomingEvents.map((e) => (
            <Link
              key={e.slug}
              to={`/events/${e.slug}`}
              className="group flex items-start gap-6 rounded border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-dash-red/30"
            >
              {/* Date badge */}
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded border-2 border-gray-200 bg-gray-50">
                <span className="text-3xl font-bold leading-none text-gray-900">{e.day}</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-dash-red">
                  {e.month}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-3 py-1 text-xs font-bold ${formatBadge[e.format]} rounded`}>
                    {e.format}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-dash-red transition-colors">
                  {e.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {e.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {e.time}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {e.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
