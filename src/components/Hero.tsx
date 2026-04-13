import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Hero() {
  const subscriberCount = useQuery(api.waitlist.getCount);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,85,29,0.15)_0%,_transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF551D]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FF551D]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-4">
          DEVTOOLS
          <span className="block bg-gradient-to-r from-[#FF551D] via-[#FF8A5C] to-[#FF551D] bg-clip-text text-transparent">
            BUNDLE
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/60 font-light mb-8 tracking-wide">
          Nansen + Copilot + Claude — <span className="text-white">One Package</span>
        </p>

        {/* Tool Logos Badge */}
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-6 py-3 mb-8 backdrop-blur-sm">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">N</span>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-black flex items-center justify-center border border-white/20">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">C</span>
          </div>
          <span className="text-white/50 text-sm ml-1 hidden sm:inline">Included</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={() => scrollTo("pricing")}
            className="w-full sm:w-auto bg-[#FF551D] hover:bg-[#FF6A3D] text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-[0_0_40px_rgba(255,85,29,0.5)] hover:shadow-[0_0_60px_rgba(255,85,29,0.7)] hover:scale-105"
          >
            Get Bundle — $139/mo
          </button>
          <button
            onClick={() => scrollTo("pricing")}
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-white/10 hover:border-white/20 transition-all"
          >
            View Plans
          </button>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex -space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-[#141414] flex items-center justify-center"
              >
                <span className="text-xs text-white/60">{["JD", "AK", "MR", "SL", "TC"][i]}</span>
              </div>
            ))}
          </div>
          <span className="text-white/50 text-sm ml-2">
            trusted by <span className="text-white font-semibold">{subscriberCount?.toLocaleString() ?? "2,450"}+</span> developers
          </span>
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {["Nansen Pro", "GitHub Copilot", "Claude Pro", "Priority Support", "50%+ Savings"].map((tag) => (
            <span
              key={tag}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-xs sm:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
