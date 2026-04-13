import { useState, useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tools from "./components/Tools";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const track = useMutation(api.analytics.track);

  useEffect(() => {
    track({ event: "page_view", data: "landing" });
  }, [track]);

  return (
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
      {/* Custom CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 85, 29, 0.4); }
          50% { box-shadow: 0 0 40px rgba(255, 85, 29, 0.6); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #141414;
        }

        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

        /* Selection color */
        ::selection {
          background: rgba(255, 85, 29, 0.3);
          color: white;
        }
      `}</style>

      {/* Auth Button (Top Right) */}
      <div className="fixed top-4 right-4 z-50">
        {isLoading ? null : isAuthenticated ? (
          <button
            onClick={() => signOut()}
            className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg border border-white/10 transition-all"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => setAuthModalOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg border border-white/10 transition-all"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Tools />
        <Pricing />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
