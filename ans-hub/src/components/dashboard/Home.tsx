import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg
              className="w-full h-full text-[#EE1C25]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.5 12.5H62.5V37.5H87.5V62.5H62.5V87.5H37.5V62.5H12.5V37.5H37.5V12.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">
            Society Hub
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-600">
          <a
            href="#features"
            className="hover:text-[#EE1C25] transition-colors"
          >
            Features
          </a>
          <a href="#network" className="hover:text-[#EE1C25] transition-colors">
            National Societies
          </a>
          <a
            href="#resources"
            className="hover:text-[#EE1C25] transition-colors"
          >
            Resources
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-gray-900"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-[#EE1C25] text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest hover:bg-[#d11920] transition-all shadow-md"
          >
            Join Network
          </Link>
        </div>
      </nav>

      <header className="px-6 py-24 md:py-32 max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 bg-red-50 text-[#EE1C25] text-[10px] font-black uppercase tracking-[0.2em] rounded mb-8 border border-red-100">
          Global Humanitarian Network
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.95] mb-8 tracking-tighter">
          COOPERATION <br />
          <span className="text-[#EE1C25]">WITHOUT BORDERS.</span>
        </h1>
        <p className="text-lg font-medium text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          The official peer-to-peer exchange for National Societies. Share
          intelligence, coordinate logistics, and build a resilient
          international community.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded hover:bg-gray-800 transition-all shadow-lg">
            Access Portal
          </button>
          <button className="w-full sm:w-auto px-10 py-4 border-2 border-gray-200 text-gray-900 text-xs font-bold uppercase tracking-widest rounded hover:bg-gray-50 transition-all">
            Documentation
          </button>
        </div>
      </header>

      <section className="border-y border-gray-100 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Societies", value: "150+" },
            { label: "Members", value: "12k" },
            { label: "Resources", value: "45k" },
            { label: "Deployments", value: "800" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-gray-900 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[10px] font-black text-[#EE1C25] uppercase tracking-[0.2em] mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">
              Strategic Collaboration
            </h2>
            <div className="w-20 h-2 bg-[#EE1C25] rounded-full"></div>
          </div>
          <p className="text-gray-500 font-medium max-w-sm">
            Leveraging technology to unify humanitarian efforts and streamline
            communication.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          <div className="group">
            <div className="w-14 h-14 bg-red-50 text-[#EE1C25] rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#EE1C25] group-hover:text-white transition-all shadow-sm">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-4 text-gray-900">
              Peer Exchange
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm font-medium">
              Real-time collaboration across sectors. Solve complex logistics
              and administrative hurdles via direct peer intelligence.
            </p>
          </div>

          <div className="group">
            <div className="w-14 h-14 bg-red-50 text-[#EE1C25] rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#EE1C25] group-hover:text-white transition-all shadow-sm">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-4 text-gray-900">
              Unified Registry
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm font-medium">
              A centralized repository for governance documents, response
              protocols, and shared training materials.
            </p>
          </div>

          <div className="group">
            <div className="w-14 h-14 bg-red-50 text-[#EE1C25] rounded-xl flex items-center justify-center mb-8 group-hover:bg-[#EE1C25] group-hover:text-white transition-all shadow-sm">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04a11.73 11.73 0 00-1.515 8.803c1.302 4.965 5.842 8.147 10.133 8.147 4.291 0 8.831-3.182 10.133-8.147a11.73 11.73 0 00-1.515-8.803z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-4 text-gray-900">
              Secure Protocol
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm font-medium">
              Enterprise-grade encryption and strict member verification ensure
              that communications remain within the network.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-[#EE1C25]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M37.5 12.5H62.5V37.5H87.5V62.5H62.5V87.5H37.5V62.5H12.5V37.5H37.5V12.5Z" />
            </svg>
            <span className="text-white font-black uppercase tracking-tighter">
              Society Hub
            </span>
          </div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} National Societies Interaction Hub
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
