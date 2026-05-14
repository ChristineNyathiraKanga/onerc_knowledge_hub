import { useFrappeCreateDoc, useFrappeGetCall } from "frappe-react-sdk";
import {
    ArrowLeft,
    BookOpen,
    Check,
    FileText,
    Globe,
    Loader2,
    Save,
    Upload,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface CategoryEntry {
  name: string;
}

interface LanguageEntry {
  name: string;
}

export default function NewKnowledge() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    language: "",
    resource_type: "",
    tools_subcategory: "",
    summary: "",
    description: "",
    external_url: "",
    file_attachment: "",
    report_impact: "Yes",
    metric_type: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createDoc } = useFrappeCreateDoc();

  const { data: categoriesData } = useFrappeGetCall(
    "onerc_knowledge_hub.api.knowledge_hub.get_knowledge_hub_categories",
    {},
  );

  const { data: languagesData } = useFrappeGetCall(
    "frappe.client.get_list",
    {
      doctype: "Language",
      fields: ["name"],
      limit_page_length: 200,
    },
  );

  const categories: CategoryEntry[] = useMemo(
    () => categoriesData?.message || [],
    [categoriesData],
  );

  const languages: LanguageEntry[] = useMemo(
    () => languagesData?.message || [],
    [languagesData],
  );

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const doc = await createDoc("Knowledge Hub", {
        ...form,
        status: "Draft",
      });

      navigate(`/knowledge/${doc.name}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Link
            to="/knowledge"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-dash-red"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Knowledge Repository
          </Link>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-dash-red/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-dash-red">
                <BookOpen className="h-3.5 w-3.5" />
                Create Resource
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900">
                Add New Knowledge Resource
              </h1>

              <p className="mt-4 text-base leading-relaxed text-gray-600">
                Upload publications, reports, templates, and other shared
                learning resources for the network.
              </p>
            </div>

            <div className="hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-sm lg:block">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-dash-navy/10">
                <FileText className="h-8 w-8 text-dash-navy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900">
                Resource Details
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Provide the main information about this knowledge resource.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Title
                </label>

                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Enter resource title"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-dash-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Category
                </label>

                <select
                  required
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm text-gray-900 focus:border-dash-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                >
                  <option value="">Select category</option>

                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Language
                </label>

                <select
                  required
                  value={form.language}
                  onChange={(e) => updateField("language", e.target.value)}
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm text-gray-900 focus:border-dash-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                >
                  <option value="">Select language</option>

                  {languages.map((lang) => (
                    <option key={lang.name} value={lang.name}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Resource Type
                </label>

                <select
                  required
                  value={form.resource_type}
                  onChange={(e) =>
                    updateField("resource_type", e.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm text-gray-900 focus:border-dash-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                >
                  <option value="">Select type</option>
                  <option value="Publication">Publication</option>
                  <option value="Report">Report</option>
                  <option value="Tools & Templates">
                    Tools & Templates
                  </option>
                </select>
              </div>

              {form.resource_type === "Tools & Templates" && (
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-800">
                    Tools Subcategory
                  </label>

                  <select
                    value={form.tools_subcategory}
                    onChange={(e) =>
                      updateField("tools_subcategory", e.target.value)
                    }
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm text-gray-900 focus:border-dash-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                  >
                    <option value="">Select subcategory</option>
                    <option value="Strategy Templates">
                      Strategy Templates
                    </option>
                    <option value="Institutional Policy Templates">
                      Institutional Policy Templates
                    </option>
                    <option value="Tools & Frameworks">
                      Tools & Frameworks
                    </option>
                    <option value="Proposal & Resource Mobilisation Templates">
                      Proposal & Resource Mobilisation Templates
                    </option>
                  </select>
                </div>
              )}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Summary
                </label>

                <textarea
                  rows={4}
                  value={form.summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  placeholder="Short overview of the resource"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-dash-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Full Description
                </label>

                <textarea
                  rows={8}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Detailed description of the resource"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-dash-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900">
                Resource Access
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                Add either an uploaded file or an external resource link.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  File Attachment
                </label>

                <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Upload className="h-7 w-7 text-dash-navy" />
                  </div>

                  <p className="mt-4 text-sm font-medium text-gray-700">
                    Upload via Frappe Attach field integration
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    PDF, Word, Excel and other supported documents
                  </p>

                  <input
                    type="text"
                    value={form.file_attachment}
                    onChange={(e) =>
                      updateField("file_attachment", e.target.value)
                    }
                    placeholder="/files/document.pdf"
                    className="mt-5 h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900 focus:border-dash-red focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  External URL
                </label>

                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Globe className="h-7 w-7 text-dash-navy" />
                  </div>

                  <input
                    type="url"
                    value={form.external_url}
                    onChange={(e) =>
                      updateField("external_url", e.target.value)
                    }
                    placeholder="https://example.com/resource"
                    className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-sm text-gray-900 focus:border-dash-red focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900">
                Impact Reporting
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Report Impact
                </label>

                <select
                  value={form.report_impact}
                  onChange={(e) =>
                    updateField("report_impact", e.target.value)
                  }
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm text-gray-900 focus:border-dash-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Metric Type
                </label>

                <input
                  type="text"
                  value={form.metric_type}
                  onChange={(e) => updateField("metric_type", e.target.value)}
                  placeholder="Enter metric type"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-dash-red focus:bg-white focus:outline-none focus:ring-4 focus:ring-dash-red/10"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100">
                <Check className="h-5 w-5 text-emerald-700" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Ready to publish
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-gray-600">
                  Your resource will initially be saved as a draft.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-dash-red px-8 text-sm font-black uppercase tracking-wider text-white transition-all hover:scale-[1.02] hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Resource
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}