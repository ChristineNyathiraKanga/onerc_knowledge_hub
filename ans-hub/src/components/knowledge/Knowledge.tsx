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
import { useMemo, useState } from "react";

interface KnowledgeEntry {
  name: string;
  title: string;
  resource_type: string;
  category: string;
  summary: string;
  description: string;
  file_attachment: string | null;
  external_url: string;
  language: string;
  contributing_ns: string;
  uploaded_by: string;
  status: string;
  published_date: string | null;
  download_count: number;
}

interface CategoryEntry {
  name: string;
}

export default function Knowledge() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const { data: entriesData, isLoading: entriesLoading } = useFrappeGetCall(
    "onerc_knowledge_hub.api.knowledge_hub.get_knowledge_hub_entries",
    {},
  );

  const { data: categoriesData } = useFrappeGetCall(
    "onerc_knowledge_hub.api.knowledge_hub.get_knowledge_hub_categories",
    {},
  );

  const entries: KnowledgeEntry[] = useMemo(
    () => entriesData?.message || [],
    [entriesData],
  );
  const categories: CategoryEntry[] = useMemo(
    () => categoriesData?.message || [],
    [categoriesData],
  );

  const stats = useMemo(
    () => [
      { label: "Total Files", value: entries.length.toString(), icon: File },
      {
        label: "Toolkits",
        value: entries
          .filter((e) => e.resource_type === "Toolkit")
          .length.toString(),
        icon: FolderOpen,
      },
      {
        label: "Reports",
        value: entries
          .filter((e) => e.resource_type === "Report")
          .length.toString(),
        icon: FileText,
      },
      {
        label: "Downloads",
        value: entries
          .reduce((acc, curr) => acc + (curr.download_count || 0), 0)
          .toString(),
        icon: HardDrive,
      },
    ],
    [entries],
  );

  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      const matchesCategory =
        activeCategory === "All" || e.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [entries, activeCategory, searchQuery]);

  if (entriesLoading) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-gray-500">
        Loading knowledge repository...
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 bg-gray-50 p-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-dash-navy">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="font-display mb-1 text-2xl font-semibold text-gray-900">
                Knowledge Repository
              </h1>
              <p className="text-sm text-gray-600">
                Shared resources and documentation from the Localisation
                Alliance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="mb-1 flex justify-center">
                  <s.icon className="h-5 w-5 text-dash-navy" />
                </div>
                <div className="font-display text-xl font-bold text-gray-900">
                  {s.value}
                </div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 transition-all placeholder:text-gray-400 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-dash-navy"
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === "All"
                    ? "bg-dash-navy text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                    activeCategory === cat.name
                      ? "bg-dash-navy text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredEntries.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {entries.length}
              </span>{" "}
              files
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode("card")}
                className={`rounded p-2 transition-all ${
                  viewMode === "card"
                    ? "bg-dash-navy text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded p-2 transition-all ${
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

      {filteredEntries.length > 0 ? (
        viewMode === "card" ? (
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredEntries.map((pub) => (
              <div
                key={pub.name}
                className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
              >
                <div className="relative flex items-center justify-center border-b border-gray-100 bg-gradient-to-br from-dash-navy/5 to-dash-navy/15 p-8">
                  <div className="absolute right-3 top-3">
                    <span className="inline-flex items-center rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
                      {pub.resource_type}
                    </span>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white shadow-md">
                    <FileText className="h-10 w-10 text-dash-navy" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-dash-red">
                    {pub.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-xs text-gray-600">
                    {pub.summary}
                  </p>

                  <div className="space-y-2 border-t border-gray-100 pt-3">
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

                <div className="border-t border-gray-100 bg-dash-navy/5 p-3">
                  {pub.file_attachment ? (
                    <a
                      href={pub.file_attachment}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-1.5 rounded-md bg-dash-red px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-red-700"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>
                  ) : (
                    <a
                      href={pub.external_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-dash-navy/5 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-600">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Organization</div>
              <div className="col-span-1">Lang</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredEntries.map((pub) => (
                <div
                  key={pub.name}
                  className="group grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50"
                >
                  <div className="col-span-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-dash-navy/10">
                      <FileText className="h-5 w-5 text-dash-navy" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 transition-colors group-hover:text-dash-red">
                        {pub.title}
                      </h3>
                      <p className="line-clamp-1 text-xs text-gray-500">
                        {pub.summary}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {pub.resource_type}
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
                        className="inline-flex items-center gap-1.5 rounded-md bg-dash-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </a>
                    ) : (
                      <a
                        href={pub.external_url}
                        className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
        <div className="rounded-lg border border-gray-200 bg-white p-16 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-dash-navy/10">
              <Search className="h-8 w-8 text-dash-navy" />
            </div>
            <h3 className="font-display mb-2 text-lg font-semibold text-gray-900">
              No files found
            </h3>
            <p className="mb-6 max-w-sm text-sm text-gray-600">
              No files match your current filters or search query.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="rounded-md bg-dash-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
