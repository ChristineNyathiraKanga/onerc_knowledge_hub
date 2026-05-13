import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "../layout/SiteHeader";
import { events } from "../../lib/site-data";

export default function EventsIndex() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500">
            <Calendar className="h-3.5 w-3.5" /> Events & Gatherings
          </div>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl">
            Convening the network
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Webinars, working groups and in-person gatherings that move localisation forward — peer exchanges, masterclasses and strategic convenings.
          </p>
        </div>

        <div className="space-y-4">
          {events.map((e) => (
            <Link
              key={e.slug}
              to={`/events/${e.slug}`}
              className="group flex items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-red-500/50 hover:shadow-lg"
            >
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-gray-900 text-white">
                <span className="font-display text-2xl font-bold leading-none">{e.day}</span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-red-400">
                  {e.month}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-semibold text-gray-900 group-hover:text-red-500">
                  {e.title}
                </h2>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {e.location}
                  </span>
                  <span>·</span>
                  <span>{e.type}</span>
                  <span>·</span>
                  <span>{e.time}</span>
                </div>
                <p className="mt-3 text-sm text-gray-600">{e.description}</p>
              </div>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-gray-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-500" />
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
