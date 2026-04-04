import { Home, Menu, Search, LayoutGrid, ShoppingCart, User } from "lucide-react";

const items = [
  { icon: Home, label: "HOME" },
  { icon: Menu, label: "MENU" },
  { icon: Search, label: "SEARCH" },
  { icon: LayoutGrid, label: "SHOP" },
  { icon: ShoppingCart, label: "CART" },
  { icon: User, label: "ACCOUNT" },
];

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center py-2">
        {items.map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            className="flex flex-col items-center gap-0.5 text-foreground hover:text-accent transition-colors"
          >
            <Icon size={18} />
            <span className="text-[9px] font-medium tracking-wide">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
