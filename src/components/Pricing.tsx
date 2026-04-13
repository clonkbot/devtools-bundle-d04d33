import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Pricing() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const joinWaitlist = useMutation(api.waitlist.join);
  const submitContact = useMutation(api.contact.submit);

  const handleProBundle = async () => {
    setSelectedPlan("pro");
  };

  const handleEnterprise = async () => {
    setSelectedPlan("enterprise");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedPlan) return;

    setLoading(true);
    try {
      if (selectedPlan === "pro") {
        const result = await joinWaitlist({ email, plan: "pro" });
        setSuccess(result.message);
      } else {
        await submitContact({ email, plan: "enterprise", message: "Enterprise inquiry" });
        setSuccess("We'll be in touch soon!");
      }
      setEmail("");
      setTimeout(() => {
        setSuccess(null);
        setSelectedPlan(null);
      }, 3000);
    } catch {
      setSuccess("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const proFeatures = [
    "Nansen Pro Access",
    "GitHub Copilot Business",
    "Claude Pro",
    "Priority Support",
    "Early Access to New Tools",
  ];

  const enterpriseFeatures = [
    "Everything in Pro",
    "Unlimited Team Members",
    "SSO & Admin Dashboard",
    "Dedicated Account Manager",
    "Custom Integrations",
    "SLA & Compliance",
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,85,29,0.08)_0%,_transparent_60%)]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#FF551D]/10 border border-[#FF551D]/20 rounded-full text-[#FF551D] text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-white/50 text-base sm:text-lg">
            No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Pro Bundle */}
          <div className="relative bg-white/[0.03] border-2 border-[#FF551D]/50 rounded-3xl p-6 md:p-8 overflow-hidden">
            {/* Best Value Badge */}
            <div className="absolute top-0 right-0 bg-[#FF551D] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
              BEST VALUE
            </div>

            {/* Glow Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF551D]/20 rounded-full blur-3xl" />

            <div className="relative">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Pro Bundle</h3>
              <p className="text-white/50 text-sm mb-6">Everything you need to build faster</p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-white/40 line-through text-xl">$289</span>
                <span className="text-4xl md:text-5xl font-black text-white">$139</span>
                <span className="text-white/50">/mo</span>
              </div>

              <ul className="space-y-3 mb-8">
                {proFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-white/80 text-sm md:text-base">
                    <svg className="w-5 h-5 text-[#FF551D] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={handleProBundle}
                className="w-full bg-[#FF551D] hover:bg-[#FF6A3D] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(255,85,29,0.4)] hover:shadow-[0_0_40px_rgba(255,85,29,0.6)]"
              >
                Get Pro Bundle
              </button>
            </div>
          </div>

          {/* Enterprise */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 transition-colors">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Enterprise</h3>
            <p className="text-white/50 text-sm mb-6">For teams that need more</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl md:text-5xl font-black text-white">Custom</span>
            </div>

            <ul className="space-y-3 mb-8">
              {enterpriseFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-white/80 text-sm md:text-base">
                  <svg className="w-5 h-5 text-white/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={handleEnterprise}
              className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* Email Modal */}
        {selectedPlan && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPlan(null)}>
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-white text-lg font-semibold">{success}</p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {selectedPlan === "pro" ? "Get Pro Bundle" : "Contact Sales"}
                  </h3>
                  <p className="text-white/50 text-sm mb-6">
                    {selectedPlan === "pro"
                      ? "Enter your email to join the waitlist"
                      : "Enter your email and we'll reach out"}
                  </p>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF551D]/50 mb-4"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#FF551D] hover:bg-[#FF6A3D] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
