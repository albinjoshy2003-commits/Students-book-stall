import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, Search, MapPin, Instagram, Menu, X, LogIn, LogOut, GraduationCap, School, User
} from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAuth: () => void;
  currentUser: { name: string; role: string } | null;
  onLogout: () => void;
  onTriggerSearch: () => void;
}

const ANNOUNCEMENTS = [
  "📚 Academic Year 2026-27 textbooks are fully in stock!",
  "🔥 Festive Combo Offer: Save up to ₹500 on Engineering semesters!",
  "🚚 Same Day Branch Pickup or Fast Express Home Delivery in Kerala!",
  "🎁 Special 30% Discount on Wiley and Oxford series publications!"
];

export default function Header({
  currentTab,
  setCurrentTab,
  onOpenAuth,
  currentUser,
  onLogout,
  onTriggerSearch
}: HeaderProps) {
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Announcement bar cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Sticky nav scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "categories", label: "Categories" },
    { id: "publishers", label: "Publishers" },
    { id: "offers", label: "Offers" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-brand-primary text-white py-1.5 px-4 text-xs font-medium border-b border-blue-800 text-center select-none overflow-hidden h-8 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={announcementIndex}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="truncate max-w-4xl tracking-wide font-display text-white/95"
          >
            {ANNOUNCEMENTS[announcementIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-md py-3" 
            : "bg-white py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Left: Logo */}
          <div 
            onClick={() => { setCurrentTab("home"); setMobileMenuOpen(false); }}
            className="flex items-center gap-2 cursor-pointer group"
            id="brand-logo"
          >
            <div className="bg-brand-primary group-hover:bg-brand-secondary p-2 rounded-xl text-brand-accent transition-colors duration-300 shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg tracking-tight text-slate-800 block leading-none">
                STUDENTS
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                Book Stall
              </span>
            </div>
          </div>

          {/* Center: Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                  currentTab === item.id
                    ? "bg-blue-50 text-brand-primary"
                    : "text-slate-600 hover:text-brand-primary hover:bg-slate-50"
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Quick search launcher */}
            <button
              onClick={onTriggerSearch}
              className="p-2 text-slate-500 hover:text-brand-primary rounded-full hover:bg-slate-100 transition-colors"
              title="Search Books"
              id="header-search-btn"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Social handles */}
            <a
              href="https://wa.me/919447012345"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-500 hover:text-green-600 rounded-full hover:bg-slate-100 transition-colors"
              title="WhatsApp Live Desk"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.012 14.06 1 11.457 1c-5.44 0-9.866 4.372-9.87 9.802 0 1.96.512 3.878 1.483 5.584L1.93 22.17l5.836-1.516z"/>
              </svg>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-500 hover:text-pink-600 rounded-full hover:bg-slate-100 transition-colors"
              title="Instagram feed"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <button
              onClick={() => setCurrentTab("contact")}
              className="p-2 text-slate-500 hover:text-brand-primary rounded-full hover:bg-slate-100 transition-colors"
              title="Our Branch Locations"
            >
              <MapPin className="w-5 h-5" />
            </button>

            {/* Auth section */}
            {currentUser ? (
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-full pl-3 pr-2 py-1 select-none">
                <div className="flex items-center gap-1.5">
                  {currentUser.role === "student" ? (
                    <GraduationCap className="w-4 h-4 text-brand-primary" />
                  ) : currentUser.role === "teacher" ? (
                    <School className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <User className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="text-xs font-semibold text-slate-700 capitalize max-w-[90px] truncate">
                    {currentUser.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1 text-slate-400 hover:text-brand-error rounded-full hover:bg-slate-200/50 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold px-4 py-2 rounded-full shadow-md shadow-brand-primary/10 hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                id="header-login-btn"
              >
                <LogIn className="w-4 h-4" /> Account Login
              </button>
            )}
          </div>

          {/* Hamburger button for mobile */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onTriggerSearch}
              className="p-2 text-slate-500 rounded-full hover:bg-slate-100"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 rounded-full hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-lg"
            >
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-center text-sm font-semibold transition-colors ${
                      currentTab === item.id
                        ? "bg-blue-50 text-brand-primary"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-around py-3 border-t border-slate-100">
                <a
                  href="https://wa.me/919447012345"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-slate-600 hover:text-green-600 text-xs font-semibold"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.012 14.06 1 11.457 1c-5.44 0-9.866 4.372-9.87 9.802 0 1.96.512 3.878 1.483 5.584L1.93 22.17l5.836-1.516z"/>
                  </svg>
                  WhatsApp
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-slate-600 hover:text-pink-600 text-xs font-semibold"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>

                <button
                  onClick={() => {
                    setCurrentTab("contact");
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-slate-600 hover:text-brand-primary text-xs font-semibold"
                >
                  <MapPin className="w-5 h-5" />
                  Branches
                </button>
              </div>

              {/* Login section on mobile */}
              <div className="border-t border-slate-100 pt-3">
                {currentUser ? (
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-2 rounded-xl">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-brand-primary" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 capitalize">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-500 capitalize">{currentUser.role} Account</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-xs font-bold text-brand-error px-3 py-1 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onOpenAuth();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-brand-primary text-white text-xs font-bold py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4" /> Login to Account
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
