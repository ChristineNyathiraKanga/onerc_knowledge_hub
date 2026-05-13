import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  TrendingUp,
  Users,
  Globe2,
  FileText,
  ChevronRight,
  Activity,
  Sparkles,
  HelpCircle,
  Plus,
  Minus,
  Newspaper,
} from "lucide-react";
import { useState } from "react";
import { news, events, publications, pillarColor } from "../../lib/site-data";

const stats = [
  { value: "10", label: "National Societies", icon: Globe2, color: "bg-blue-50 text-blue-600" },
  { value: "7", label: "Consortium Partners", icon: Users, color: "bg-purple-50 text-purple-600" },
  { value: "120+", label: "Peer Exchanges", icon: Activity, color: "bg-green-50 text-green-600" },
];

const quickActions = [
  { label: "Add Knowledge", icon: BookOpen, path: "/create/knowledge", color: "bg-blue-500" },
  { label: "News & Stories", icon: Newspaper, path: "/create/news", color: "bg-purple-500" },
];

const faqs = [
  {
    question: "How do I access knowledge resources?",
    answer: "Navigate to the Knowledge Hub section from the sidebar. You can browse, search, and filter resources by category, pillar, or file type."
  },
  {
    question: "How can I share content with the network?",
    answer: "Use the 'Create' section in the sidebar to add knowledge resources, news, or stories. Fill in the required details and submit for review."
  },
  {
    question: "What are the four pillars of localization?",
    answer: "The four pillars are: 1) Funding, 2) Partnerships, 3) Capacity, and 4) Coordination."
  },
];

export default function Home() {
  const recentNews = news.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);
  const featuredPubs = publications.slice(0, 4);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* LinkedIn-style container */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid gap-6 lg:grid-cols-12">

          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-3 space-y-4">
            {/* Profile Card */}
            <div className="bg-white rounded border border-gray-200 overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-dash-navy to-dash-red"></div>
              <div className="px-4 pb-4 -mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-16 w-16 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                    A
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Alliance Network</h3>
                <p className="text-sm text-gray-600 mb-4">Localisation Alliance · Africa</p>

                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Profile viewers</span>
                    <span className="font-bold text-dash-red">127</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Connections</span>
                    <span className="font-bold text-dash-red">340</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-4">Network Stats</h3>
              <div className="space-y-3">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded ${s.color}`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{s.value}</div>
                      <div className="text-xs text-gray-600">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed - Center */}
          <div className="lg:col-span-6 space-y-4">
            {/* Create Post Card */}
            <div className="bg-white rounded border border-gray-200 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600">
                  A
                </div>
                <button className="flex-1 text-left px-4 py-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                  Start a post
                </button>
              </div>
              <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
                {quickActions.map((action) => (
                  <Link
                    key={action.path}
                    to={action.path}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    <action.icon className="h-4 w-4 text-dash-red" />
                    <span>{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-dash-navy to-blue-900 rounded border border-gray-200 p-6 text-white">
              <div className="flex items-start gap-3">
                <Sparkles className="h-6 w-6 text-dash-red shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, Alliance! 👋</h2>
                  <p className="text-white/90 text-sm">
                    Empowering National Societies across Africa through peer learning, shared resources, and collaborative growth.
                  </p>
                </div>
              </div>
            </div>

            {/* News Feed */}
            <div className="space-y-4">
              {recentNews.map((n) => (
                <div key={n.slug} className="bg-white rounded border border-gray-200">
                  {/* Post Header */}
                  <div className="p-4 pb-3">
                    <div className="flex items-start gap-3">
                      <div className={`h-12 w-12 rounded shrink-0 ${pillarColor[n.color]} flex items-center justify-center text-white font-bold text-lg`}>
                        {n.tag.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900">{n.tag}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <span>{n.place}</span>
                          <span>·</span>
                          <span>{n.date}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <Link to={`/news/${n.slug}`} className="block px-4 pb-3 hover:bg-gray-50 transition-colors">
                    <h3 className="font-bold text-gray-900 mb-2 leading-snug">{n.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{n.excerpt}</p>
                  </Link>

                  {/* Post Actions */}
                  <div className="border-t border-gray-200 px-4 py-2 flex items-center justify-around">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">Like</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <Activity className="h-4 w-4" />
                      <span className="font-medium">Comment</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="font-medium">Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View More News */}
            <Link
              to="/news"
              className="block text-center py-3 bg-white rounded border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              View all news
            </Link>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            {/* Upcoming Events */}
            <div className="bg-white rounded border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Upcoming Events</h3>
                <Link to="/events" className="text-sm font-medium text-dash-red hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((e) => (
                  <Link
                    key={e.slug}
                    to={`/events/${e.slug}`}
                    className="block p-3 rounded border border-gray-200 hover:border-dash-red/30 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded bg-gray-100 border border-gray-200">
                        <span className="text-lg font-bold text-gray-900 leading-none">{e.day}</span>
                        <span className="text-[9px] font-bold uppercase text-dash-red mt-0.5">{e.month}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">{e.title}</h4>
                        <p className="text-xs text-gray-600">{e.location}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Knowledge Resources */}
            <div className="bg-white rounded border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Resources</h3>
                <Link to="/knowledge" className="text-sm font-medium text-dash-red hover:underline">
                  Browse
                </Link>
              </div>
              <div className="space-y-3">
                {featuredPubs.slice(0, 3).map((pub) => (
                  <div
                    key={pub.slug}
                    className="p-3 rounded border border-gray-200 hover:border-dash-red/30 hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${pillarColor[pub.pillar]}`}>
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mb-1">{pub.title}</h4>
                        <p className="text-[10px] text-gray-600">{pub.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Widget */}
            <div className="bg-white rounded border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-orange-600" />
                Quick Help
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left text-sm font-medium text-gray-900 hover:text-dash-red transition-colors flex items-start justify-between gap-2"
                    >
                      <span className="flex-1">{faq.question}</span>
                      {openFaqIndex === index ? (
                        <Minus className="h-4 w-4 shrink-0 mt-0.5" />
                      ) : (
                        <Plus className="h-4 w-4 shrink-0 mt-0.5" />
                      )}
                    </button>
                    {openFaqIndex === index && (
                      <p className="mt-2 text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
