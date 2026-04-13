import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      await signIn("password", formData);
      onClose();
    } catch (err) {
      setError(flow === "signIn" ? "Invalid credentials" : "Could not create account");
    }
    setLoading(false);
  };

  const handleAnonymous = async () => {
    setLoading(true);
    try {
      await signIn("anonymous");
      onClose();
    } catch {
      setError("Could not sign in");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-white mb-2">
          {flow === "signIn" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-white/50 text-sm mb-6">
          {flow === "signIn" ? "Sign in to manage your subscription" : "Join thousands of developers"}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@company.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF551D]/50"
              required
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF551D]/50"
              required
            />
          </div>
          <input name="flow" type="hidden" value={flow} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF551D] hover:bg-[#FF6A3D] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-all"
          >
            {loading ? "Loading..." : flow === "signIn" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          onClick={handleAnonymous}
          disabled={loading}
          className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all mb-4"
        >
          Continue as Guest
        </button>

        <p className="text-center text-white/50 text-sm">
          {flow === "signIn" ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
            className="text-[#FF551D] hover:text-[#FF6A3D] font-medium"
          >
            {flow === "signIn" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
