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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center py-2">
        {items.map(({ icon: Icon, label, path }) => (
          <button
            key={label}
            onClick={() => path && navigate(path)}
            className="flex flex-col items-center gap-0.5 text-foreground hover:text-accent transition-colors bg-transparent border-none cursor-pointer"
          >
            <Icon size={18} />
            <span className="text-[9px] font-medium tracking-wide">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
