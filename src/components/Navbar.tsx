import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF551D] to-[#FF8A5C] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">DevTools</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("tools")} className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Tools
          </button>
          <button onClick={() => scrollTo("pricing")} className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            Pricing
          </button>
          <button onClick={() => scrollTo("faq")} className="text-white/70 hover:text-white transition-colors text-sm font-medium">
            FAQ
          </button>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => scrollTo("pricing")}
          className="hidden md:block bg-[#FF551D] hover:bg-[#FF6A3D] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,85,29,0.4)] hover:shadow-[0_0_30px_rgba(255,85,29,0.6)]"
        >
          Get Bundle
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-3">
          <button onClick={() => scrollTo("tools")} className="block w-full text-left text-white/70 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5">
            Tools
          </button>
          <button onClick={() => scrollTo("pricing")} className="block w-full text-left text-white/70 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5">
            Pricing
          </button>
          <button onClick={() => scrollTo("faq")} className="block w-full text-left text-white/70 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5">
            FAQ
          </button>
          <button
            onClick={() => scrollTo("pricing")}
            className="w-full bg-[#FF551D] hover:bg-[#FF6A3D] text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all"
          >
            Get Bundle
          </button>
        </div>
      )}
    </nav>
  );
}
