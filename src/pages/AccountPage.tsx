import { useState } from "react";
import { User } from "lucide-react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

// TODO: Replace with real auth calls to your Express/Node backend connected to MongoDB Atlas
// POST /api/auth/login    { email, password }
// POST /api/auth/register { name, email, password }

type Mode = "login" | "register";

const AccountPage = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "register" && form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    // TODO: call MongoDB Atlas backend API here
    alert(`${mode === "login" ? "Login" : "Register"} submitted — connect your backend to proceed.`);
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8 gap-2">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <User size={24} className="text-muted-foreground" />
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-wide">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h1>
        </div>

        {/* Tab toggle */}
        <div className="flex border border-border mb-6">
          <button
            className={`flex-1 py-2.5 text-sm font-medium tracking-wider transition-colors ${mode === "login" ? "bg-foreground text-background" : "hover:bg-muted"}`}
            onClick={() => { setMode("login"); setError(""); }}
          >
            LOGIN
          </button>
          <button
            className={`flex-1 py-2.5 text-sm font-medium tracking-wider transition-colors ${mode === "register" ? "bg-foreground text-background" : "hover:bg-muted"}`}
            onClick={() => { setMode("register"); setError(""); }}
          >
            REGISTER
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium tracking-wider text-muted-foreground mb-1.5">FULL NAME</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium tracking-wider text-muted-foreground mb-1.5">EMAIL</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-wider text-muted-foreground mb-1.5">PASSWORD</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => set("password", e.target.value)}
              placeholder="••••••••"
              className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium tracking-wider text-muted-foreground mb-1.5">CONFIRM PASSWORD</label>
              <input
                type="password"
                required
                value={form.confirm}
                onChange={(e) => set("confirm", e.target.value)}
                placeholder="••••••••"
                className="w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-foreground text-background text-sm font-medium tracking-wider hover:opacity-80 transition-opacity mt-2"
          >
            {mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        </form>

        {mode === "login" && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            <button className="underline hover:text-foreground transition-colors">Forgot password?</button>
          </p>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default AccountPage;
