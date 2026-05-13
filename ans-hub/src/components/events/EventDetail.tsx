import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { SiteHeader, SiteFooter } from "../layout/SiteHeader";
import { events } from "../../lib/site-data";
import { Button } from "../ui/button";

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  const formatBadgeStyles: Record<string, string> = {
    Webinar: "bg-blue-100 text-blue-700",
    "In-person": "bg-green-100 text-green-700",
    Hybrid: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to events
        </Link>

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-xl bg-gray-900 text-white">
            <span className="font-display text-3xl font-bold leading-none">{event.day}</span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-red-400">
              {event.month}
            </span>
          </div>
          <div>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${formatBadgeStyles[event.format]}`}>
              {event.format}
            </span>
          </div>
        </div>

        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-gray-900 md:text-5xl">
          {event.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600 border-b border-gray-200 pb-6">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {event.day} {event.month} {event.year}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> {event.time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {event.location}
          </span>
        </div>

        <div className="prose prose-lg mt-8 max-w-none">
          <p className="text-xl leading-relaxed text-gray-700">{event.description}</p>
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-8">
          <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
            Register for this event
          </h3>
          <p className="text-gray-600 mb-6">
            This event is open to members of the Localisation Alliance network. Sign in to register or contact the secretariat for access.
          </p>
          <Button className="bg-red-500 text-white hover:bg-red-600">
            Register now
          </Button>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-4">
            More upcoming events
          </h3>
          <div className="space-y-3">
            {events
              .filter((e) => e.slug !== event.slug)
              .slice(0, 3)
              .map((e) => (
                <Link
                  key={e.slug}
                  to={`/events/${e.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition-all hover:border-red-500/40 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-gray-900 text-white">
                    <span className="font-display text-lg font-bold leading-none">{e.day}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-red-400">
                      {e.month}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-sm font-semibold leading-snug text-gray-900 group-hover:text-red-500">
                      {e.title}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">{e.type}</p>
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
