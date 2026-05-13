import { Users, TrendingUp, Building2, DollarSign, ArrowRight } from "lucide-react";
import { pillarColor } from "../../lib/site-data";

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

export default function Pillars() {
  return (
    <div className="min-h-full bg-dash-bg p-6">
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-dash-red">
          <TrendingUp className="h-3.5 w-3.5" /> Four Pillars
        </div>
        <h1 className="font-display text-2xl font-semibold text-gray-900">How we work</h1>
        <p className="mt-1 text-sm text-gray-500 max-w-2xl">
          Each pillar is led by a Consortium Partner, focused on a critical dimension of National Society self-reliance.
        </p>
      </div>

      <div className="space-y-4">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.name}
              className="rounded-xl border border-dash-border bg-white shadow-sm overflow-hidden"
            >
              {/* Pillar colour header */}
              <div className={`flex items-center gap-4 px-6 py-4 ${pillarColor[pillar.color]}`}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-semibold text-white">{pillar.name}</h2>
                  <p className="text-[11px] uppercase tracking-widest text-white/70">Led by {pillar.lead}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-600 leading-relaxed mb-5">{pillar.description}</p>
                <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                  Key objectives
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {pillar.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-dash-red" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-dash-border bg-white p-6 shadow-sm text-center">
        <h2 className="font-display text-lg font-semibold text-gray-900 mb-2">
          Peer-to-peer by design
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-gray-500">
          Each pillar operates through working groups, peer exchanges and joint learning activities — ensuring knowledge flows directly between National Societies.
        </p>
      </div>
    </div>
  );
}
