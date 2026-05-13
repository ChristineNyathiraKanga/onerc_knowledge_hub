import { Users, TrendingUp, Building2, DollarSign } from "lucide-react";
import { SiteHeader, SiteFooter } from "../layout/SiteHeader";
import { pillarColor } from "../../lib/site-data";

export default function Pillars() {
  const pillars = [
    {
      name: "Leadership & Governance",
      color: "leadership",
      icon: Users,
      lead: "IFRC",
      description:
        "Strengthening National Society governance, leadership capacity and strategic planning — ensuring locally led decision-making and transparent, accountable structures.",
      objectives: [
        "Board and governance strengthening",
        "Strategic planning and organizational development",
        "Volunteer management and engagement",
        "Accountability frameworks and compliance",
      ],
    },
    {
      name: "Branch Development",
      color: "branch",
      icon: Building2,
      lead: "IFRC",
      description:
        "Building the capacity of National Society branches to deliver community-based services — from volunteer training to local service delivery and community engagement.",
      objectives: [
        "Branch capacity assessment and planning",
        "Community-based service delivery models",
        "Volunteer recruitment and retention",
        "Branch standards and quality frameworks",
      ],
    },
    {
      name: "Resource Mobilisation",
      color: "resource",
      icon: TrendingUp,
      lead: "Swiss & Netherlands RC",
      description:
        "Diversifying funding sources through domestic resource mobilisation, corporate partnerships and earned income — reducing dependency on international project funding.",
      objectives: [
        "Domestic donor engagement strategies",
        "Corporate partnership development",
        "Earned income and social enterprise models",
        "Membership and individual giving programmes",
      ],
    },
    {
      name: "Finance Development",
      color: "finance",
      icon: DollarSign,
      lead: "NorCross",
      description:
        "Modernising financial systems, controls and reporting — ensuring audit-ready, transparent financial management that meets international standards.",
      objectives: [
        "Financial systems and controls strengthening",
        "Audit readiness and compliance",
        "Multi-currency and project accounting",
        "Financial reporting and transparency",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-16">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-500">
            <TrendingUp className="h-3.5 w-3.5" /> Four Pillars
          </div>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-gray-900 md:text-6xl">
            How we work
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            The Alliance organizes its work across four strategic pillars — each led by a Consortium Partner, each focused on a critical dimension of National Society self-reliance.
          </p>
        </div>

        <div className="space-y-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.name}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-md transition-all hover:border-red-500/40 hover:shadow-xl"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                  <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ${pillarColor[pillar.color]}`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h2 className="font-display text-3xl font-semibold text-gray-900">
                        {pillar.name}
                      </h2>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
                        Led by {pillar.lead}
                      </span>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-3">
                        Key objectives
                      </h3>
                      <ul className="grid gap-2 md:grid-cols-2">
                        {pillar.objectives.map((obj, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-gray-200 bg-gray-50 p-12 text-center">
          <h2 className="font-display text-3xl font-semibold text-gray-900 mb-4">
            Peer-to-peer by design
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Each pillar operates through working groups, peer exchanges and joint learning activities — ensuring that knowledge flows directly between National Societies, supported by Consortium Partners.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
