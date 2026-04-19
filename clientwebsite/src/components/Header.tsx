import { Search, User, ShoppingCart, Menu, X, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_TARGETS } from "@/fixes/navConfig"; // fix: nav scroll links

const navLinks = [
  { name: "HOME" },
  { name: "NEW" },
  { name: "SHOP" },
  { name: "TRACK ORDER" },
  { name: "STORE LOCATOR" },
  { name: "ABOUT US" },
];

function handleNavClick(name: string, navigate: ReturnType<typeof useNavigate>) { // fix: nav scroll links
  const target = NAV_TARGETS[name];
  if (!target) return;
  if (target.type === "path") {
    navigate(target.value);
  } else {
    const el = document.getElementById(target.value);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on home page, navigate home then scroll
      navigate(`/#${target.value}`);
    }
  }
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // fix: nav scroll links

  return (
    <header className="bg-background border-b border-border sticky top-0 z-[1000]">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-foreground m-0">
          Gridox<span className="text-accent">!</span>
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.name, navigate)} // fix: nav scroll links
              className="text-sm font-medium tracking-wider text-foreground hover:text-accent transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-foreground hover:text-accent transition-colors">
            <Search size={20} />
          </button>
          <button 
            aria-label="Store Locator" 
            onClick={() => navigate("/store-locator")} 
            className="text-foreground hover:text-accent transition-colors"
          >
            <MapPin size={20} />
          </button>
          <button aria-label="Account" onClick={() => navigate("/account")} className="hidden md:block text-foreground hover:text-accent transition-colors"> {/* fix: account route */}
            <User size={20} />
          </button>
          <button aria-label="Cart" onClick={() => navigate("/cart")} className="text-foreground hover:text-accent transition-colors relative"> {/* fix: cart route */}
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-t border-border px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { handleNavClick(link.name, navigate); setMenuOpen(false); }} // fix: nav scroll links
              className="block w-full text-left py-3 text-sm font-medium tracking-wider text-foreground hover:text-accent border-b border-border last:border-b-0 bg-transparent cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
