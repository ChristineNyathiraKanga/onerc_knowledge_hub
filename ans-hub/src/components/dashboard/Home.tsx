import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Calendar,
  MapPin,
  BookOpen,
  TrendingUp,
  Users,
  Globe2,
  FileText,
  ChevronRight,
  Activity,
  Sparkles,
  Target,
  Zap,
  HelpCircle,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";
import { news, events, publications, pillarColor } from "../../lib/site-data";

const stats = [
  { value: "10", label: "National Societies", icon: Globe2, color: "bg-blue-50 text-blue-600", accent: "bg-blue-500" },
  { value: "7", label: "Consortium Partners", icon: Users, color: "bg-purple-50 text-purple-600", accent: "bg-purple-500" },
  { value: "120+", label: "Peer Exchanges", icon: Activity, color: "bg-green-50 text-green-600", accent: "bg-green-500" },
];

const quickActions = [
  { label: "Add Knowledge", icon: BookOpen, path: "/create/knowledge", color: "bg-blue-500" },
  { label: "Create News", icon: TrendingUp, path: "/create/news", color: "bg-purple-500" },
  { label: "Share Story", icon: Sparkles, path: "/create/stories", color: "bg-pink-500" },
];

const faqs = [
  {
    question: "How do I access knowledge resources?",
    answer: "Navigate to the Knowledge Hub section from the sidebar. You can browse, search, and filter resources by category, pillar, or file type. Click on any resource to view details and download."
  },
  {
    question: "How can I share content with the network?",
    answer: "Use the 'Create' section in the sidebar to add knowledge resources, news, or stories. Fill in the required details and submit for review. Your content will be published after admin approval."
  },
  {
    question: "What are the four pillars of localization?",
    answer: "The four pillars are: 1) Funding - Direct and quality funding for local actors, 2) Partnerships - Equitable partnerships with mutual accountability, 3) Capacity - Long-term investment in local capacities, and 4) Coordination - Meaningful participation in coordination mechanisms."
  },
  {
    question: "How do I register for upcoming events?",
    answer: "Click on any event from the Upcoming Events section or visit the Events page. Each event detail page has a registration button or link. You'll receive a confirmation email with event details and joining instructions."
  },
  {
    question: "Who can join the Africa Localisation Hub?",
    answer: "The hub is primarily for National Society staff and volunteers across Africa. Consortium partners and authorized personnel can also access the platform after approval by administrators."
  },
  {
    question: "How do I update my profile information?",
    answer: "Click on your avatar in the top right corner and select 'Profile Settings'. You can update your contact information, position, national society affiliation, and notification preferences."
  },
];

export default function Home() {
  const recentNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 4);
  const featuredPubs = publications.slice(0, 4);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6 space-y-8">

      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-dash-navy via-dash-navy to-blue-900 p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-dash-red opacity-10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-dash-red" />
                <span className="text-xs font-semibold uppercase tracking-widest text-red-300">
                  Welcome Back
                </span>
              </div>
              <h1 className="font-display text-4xl font-bold mb-3 leading-tight">
                Good morning, Alliance 👋
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                Empowering National Societies across Africa through peer learning, shared resources, and collaborative growth.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className="group flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <action.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{action.label}</span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${s.color} shadow-lg`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-white leading-none mb-1">
                      {s.value}
                    </div>
                    <div className="text-sm text-white/70">{s.label}</div>
                  </div>
                </div>
                <div className={`absolute bottom-0 right-0 w-24 h-24 ${s.accent} opacity-5 rounded-full blur-2xl`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent News - Spans 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* News Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-dash-red/10">
                <TrendingUp className="h-5 w-5 text-dash-red" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-gray-900">Recent News</h2>
                <p className="text-xs text-gray-500">Latest updates from the network</p>
              </div>
            </div>
            <Link
              to="/news"
              className="flex items-center gap-1.5 text-sm font-medium text-dash-red hover:gap-2 transition-all group"
            >
              View all
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* News Cards */}
          <div className="space-y-4">
            {recentNews.map((n) => (
              <Link
                key={n.slug}
                to={`/news/${n.slug}`}
                className="group block relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-dash-red/30 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-5 p-6">
                  {/* Color Accent */}
                  <div className={`w-1.5 h-24 rounded-full ${pillarColor[n.color]} shrink-0`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-100 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                        {n.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-dash-red transition-colors leading-snug mb-2 line-clamp-2">
                      {n.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> {n.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {n.place}
                      </span>
                    </div>
                  </div>

                  <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-400 group-hover:text-dash-red group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Events */}
        <div className="space-y-6">
          {/* Events Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-gray-900">Upcoming Events</h2>
                <p className="text-xs text-gray-500">Mark your calendar</p>
              </div>
            </div>
            <Link
              to="/events"
              className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Event Cards */}
          <div className="space-y-3">
            {upcomingEvents.map((e) => (
              <Link
                key={e.slug}
                to={`/events/${e.slug}`}
                className="group block rounded-xl bg-white border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md transition-all duration-300 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-dash-navy to-blue-900 text-white shadow-md">
                    <span className="font-display text-xl font-bold leading-none">{e.day}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-widest text-red-400 mt-0.5">
                      {e.month}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 leading-snug line-clamp-2 mb-1.5 transition-colors">
                      {e.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 text-xs text-gray-500">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100">
                        {e.type}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100">
                        {e.time}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Knowledge Resources Section ── */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-gray-900">Knowledge Resources</h2>
              <p className="text-xs text-gray-500">Tools, reports & learning materials</p>
            </div>
          </div>
          <Link
            to="/knowledge"
            className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:gap-2 transition-all group"
          >
            Browse Library
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredPubs.map((pub) => (
            <div
              key={pub.slug}
              className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-green-300 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-5"
            >
              {/* Icon */}
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${pillarColor[pub.pillar]} mb-4 shadow-md`}>
                <FileText className="h-6 w-6" />
              </div>

              {/* Content */}
              <div className="mb-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-400">
                    {pub.category}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span className="text-[9px] text-gray-400">{pub.fileType}</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-green-600 transition-colors">
                  {pub.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">{pub.description}</p>
              </div>

              {/* Download Button */}
              <button className="w-full mt-auto rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-700 transition-all group-hover:border-green-500">
                <span className="flex items-center justify-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  Download
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <HelpCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-xs text-gray-500">Quick answers to common questions</p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                  openFaqIndex === index
                    ? "bg-orange-100 text-orange-600 rotate-180"
                    : "bg-gray-100 text-gray-400"
                }`}>
                  {openFaqIndex === index ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaqIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-5 pb-5 pt-0">
                  <div className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Footer */}
        <div className="rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200/50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Still have questions?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to help you with any questions or issues you may have.
              </p>
              <a
                href="mailto:support@ifrc.org"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
              >
                Contact Support
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
