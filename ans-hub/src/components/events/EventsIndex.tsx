import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowUpRight, Clock } from "lucide-react";
import { events } from "../../lib/site-data";

const formatBadge: Record<string, string> = {
  Webinar: "bg-blue-100 text-blue-700",
  "In-person": "bg-green-100 text-green-700",
  Hybrid: "bg-purple-100 text-purple-700",
};

export default function EventsIndex() {
  return (
    <div className="min-h-full bg-dash-bg p-6">
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-dash-red">
          <Calendar className="h-3.5 w-3.5" /> Events &amp; Gatherings
        </div>
        <h1 className="font-display text-2xl font-semibold text-gray-900">
          Convening the network
        </h1>
        <p className="mt-1 text-sm text-gray-500 max-w-2xl">
          Webinars, working groups and in-person gatherings that move localisation forward.
        </p>
      </div>

      <div className="space-y-3">
        {events.map((e) => (
          <Link
            key={e.slug}
            to={`/events/${e.slug}`}
            className="group flex items-start gap-5 rounded-xl border border-dash-border bg-white p-5 shadow-sm transition-all hover:border-dash-red/40 hover:shadow-md"
          >
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-dash-navy text-white">
              <span className="font-display text-2xl font-bold leading-none">{e.day}</span>
              <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-red-400">
                {e.month}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${formatBadge[e.format]}`}>
                  {e.format}
                </span>
              </div>
              <h2 className="font-display text-base font-semibold text-gray-900 group-hover:text-dash-red">
                {e.title}
              </h2>
              <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.location}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{e.time}</span>
              </div>
              <p className="mt-2 text-xs text-gray-500 line-clamp-2">{e.description}</p>
            </div>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-300 transition-colors group-hover:text-dash-red mt-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
