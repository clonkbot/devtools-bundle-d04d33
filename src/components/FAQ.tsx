import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const faqs = [
  {
    question: "What tools are included?",
    answer: "The DevTools Bundle includes Nansen Pro ($150/mo), GitHub Copilot Business ($19/mo), and Claude Pro ($20/mo). You get full access to all features of each tool with a single subscription.",
  },
  {
    question: "How much do I save?",
    answer: "The individual tools cost $289/month combined. With our bundle at $139/month, you save $150/month — that's over 52% off. Over a year, you save $1,800.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes! There are no long-term contracts or commitments. You can cancel your subscription at any time, and you'll retain access until the end of your billing period.",
  },
  {
    question: "Do you offer team pricing?",
    answer: "Absolutely! Our Enterprise plan offers custom pricing for teams of any size, including volume discounts, SSO, admin dashboard, and dedicated account management.",
  },
  {
    question: "How do I access the tools?",
    answer: "After subscribing, you'll receive login credentials for each tool within 24 hours. We provide a unified dashboard to manage all your tool access in one place.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const track = useMutation(api.analytics.track);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    track({ event: "faq_open", data: faqs[index].question });
  };

  return (
    <section id="faq" className="py-20 md:py-32 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#FF551D]/10 border border-[#FF551D]/20 rounded-full text-[#FF551D] text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Common Questions
          </h2>
          <p className="text-white/50 text-base sm:text-lg">
            Everything you need to know about DevTools Bundle
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-colors"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left"
              >
                <span className="text-white font-medium text-sm md:text-base pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-white/50 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-4 md:px-6 pb-4 md:pb-6 text-white/60 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/50 mb-4">Still have questions?</p>
          <a
            href="mailto:support@devtools.bundle"
            className="inline-flex items-center gap-2 text-[#FF551D] hover:text-[#FF6A3D] font-medium transition-colors"
          >
            <span>Contact Support</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
