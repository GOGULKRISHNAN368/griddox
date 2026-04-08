import { Home, Menu, Search, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom"; // fix: cart/account routes

const items = [
  { icon: Home,         label: "HOME",    path: "/" },
  { icon: Menu,         label: "MENU",    path: null },
  { icon: Search,       label: "SEARCH",  path: null },
  { icon: LayoutGrid,   label: "SHOP",    path: null },
  { icon: ShoppingCart, label: "CART",    path: "/cart" },    // fix: cart route
  { icon: User,         label: "ACCOUNT", path: "/account" }, // fix: account route
];

const BottomNav = () => {
  const navigate = useNavigate(); // fix: cart/account routes
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border z-[1001] px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center py-3">
        {items.map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            onClick={() => path && navigate(path)}
            className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-[#8b231a] active:scale-90 transition-all bg-transparent border-none cursor-pointer flex-1"
          >
            <Icon size={20} strokeWidth={1.5} />
            <span className="text-[9px] font-bold tracking-widest">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
