import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Calendar, MapPin, Newspaper,
  Globe2, TrendingUp, Sparkles, Play, Mail, ChevronRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { SiteHeader, SiteFooter } from "../layout/SiteHeader";
import { news, events, featured, pillarColor } from "../../lib/site-data";

const stats = [
  { value: "10", label: "African National Societies" },
  { value: "7", label: "Consortium Partners" },
  { value: "4", label: "Strategic Pillars" },
  { value: "120+", label: "Peer exchanges hosted" },
];

const Home = () => {
  const topNews = news.slice(0, 4);
  const topEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 70%, white 1px, transparent 1px)", backgroundSize: "48px 48px, 64px 64px" }} />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-red-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              MOFA II · Peer-to-Peer Learning Platform
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              A journey toward<br />
              <span className="italic text-red-500">self-reliance</span>,<br />
              led from Africa.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              The Localisation Alliance brings together 10 African National Societies and 7 Consortium Partners — sharing leadership, finance, and frontline practice to build stronger, locally led humanitarian systems.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about">
                <Button size="lg" className="bg-red-500 text-white hover:bg-red-600">
                  Discover the Alliance <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/news">
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white">
                  <Play className="mr-1 h-4 w-4" /> Latest stories
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Link to={`/news/${featured.slug}`} className="block rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md shadow-2xl transition-all hover:border-red-500/40 hover:bg-white/10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  Live · {featured.tag}
                </span>
                <span className="text-xs text-white/60">{featured.date}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight">{featured.title}</h3>
              <p className="mt-3 text-sm text-white/70">{featured.excerpt}</p>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-xs text-white/70"><MapPin className="h-3.5 w-3.5" /> {featured.place}</div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-red-400">Read story <ArrowUpRight className="h-3.5 w-3.5" /></span>
              </div>
            </Link>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="font-display text-3xl font-bold">{s.value}</div>
                  <div className="text-xs text-white/70">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-gray-200 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-8 text-center">
              <div className="font-display text-4xl font-bold text-gray-900">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500">
              <Newspaper className="h-3.5 w-3.5" /> Latest News
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">From the field, across the network</h2>
          </div>
          <Link to="/news" className="hidden items-center gap-1 text-sm font-medium text-red-500 hover:underline md:inline-flex">
            All news <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {topNews.map((n) => (
            <Link key={n.slug} to={`/news/${n.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:-translate-y-1 hover:border-red-500/40 shadow-md">
              <div className={`relative h-32 ${pillarColor[n.color]}`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                <span className="absolute bottom-3 left-4 text-[11px] font-semibold uppercase tracking-widest text-white">{n.tag}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold leading-snug text-gray-900 group-hover:text-red-500">{n.title}</h3>
                <div className="mt-auto flex items-center justify-between pt-5 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {n.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {n.place}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Events + Pillars */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500">
              <Calendar className="h-3.5 w-3.5" /> Upcoming Events
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-gray-900">Convening the network</h2>
            <p className="mt-3 max-w-xl text-gray-600">Webinars, working groups and in-person gatherings that move localisation forward.</p>

            <div className="mt-8 space-y-3">
              {topEvents.map((e) => (
                <Link key={e.slug} to={`/events/${e.slug}`} className="group flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-red-500/50 hover:shadow-lg">
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-gray-900 text-white">
                    <span className="font-display text-2xl font-bold leading-none">{e.day}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-red-400">{e.month}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-red-500">{e.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-600">
                      <span>{e.type}</span><span>·</span><span>{e.time}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-500" />
                </Link>
              ))}
              <Link to="/events" className="inline-flex items-center gap-1 pt-2 text-sm font-medium text-red-500 hover:underline">
                View all events <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500">
              <TrendingUp className="h-3.5 w-3.5" /> Four Pillars
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-gray-900">How we work</h2>
            <div className="mt-6 space-y-3">
              {[
                { name: "Leadership & Governance", color: "leadership", lead: "IFRC" },
                { name: "Branch Development", color: "branch", lead: "IFRC" },
                { name: "Resource Mobilisation", color: "resource", lead: "Swiss & Netherlands RC" },
                { name: "Finance Development", color: "finance", lead: "NorCross" },
              ].map((p) => (
                <Link key={p.name} to="/pillars" className={`group relative block overflow-hidden rounded-xl p-5 ${pillarColor[p.color]}`}>
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-xl transition-all group-hover:scale-150" />
                  <div className="relative">
                    <div className="font-display text-lg font-semibold">{p.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest opacity-75">Led by {p.lead}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <Globe2 className="h-10 w-10 text-red-500" />
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">Join a movement of African-led humanitarian renewal.</h2>
            <p className="mt-4 max-w-lg text-white/75">Get the monthly briefing — peer stories, opportunities and learning resources from across the Alliance.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input type="email" placeholder="your.email@nationalsociety.org" className="h-12 w-full rounded-md border border-white/20 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/50 backdrop-blur focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/40" />
            </div>
            <Button size="lg" className="h-12 bg-red-500 text-white hover:bg-red-600">
              Subscribe <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Home;
