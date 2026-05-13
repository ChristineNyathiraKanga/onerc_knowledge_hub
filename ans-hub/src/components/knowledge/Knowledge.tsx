import { useFrappeGetCall } from "frappe-react-sdk";
import {
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  File,
  FileText,
  Filter,
  FolderOpen,
  Grid3x3,
  HardDrive,
  List,
  Search,
} from "lucide-react";
import { useState } from "react";

const categories = [
  "All",
  "Toolkit",
  "Report",
  "Case Study",
  "Guideline",
  "Brief",
  "Publication",
];

export default function Knowledge() {
  const [active, setActive] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const { data, isLoading } = useFrappeGetCall(
    "onerc_knowledge_hub.api.knowledge_hub.get_knowledge_hub_entries",
    {},
  );

  const publications = data?.message || [];

  const stats = [
    { label: "Total Files", value: publications.length.toString(), icon: File },
    {
      label: "Toolkits",
      value: publications
        .filter((p: any) => p.resource_category === "Toolkit")
        .length.toString(),
      icon: FolderOpen,
    },
    {
      label: "Reports",
      value: publications
        .filter((p: any) => p.resource_category === "Report")
        .length.toString(),
      icon: FileText,
    },
    {
      label: "Downloads",
      value: publications
        .reduce((acc: number, curr: any) => acc + (curr.download_count || 0), 0)
        .toString(),
      icon: HardDrive,
    },
  ];

  const filtered = publications.filter((p: any) => {
    const matchesCategory = active === "All" || p.resource_category === active;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return <div className="p-6">Loading repository...</div>;
  }

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
                Shared resources and documentation from the Localisation
                Alliance
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
                <div className="font-display text-xl font-bold text-gray-900">
                  {s.value}
                </div>
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
            <div className="flex gap-2 flex-wrap">
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
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {publications.length}
              </span>{" "}
              files
            </div>

            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("card")}
                className={`p-2 rounded transition-all ${
                  viewMode === "card"
                    ? "bg-dash-navy text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
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
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((pub: any) => (
              <div
                key={pub.name}
                className="group bg-white rounded-lg border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex items-center justify-center border-b border-gray-100">
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-sm text-[10px] font-semibold text-gray-700 shadow-sm">
                      {pub.resource_category}
                    </span>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-md">
                    <FileText className="h-10 w-10 text-blue-600" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-dash-red transition-colors line-clamp-2 mb-2 leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3 mb-4 flex-1">
                    {pub.summary}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span>{pub.published_date || "No date"}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">
                        {pub.language?.toUpperCase()}
                      </span>
                      <span className="text-gray-500">
                        {pub.contributing_ns}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 border-t border-gray-100">
                  {pub.file_attachment ? (
                    <a
                      href={pub.file_attachment}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-dash-red text-white text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>
                  ) : (
                    <a
                      href={pub.external_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View External
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Organization</div>
              <div className="col-span-1">Lang</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            <div className="divide-y divide-gray-200">
              {filtered.map((pub: any) => (
                <div
                  key={pub.name}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group items-center"
                >
                  <div className="col-span-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-blue-50">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-dash-red transition-colors line-clamp-1 mb-0.5">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {pub.summary}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700">
                      {pub.resource_category}
                    </span>
                  </div>

                  <div className="col-span-2 text-xs text-gray-600">
                    {pub.contributing_ns}
                  </div>

                  <div className="col-span-1 text-xs text-gray-600">
                    {pub.language?.toUpperCase()}
                  </div>

                  <div className="col-span-2 text-right">
                    {pub.file_attachment ? (
                      <a
                        href={pub.file_attachment}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-dash-red text-white text-xs font-medium hover:bg-red-700 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
                    ) : (
                      <a
                        href={pub.external_url}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 text-xs font-medium hover:bg-gray-50 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Link
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
              No files found
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-sm">
              No files match your current filters or search query.
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
