import { Search, ShoppingCart, Menu, X, MapPin, User, LogOut, Package, Truck } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_TARGETS } from "@/fixes/navConfig"; // fix: nav scroll links
import SearchModal from "./SearchModal";

const navLinks = [
  { name: "HOME" },
  { name: "NEW" },
  { name: "ADDRESS" },
  { name: "BULK QUERIES" },
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
  const [userData, setUserData] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCartCount = () => {
      const saved = localStorage.getItem('gridox_cart');
      if (saved) {
        try {
          const items = JSON.parse(saved);
          const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
          setCartCount(count);
        } catch (e) { }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    const handleOpenMenu = () => setMenuOpen(true);
    window.addEventListener('openMobileMenu', handleOpenMenu);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('openMobileMenu', handleOpenMenu);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/dashboard', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        }
      } catch (error) {
        // silently fail
      }
    };
    fetchUserData();

    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      setUserData(null);
      setProfileOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed');
    }
  };

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
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="hidden md:block text-foreground hover:text-accent transition-colors"
          >
            <Search size={20} />
          </button>

          {userData ? (
            <div className="relative" ref={profileRef}>
              <button
                aria-label="Profile Menu"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#8b231a] font-bold hover:bg-rose-100 transition-colors cursor-pointer"
              >
                {userData.name.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-50 flex flex-col">
                    <span className="text-sm font-bold text-gray-900 truncate">{userData.name}</span>
                    <span className="text-xs text-gray-500 truncate">{userData.email}</span>
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <button
                      onClick={() => { setProfileOpen(false); navigate('/'); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <Package size={16} className="opacity-70" />
                      My Orders
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); navigate('/'); }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <Truck size={16} className="opacity-70" />
                      Track Orders
                    </button>
                    <div className="h-[1px] bg-gray-100 my-1 mx-2"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              aria-label="Account"
              onClick={() => navigate("/auth")}
              className="text-foreground hover:text-accent transition-colors"
            >
              <User size={20} />
            </button>
          )}

          <button aria-label="Cart" onClick={() => navigate("/cart")} className="text-foreground hover:text-accent transition-colors relative"> {/* fix: cart route */}
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#8b231a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-t border-border px-4 pb-4">
          {navLinks
            .filter(link => link.name !== "ADDRESS")
            .map((link) => (
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

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};

export default Header;
