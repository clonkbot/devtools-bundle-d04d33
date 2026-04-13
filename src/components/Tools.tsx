const tools = [
  {
    name: "Nansen Pro",
    icon: "N",
    gradient: "from-blue-500 to-blue-600",
    description: "Professional on-chain analytics platform for crypto traders and investors. Track smart money, analyze wallets, and discover alpha.",
    tags: ["On-chain Analytics", "Crypto", "Smart Money"],
    worth: "$150/mo",
  },
  {
    name: "GitHub Copilot",
    icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    gradient: "from-gray-700 to-gray-900",
    description: "AI-powered coding assistant that helps you write code faster. Get intelligent suggestions, entire functions, and learn new patterns.",
    tags: ["AI Coding", "Autocomplete", "Code Generation"],
    worth: "$19/mo",
  },
  {
    name: "Claude Pro",
    icon: "C",
    gradient: "from-amber-600 to-amber-700",
    description: "Advanced AI assistant for complex coding, analysis, and problem-solving. Extended context windows and priority access.",
    tags: ["AI Assistant", "Code Analysis", "Problem Solving"],
    worth: "$20/mo",
  },
];

export default function Tools() {
  return (
    <section id="tools" className="py-20 md:py-32 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#FF551D]/10 border border-[#FF551D]/20 rounded-full text-[#FF551D] text-sm font-medium mb-4">
            What's Included
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Tools, One Price
          </h2>
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto">
            Get instant access to the developer tools that power the world's best teams.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {tools.map((tool, index) => (
            <div
              key={tool.name}
              className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {typeof tool.icon === "string" ? (
                  <span className="text-white font-bold text-xl">{tool.icon}</span>
                ) : (
                  tool.icon
                )}
              </div>

              {/* Name */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{tool.name}</h3>

              {/* Description */}
              <p className="text-white/50 text-sm md:text-base mb-6 leading-relaxed">{tool.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 rounded-lg text-white/60 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Worth */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-white/40 text-sm">Worth </span>
                <span className="text-[#FF551D] font-bold text-lg">{tool.worth}</span>
                <span className="text-white/40 text-sm"> alone</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Value */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
            <span className="text-white/50">Total Value:</span>
            <span className="text-white line-through text-xl">$289/mo</span>
            <span className="text-white/30">→</span>
            <span className="text-[#FF551D] font-bold text-2xl">$139/mo</span>
            <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
              SAVE 52%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
