import { useState } from "react";
import { User, Package, MapPin, Heart, RefreshCw, Headphones, Gift, ChevronRight, LogOut, Truck, RotateCcw, MessageSquare, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

// TODO: Replace with real MongoDB Atlas auth — POST /api/auth/login { email, password }
// Temporary test credentials: username "test", password "password"
const TEST_USER = { username: "test", password: "password", name: "Test User", email: "test@gridox.in" };

const MOCK_ORDERS = [
  { id: "GDX10023", date: "12 May 2025", status: "Delivered",  items: "Navy Gold Peplum Co-Ord Set",    total: 2999, tracking: "DTDC123456789" },
  { id: "GDX10019", date: "02 May 2025", status: "In Transit", items: "White Embroidered Kurti Set",     total: 2399, tracking: "DTDC987654321" },
  { id: "GDX10011", date: "18 Apr 2025", status: "Delivered",  items: "Pink Lounge Set",                total: 1499, tracking: "DTDC112233445" },
];

const MOCK_WISHLIST = [
  { id: "pc1", name: "Navy Gold Printed Peplum Co-Ord Set", price: 2999, originalPrice: 5999 },
  { id: "rs1", name: "Orange Raw Silk Kurta Set",           price: 6949, originalPrice: 13999 },
  { id: "lw2", name: "Printed Kaftan Lounge Dress",         price: 1799, originalPrice: 3499 },
];

const MOCK_ADDRESSES = [
  { id: 1, label: "Home", line1: "12, Rose Garden, Anna Nagar", city: "Chennai", state: "Tamil Nadu", pin: "600 040", phone: "+91 99999 99999", default: true },
  { id: 2, label: "Work", line1: "45, Tech Park, OMR",          city: "Chennai", state: "Tamil Nadu", pin: "600 119", phone: "+91 88888 88888", default: false },
];

const MOCK_REWARDS = { points: 340, tier: "Silver", nextTier: "Gold", pointsToNext: 160 };

type Section = "overview" | "orders" | "track" | "wishlist" | "buyagain" | "addresses" | "rewards" | "service";

const statusColor: Record<string, string> = {
  Delivered:   "text-green-700 bg-green-100",
  "In Transit":"text-blue-700 bg-blue-100",
  Processing:  "text-yellow-700 bg-yellow-100",
  Cancelled:   "text-red-700 bg-red-100",
};

const AccountPage = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ username: "", name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [section, setSection] = useState<Section>("overview");
  const [trackInput, setTrackInput] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      // TODO: replace with POST /api/auth/login
      if (form.username === TEST_USER.username && form.password === TEST_USER.password) {
        setLoggedIn(true);
      } else {
        setError("Invalid username or password.");
      }
    } else {
      if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
      // TODO: replace with POST /api/auth/register
      alert("Registration submitted — connect your backend to proceed.");
    }
  };

  const handleTrack = () => {
    const found = MOCK_ORDERS.find(o => o.id === trackInput.trim() || o.tracking === trackInput.trim());
    setTrackedOrder(found ?? null);
    if (!found) setError("No order found with that ID or tracking number.");
    else setError("");
  };

  const inputCls = "w-full border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors";

  // ── Login / Register ─────────────────────────────────────────────────────────
  if (!loggedIn) return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8 gap-2">
          <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center">
            <User size={24} className="text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold tracking-wide">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h1>
          {mode === "login" && (
            <p className="text-xs text-muted-foreground">Test: username <b>test</b> / password <b>password</b></p>
          )}
        </div>

        <div className="flex border border-border mb-6">
          <button className={`flex-1 py-2.5 text-sm font-medium tracking-wider transition-colors ${mode === "login" ? "bg-primary text-primary-foreground" : "hover:bg-card"}`} onClick={() => { setMode("login"); setError(""); }}>LOGIN</button>
          <button className={`flex-1 py-2.5 text-sm font-medium tracking-wider transition-colors ${mode === "register" ? "bg-primary text-primary-foreground" : "hover:bg-card"}`} onClick={() => { setMode("register"); setError(""); }}>REGISTER</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium tracking-wider text-muted-foreground mb-1.5">FULL NAME</label>
              <input type="text" required value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your name" className={inputCls} />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium tracking-wider text-muted-foreground mb-1.5">{mode === "login" ? "USERNAME" : "EMAIL"}</label>
            <input type={mode === "login" ? "text" : "email"} required value={mode === "login" ? form.username : form.email} onChange={e => set(mode === "login" ? "username" : "email", e.target.value)} placeholder={mode === "login" ? "username" : "you@example.com"} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium tracking-wider text-muted-foreground mb-1.5">PASSWORD</label>
            <input type="password" required value={form.password} onChange={e => set("password", e.target.value)} placeholder="••••••••" className={inputCls} />
          </div>
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium tracking-wider text-muted-foreground mb-1.5">CONFIRM PASSWORD</label>
              <input type="password" required value={form.confirm} onChange={e => set("confirm", e.target.value)} placeholder="••••••••" className={inputCls} />
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" className="w-full py-3 bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:opacity-90 transition-opacity mt-2">
            {mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        </form>
      </div>
      <BottomNav />
    </div>
  );

  // ── Dashboard ────────────────────────────────────────────────────────────────
  const menuItems: { id: Section; icon: React.ElementType; label: string }[] = [
    { id: "overview",  icon: User,         label: "My Account" },
    { id: "orders",    icon: Package,      label: "My Orders" },
    { id: "track",     icon: Truck,        label: "Track Order" },
    { id: "wishlist",  icon: Heart,        label: "Wishlist" },
    { id: "buyagain",  icon: RefreshCw,    label: "Buy Again" },
    { id: "addresses", icon: MapPin,       label: "My Addresses" },
    { id: "rewards",   icon: Gift,         label: "Rewards" },
    { id: "service",   icon: Headphones,   label: "Customer Service" },
  ];

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <aside className="md:w-60 shrink-0">
          <div className="bg-card rounded-sm p-4 mb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {TEST_USER.name[0]}
            </div>
            <div>
              <p className="font-medium text-sm">{TEST_USER.name}</p>
              <p className="text-xs text-muted-foreground">{TEST_USER.email}</p>
            </div>
          </div>
          <nav className="space-y-0.5">
            {menuItems.map(({ id, icon: Icon, label }) => (
              <button key={id} onClick={() => setSection(id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-sm transition-colors ${section === id ? "bg-primary text-primary-foreground" : "hover:bg-card text-foreground"}`}>
                <span className="flex items-center gap-2.5"><Icon size={15} />{label}</span>
                <ChevronRight size={14} />
              </button>
            ))}
            <button onClick={() => { setLoggedIn(false); navigate("/"); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-destructive hover:bg-card rounded-sm transition-colors mt-2">
              <LogOut size={15} />Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">

          {/* Overview */}
          {section === "overview" && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold">Welcome back, {TEST_USER.name.split(" ")[0]}!</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Orders",     value: MOCK_ORDERS.length,    id: "orders"    as Section },
                  { label: "Wishlist",   value: MOCK_WISHLIST.length,  id: "wishlist"  as Section },
                  { label: "Addresses",  value: MOCK_ADDRESSES.length, id: "addresses" as Section },
                  { label: "Reward Pts", value: MOCK_REWARDS.points,   id: "rewards"   as Section },
                ].map(item => (
                  <button key={item.label} onClick={() => setSection(item.id)}
                    className="bg-card rounded-sm p-4 text-center hover:bg-primary hover:text-primary-foreground transition-colors">
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-xs tracking-wider mt-1">{item.label}</p>
                  </button>
                ))}
              </div>
              <div className="border border-border rounded-sm p-4">
                <p className="text-xs font-medium tracking-wider text-muted-foreground mb-3">RECENT ORDER</p>
                {MOCK_ORDERS[0] && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{MOCK_ORDERS[0].id}</p>
                      <p className="text-xs text-muted-foreground">{MOCK_ORDERS[0].items}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[MOCK_ORDERS[0].status]}`}>{MOCK_ORDERS[0].status}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders */}
          {section === "orders" && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold">My Orders</h2>
              {MOCK_ORDERS.map(order => (
                <div key={order.id} className="border border-border rounded-sm p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{order.id}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[order.status]}`}>{order.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.items}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{order.date}</span>
                    <span className="font-medium text-foreground">₹{order.total.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => { setTrackInput(order.id); setSection("track"); }} className="text-xs text-primary underline">Track</button>
                    <button className="text-xs text-primary underline">Invoice</button>
                    {order.status === "Delivered" && <button onClick={() => setSection("service")} className="text-xs text-primary underline">Return / Refund</button>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Track Order */}
          {section === "track" && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold">Track Order</h2>
              <div className="flex gap-2">
                <input value={trackInput} onChange={e => setTrackInput(e.target.value)} placeholder="Enter Order ID or Tracking Number" className="flex-1 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-background transition-colors" />
                <button onClick={handleTrack} className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">TRACK</button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {trackedOrder && (
                <div className="border border-border rounded-sm p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{trackedOrder.id}</p>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[trackedOrder.status]}`}>{trackedOrder.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{trackedOrder.items}</p>
                  <p className="text-xs text-muted-foreground">Tracking No: {trackedOrder.tracking}</p>
                  <div className="space-y-3 pt-2">
                    {[
                      { label: "Order Placed",        done: true },
                      { label: "Packed & Dispatched", done: true },
                      { label: "In Transit",          done: trackedOrder.status !== "Processing" },
                      { label: "Out for Delivery",    done: trackedOrder.status === "Delivered" },
                      { label: "Delivered",           done: trackedOrder.status === "Delivered" },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${step.done ? "bg-primary" : "bg-muted"}`} />
                        <p className={`text-sm ${step.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Wishlist */}
          {section === "wishlist" && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold">Wishlist</h2>
              {MOCK_WISHLIST.map(item => (
                <div key={item.id} className="border border-border rounded-sm p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-bold text-primary">₹{item.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground line-through">₹{item.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <button onClick={() => navigate("/cart")} className="shrink-0 px-4 py-2 bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">ADD TO CART</button>
                </div>
              ))}
            </div>
          )}

          {/* Buy Again */}
          {section === "buyagain" && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold">Buy Again</h2>
              {MOCK_ORDERS.filter(o => o.status === "Delivered").map(order => (
                <div key={order.id} className="border border-border rounded-sm p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{order.items}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Ordered on {order.date}</p>
                  </div>
                  <button onClick={() => navigate("/cart")} className="shrink-0 px-4 py-2 bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity">BUY AGAIN</button>
                </div>
              ))}
            </div>
          )}

          {/* Addresses */}
          {section === "addresses" && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold">My Addresses</h2>
              {MOCK_ADDRESSES.map(addr => (
                <div key={addr.id} className="border border-border rounded-sm p-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-wider bg-muted text-primary px-2 py-0.5 rounded-full">{addr.label}</span>
                    {addr.default && <span className="text-xs text-muted-foreground">Default</span>}
                  </div>
                  <p className="text-sm">{addr.line1}</p>
                  <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} — {addr.pin}</p>
                  <p className="text-sm text-muted-foreground">{addr.phone}</p>
                  <div className="flex gap-3 pt-1">
                    <button className="text-xs text-primary underline">Edit</button>
                    <button className="text-xs text-primary underline">Remove</button>
                  </div>
                </div>
              ))}
              <button className="w-full py-2.5 border border-primary text-primary text-sm font-medium tracking-wider hover:bg-card transition-colors">+ ADD NEW ADDRESS</button>
            </div>
          )}

          {/* Rewards */}
          {section === "rewards" && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold">Rewards</h2>
              <div className="bg-primary text-primary-foreground rounded-sm p-6 space-y-2">
                <div className="flex items-center gap-2"><Star size={18} /><span className="text-sm font-medium tracking-wider">{MOCK_REWARDS.tier} Member</span></div>
                <p className="text-4xl font-bold">{MOCK_REWARDS.points} <span className="text-lg font-normal opacity-80">pts</span></p>
                <p className="text-xs opacity-80">{MOCK_REWARDS.pointsToNext} more points to reach {MOCK_REWARDS.nextTier}</p>
                <div className="w-full bg-primary-foreground/20 rounded-full h-1.5 mt-2">
                  <div className="bg-primary-foreground h-1.5 rounded-full" style={{ width: `${(MOCK_REWARDS.points / (MOCK_REWARDS.points + MOCK_REWARDS.pointsToNext)) * 100}%` }} />
                </div>
              </div>
              <div className="border border-border rounded-sm p-4 space-y-2">
                <p className="text-xs font-medium tracking-wider text-muted-foreground">HOW TO EARN</p>
                {[["Every ₹100 spent", "10 pts"], ["Write a review", "25 pts"], ["Refer a friend", "100 pts"], ["Birthday bonus", "50 pts"]].map(([action, pts]) => (
                  <div key={action} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                    <span>{action}</span><span className="font-medium text-primary">{pts}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Service */}
          {section === "service" && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-bold">Customer Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { icon: RotateCcw,    label: "Return Request", desc: "Initiate a return within 7 days" },
                  { icon: RefreshCw,    label: "Refund Status",  desc: "Check your refund progress" },
                  { icon: MessageSquare,label: "Complaint",      desc: "Raise a complaint or issue" },
                ].map(({ icon: Icon, label, desc }) => (
                  <button key={label} className="border border-border rounded-sm p-4 text-left hover:border-primary hover:bg-card transition-colors space-y-2">
                    <Icon size={20} className="text-primary" />
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </button>
                ))}
              </div>
              <div className="border border-border rounded-sm p-4 space-y-3">
                <p className="text-xs font-medium tracking-wider text-muted-foreground">RAISE A TICKET</p>
                <select className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-background">
                  <option>Select issue type</option>
                  <option>Return</option>
                  <option>Refund</option>
                  <option>Wrong item received</option>
                  <option>Damaged product</option>
                  <option>Other</option>
                </select>
                <textarea rows={3} placeholder="Describe your issue..." className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-background resize-none" />
                <button className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">SUBMIT TICKET</button>
              </div>
            </div>
          )}

        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default AccountPage;
