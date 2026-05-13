import { useState } from "react";
import { BookOpen, FileText, Download, Search, Filter, FolderOpen, File, Calendar, User, HardDrive, Grid3x3, List } from "lucide-react";
import { publications } from "../../lib/site-data";

const categories = ["All", "Toolkit", "Report", "Case Study", "Guideline", "Brief"];

const stats = [
  { label: "Total Files", value: publications.length.toString(), icon: File },
  { label: "Toolkits", value: publications.filter(p => p.category === "Toolkit").length.toString(), icon: FolderOpen },
  { label: "Reports", value: publications.filter(p => p.category === "Report").length.toString(), icon: FileText },
  { label: "Storage", value: "2.4 GB", icon: HardDrive },
];

export default function Knowledge() {
  const [active, setActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card"); // Default to card view

  const filtered = publications.filter((p) => {
    const matchesCategory = active === "All" || p.category === active;
    const matchesSearch = searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-full bg-gray-50 p-6 space-y-6">

      {/* ── Repository Header ── */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-dash-navy">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-gray-900 mb-1">
                Knowledge Repository
              </h1>
              <p className="text-sm text-gray-600">
                Shared resources and documentation from the Localisation Alliance
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="flex justify-center mb-1">
                  <s.icon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="font-display text-xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    active === cat
                      ? "bg-dash-navy text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filtered.length}</span> of <span className="font-semibold text-gray-900">{publications.length}</span> files
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded transition-all ${
                  viewMode === "card"
                    ? "bg-dash-navy text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="Card view"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-all ${
                  viewMode === "list"
                    ? "bg-dash-navy text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      {filtered.length > 0 ? (
        viewMode === "card" ? (
          // Card View - Portrait Orientation
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((pub) => (
              <div
                key={pub.slug}
                className="group bg-white rounded-lg border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Card Visual Header - Portrait */}
                <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center border-b border-gray-100">
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-sm text-[10px] font-semibold text-gray-700 shadow-sm">
                      {pub.category}
                    </span>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-md">
                    <FileText className="h-10 w-10 text-blue-600" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-dash-red transition-colors line-clamp-3 mb-2 leading-snug min-h-[3.5rem]">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 mb-4 flex-1">
                    {pub.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span>{pub.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">{pub.fileType}</span>
                      <span className="text-gray-500">{pub.size}</span>
                    </div>
                    {pub.pages && (
                      <div className="text-xs text-gray-500">
                        {pub.pages} pages
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-3 bg-gray-50 border-t border-gray-100">
                  <button className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-dash-red text-white text-xs font-medium hover:bg-red-700 transition-colors">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List View
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-1">Size</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* File Rows */}
            <div className="divide-y divide-gray-200">
              {filtered.map((pub) => (
                <div
                  key={pub.slug}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group items-center"
                >
                  {/* File Name */}
                  <div className="col-span-6 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-dash-red transition-colors line-clamp-1 mb-0.5">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">{pub.description}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700">
                      {pub.category}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-2 flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                    {pub.date}
                  </div>

                  {/* Size */}
                  <div className="col-span-1 text-xs text-gray-600">
                    {pub.size}
                  </div>

                  {/* Action */}
                  <div className="col-span-1 text-right">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-dash-red text-white text-xs font-medium hover:bg-red-700 transition-colors">
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Last updated by <span className="font-medium text-gray-900">Alliance Team</span></span>
              </div>
              <div className="text-sm text-gray-500">
                Total size: 2.4 GB
              </div>
            </div>
          </div>
        )
      ) : (
        // Empty State
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
              No files found
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-sm">
              No files match your current filters or search query. Try adjusting your criteria.
            </p>
            <button
              onClick={() => {
                setActive("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-md bg-dash-navy text-white text-sm font-medium hover:bg-blue-900 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
