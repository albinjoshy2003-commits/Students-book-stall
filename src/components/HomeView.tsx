import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { Book, Category, Publisher } from "../types";
import { BOOKS, CATEGORIES, PUBLISHERS, REVIEWS, COMBOS } from "../data";

interface HomeViewProps {
  onBookClick: (id: string) => void;
  onCategoryClick: (id: string) => void;
  onPublisherClick: (id: string) => void;
  onViewOffers: () => void;
  recentlyViewedIds: string[];
  onSearchQuery: (query: string) => void;
}

// Icon helper to load Lucide icons dynamically
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Book className={className} />;
  return <IconComponent className={className} />;
};

export default function HomeView({
  onBookClick,
  onCategoryClick,
  onPublisherClick,
  onViewOffers,
  recentlyViewedIds,
  onSearchQuery
}: HomeViewProps) {
  const [searchVal, setSearchVal] = useState("");
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [confettiActive, setConfettiActive] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filter book lists for specialized sections
  const todaysDeals = BOOKS.filter((b) => b.oldPrice !== undefined).slice(0, 6);
  const newArrivals = BOOKS.filter((b) => b.isNewArrival === true);
  const bestSellers = BOOKS.filter((b) => b.isBestSeller === true).sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const recommendedBooks = BOOKS.filter((b) => b.isRecommended === true).slice(0, 4);
  const recentlyViewedBooks = BOOKS.filter((b) => recentlyViewedIds.includes(b.id));

  // Reviews slider timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const triggerConfetti = () => {
    setConfettiActive(true);
    const colors = ["#FFB300", "#0D47A1", "#1565C0", "#16A34A", "#EF4444", "#EC4899"];
    const particles = Array.from({ length: 60 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 20 + 80,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setConfettiParticles(particles);
    setTimeout(() => {
      setConfettiActive(false);
      setConfettiParticles([]);
    }, 4000);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearchQuery(searchVal.trim());
    }
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 3000);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Immersive Hero Banner & Floating 3D Book Layout */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50 to-brand-bg pt-8 md:pt-16 pb-20">
        
        {/* Decorative subtle background vectors */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-300/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-accent/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-blue-100/70 border border-blue-200 text-brand-primary px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Icons.Sparkles className="w-4 h-4 text-brand-accent fill-brand-accent" />
              <span>Est. 1998 • Kerala's Premier Book Stall</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-none">
              Find Every Book <br />
              <span className="text-brand-primary bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">You Need Here</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              Serving Kerala's academic society with authorized NCERT, State Board textbooks, premier engineering syllabi, high-yield medical bundles, and iconic Malayalam literary titles.
            </p>

            {/* Split Tags checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-slate-700 max-w-lg mx-auto lg:mx-0">
              {[
                { label: "School Curriculums", icon: "BookOpen", color: "text-blue-600" },
                { label: "Engineering", icon: "Cpu", color: "text-purple-600" },
                { label: "Medical Manuals", icon: "HeartPulse", color: "text-emerald-600" },
                { label: "Competitive Guides", icon: "Trophy", color: "text-amber-600" },
                { label: "Malayalam Classics", icon: "PenTool", color: "text-red-600" },
                { label: "Story Books", icon: "Sparkles", color: "text-pink-600" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm">
                  <DynamicIcon name={item.icon} className={`w-4 h-4 ${item.color}`} />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <button
                onClick={() => onCategoryClick("academic")}
                className="w-full sm:w-auto bg-brand-primary hover:bg-brand-secondary text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Icons.GraduationCap className="w-5 h-5 text-brand-accent" /> Browse Educational Books
              </button>

              <button
                onClick={onViewOffers}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 font-bold px-8 py-3.5 rounded-xl border border-slate-200/80 shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Icons.Gift className="w-5 h-5 text-brand-accent" /> Today's Special Deals
              </button>
            </div>
          </div>

          {/* Right Floating 3D Book Graphics */}
          <div className="lg:col-span-5 flex justify-center items-center relative min-h-[350px]">
            {/* Visual background sphere */}
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-blue-600/10 to-indigo-600/15 animate-pulse" />

            {/* Book Case floating block */}
            <div className="relative book-perspective flex items-center justify-center w-full max-w-[340px] aspect-[4/5]">
              
              {/* Floating Book 1 - Engineering (Foreground right) */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10], rotate: [4, 6, 4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => onBookClick("engg-math")}
                className="absolute right-0 top-6 w-44 aspect-[3/4] bg-gradient-to-br from-blue-700 to-indigo-950 rounded-r-xl p-4 text-white flex flex-col justify-between shadow-2xl cursor-pointer border-l-4 border-black/20 group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-between items-start text-xl">
                  <span>📐</span>
                  <span className="bg-brand-accent text-slate-900 text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase">Rank #1</span>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-xs leading-tight mb-1 text-white line-clamp-3">
                    Advanced Engineering Mathematics
                  </h4>
                  <p className="text-[9px] text-white/70">Erwin Kreyszig</p>
                </div>
                <div className="text-[8px] font-mono border-t border-white/20 pt-2 flex justify-between">
                  <span>OUP</span>
                  <span>₹850</span>
                </div>
              </motion.div>

              {/* Floating Book 2 - Physics (Background left) */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [10, -10, 10], rotate: [-8, -6, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => onBookClick("physics-hcv")}
                className="absolute left-0 bottom-6 w-40 aspect-[3/4] bg-gradient-to-br from-amber-600 to-orange-800 rounded-r-xl p-4 text-white flex flex-col justify-between shadow-2xl cursor-pointer border-l-4 border-black/20 group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-between items-start text-lg">
                  <span>⚛️</span>
                  <span className="bg-white/20 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">HC Verma</span>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-xs leading-tight mb-1 text-white line-clamp-3">
                    Concepts of Physics
                  </h4>
                  <p className="text-[9px] text-white/70">S. Chand</p>
                </div>
                <div className="text-[8px] font-mono border-t border-white/20 pt-2 flex justify-between">
                  <span>Standard</span>
                  <span>₹420</span>
                </div>
              </motion.div>

              {/* Decorative study graphics */}
              <div className="absolute top-2 left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5 animate-bounce [animation-duration:4s] z-10">
                <div className="bg-brand-primary p-2 rounded-xl text-brand-accent">
                  <Icons.GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Registered</p>
                  <p className="text-xs font-black text-slate-800 mt-0.5">15,000+ Students</p>
                </div>
              </div>

              <div className="absolute bottom-2 right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5 animate-bounce [animation-duration:3s] z-10">
                <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600">
                  <Icons.HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Verified Stock</p>
                  <p className="text-xs font-black text-slate-800 mt-0.5">Same Day Pickup</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. Mega Search Box Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/5 border border-slate-100">
          <h3 className="font-display font-bold text-lg text-slate-800 mb-4 text-center">
            What are you looking for today?
          </h3>
          
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Search by book name, author, publisher, or 13-digit ISBN..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full pl-12 pr-28 py-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 focus:bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 text-sm"
            />
            <Icons.Search className="w-5 h-5 text-slate-400 absolute left-4" />
            <button
              type="submit"
              className="absolute right-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
            >
              Search Stall
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Popular:</span>
            {[
              { label: "Engineering Mathematics", query: "Mathematics" },
              { label: "NCERT Books", query: "School Books" },
              { label: "HC Verma", query: "Physics" },
              { label: "USMLE MBBS", query: "USMLE" },
              { label: "Malayalam novels", query: "Malayalam" }
            ].map((s, i) => (
              <button
                key={i}
                onClick={() => { setSearchVal(s.query); onSearchQuery(s.query); }}
                className="bg-slate-50 hover:bg-blue-50 hover:text-brand-primary text-slate-600 px-3 py-1 rounded-full border border-slate-200/50 transition-colors cursor-pointer font-medium"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center md:text-left">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Shop Publications by Category
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Carefully curated collections from standard secondary schools to high-tier academic universities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onCategoryClick(cat.id)}
              className="group relative overflow-hidden bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Dynamic Gradient Circle behind icon */}
              <div className="mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform`}>
                  <DynamicIcon name={cat.icon} className="w-6 h-6" />
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-sm text-slate-800 group-hover:text-brand-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="text-slate-400 text-xs font-mono font-medium block mt-1">
                  {cat.count} Books Listed
                </span>
              </div>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-brand-primary">
                <Icons.ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Today's Deals section */}
      <section className="bg-slate-50 border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                <Icons.Sparkles className="w-6 h-6 text-brand-accent fill-brand-accent" />
                <span>Today's Mega Discount Deals</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Save big on premium publishers including McGraw Hill, Pearson, and Oxford series.
              </p>
            </div>
            <button
              onClick={onViewOffers}
              className="text-sm font-semibold text-brand-secondary hover:text-brand-primary hover:underline flex items-center gap-1.5"
            >
              View All Active Deals <Icons.ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {todaysDeals.map((book) => (
              <div
                key={book.id}
                onClick={() => onBookClick(book.id)}
                className="bg-white rounded-2xl border border-slate-150 p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Book Spine Simulation & Mini Cover */}
                  <div className="aspect-[4/3] bg-slate-50/50 rounded-xl flex items-center justify-center p-3 relative overflow-hidden mb-4">
                    <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm z-10">
                      {book.offerBadge}
                    </span>
                    
                    {/* Simulated 3D Cover */}
                    <div className="book-perspective w-16 aspect-[3/4]">
                      <div className={`w-full h-full rounded-r-md bg-gradient-to-br ${book.coverColor} text-white flex flex-col justify-between p-2 shadow-md group-hover:scale-105 transition-transform`}>
                        <span className="text-sm">{book.coverEmoji}</span>
                        <p className="text-[6px] leading-tight font-extrabold line-clamp-2">{book.title}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5 font-medium">By {book.author}</p>
                  
                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-1 text-amber-500">
                    <Icons.Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold text-slate-600">{book.rating}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[10px] block line-through leading-none">₹{book.oldPrice}</span>
                    <span className="text-sm font-mono font-bold text-slate-800">₹{book.price}</span>
                  </div>
                  <span className="text-[10px] text-brand-secondary font-bold group-hover:underline">
                    View Details
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. New Arrivals & 6. Best Sellers Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* New Arrivals list */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-6 rounded bg-brand-primary" /> Newest Arrivals
              </h2>
              <span className="text-xs bg-blue-50 text-brand-primary font-bold px-2.5 py-1 rounded-full uppercase">
                June 2026 Batch
              </span>
            </div>

            <div className="space-y-4">
              {newArrivals.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onBookClick(book.id)}
                  className="bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-2xl flex gap-4 cursor-pointer transition-all duration-300 hover:shadow-md group"
                >
                  <div className={`w-16 h-20 rounded-lg bg-gradient-to-br ${book.coverColor} text-white flex items-center justify-center text-2xl shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {book.coverEmoji}
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display font-bold text-sm text-slate-800 truncate group-hover:text-brand-primary transition-colors">
                          {book.title}
                        </h3>
                        <span className="bg-brand-success/15 text-brand-success text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">
                          NEW
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs mt-0.5">By {book.author} | {book.publisher}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-50 pt-2 text-xs">
                      <span className="font-mono font-bold text-slate-700">₹{book.price}</span>
                      <span className="text-[10px] text-slate-400">Pages: {book.pages}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Sellers list */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-6 bg-brand-accent rounded" /> Weekly Best Sellers
            </h2>

            <div className="space-y-4">
              {bestSellers.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onBookClick(book.id)}
                  className="bg-white hover:bg-slate-50 border border-slate-150 p-4 rounded-2xl flex gap-4 cursor-pointer transition-all duration-300 hover:shadow-md group relative overflow-hidden"
                >
                  {/* Badge position */}
                  <div className="absolute top-0 left-0 bg-brand-accent text-slate-900 text-xs font-black px-2.5 py-1 rounded-br-xl shadow-sm">
                    #{book.rank}
                  </div>

                  <div className={`w-16 h-20 rounded-lg bg-gradient-to-br ${book.coverColor} text-white flex items-center justify-center text-2xl shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform ml-4 mt-2 sm:ml-0 sm:mt-0`}>
                    {book.coverEmoji}
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-sm text-slate-800 truncate group-hover:text-brand-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-0.5">By {book.author}</p>
                      
                      {/* Counter */}
                      <p className="text-[10px] font-semibold text-slate-500 mt-1">
                        🔥 {book.salesCount?.toLocaleString()} copies sold this term
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-50 pt-2 text-xs">
                      <span className="font-mono font-bold text-slate-700">₹{book.price}</span>
                      <span className="text-amber-500 font-bold flex items-center gap-1">
                        <Icons.Star className="w-3 h-3 fill-current" /> {book.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Recommended Books Grid */}
      <section className="bg-gradient-to-r from-blue-50/20 via-white to-blue-50/20 py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              Recommended for Academic Success
            </h2>
            <p className="text-slate-500 text-sm mt-1 max-w-xl mx-auto">
              Selected by top-ranking university instructors and CBSE school boards for premium study assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => onBookClick(book.id)}
                className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-4 shadow-sm hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${book.coverColor} text-white flex items-center justify-center text-4xl mb-4 shadow-inner relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{book.coverEmoji}</span>
                  </div>
                  <span className="text-[10px] bg-blue-50 text-brand-primary font-bold px-2 py-0.5 rounded-full uppercase block w-max mb-1.5">
                    {book.category}
                  </span>
                  <h3 className="font-display font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">By {book.author}</p>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-800">₹{book.price}</span>
                  <span className="text-xs text-brand-primary font-semibold">Verify Stock</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Recently Viewed Books Slider */}
      {recentlyViewedBooks.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="font-display text-lg font-bold text-slate-800 flex items-center gap-2">
            <Icons.Clock className="w-5 h-5 text-slate-400" /> Recently Viewed by You
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {recentlyViewedBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => onBookClick(book.id)}
                className="bg-white rounded-xl border border-slate-100 p-3 shadow-sm flex items-center gap-3 cursor-pointer min-w-[240px] hover:shadow-md transition-all duration-300"
              >
                <div className={`w-10 h-14 rounded bg-gradient-to-br ${book.coverColor} text-white flex items-center justify-center text-lg flex-shrink-0 shadow-sm`}>
                  {book.coverEmoji}
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-xs text-slate-800 truncate">
                    {book.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">By {book.author}</p>
                  <span className="text-xs font-mono font-bold text-slate-700 block mt-1">₹{book.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. Publisher Collections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Explore Publisher Collections
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Official distributor partnerships offering guaranteed quality editions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {PUBLISHERS.map((pub) => (
            <div
              key={pub.id}
              onClick={() => onPublisherClick(pub.id)}
              className="group border border-slate-200/80 bg-white hover:border-brand-primary p-4 rounded-xl text-center cursor-pointer transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
            >
              <div className={`w-12 h-12 rounded-full ${pub.bgColor} mx-auto flex items-center justify-center text-xs font-bold font-display shadow-md group-hover:scale-110 transition-transform`}>
                {pub.logoText}
              </div>
              <div className="mt-3">
                <h4 className="font-bold text-xs text-slate-800 line-clamp-1 leading-snug">
                  {pub.name.split(" ")[0]}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                  {pub.count}+ titles
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Festival Offers Interactive Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          
          {/* Confetti element */}
          {confettiActive && (
            <div className="absolute inset-0 pointer-events-none z-20">
              {confettiParticles.map((p) => (
                <div
                  key={p.id}
                  className="absolute w-2 h-2 rounded-sm"
                  style={{
                    backgroundColor: p.color,
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    opacity: Math.random(),
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `fall 3s linear forwards`
                  }}
                />
              ))}
            </div>
          )}

          {/* Geometric shapes */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-brand-primary/10 rounded-l-full filter blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-block bg-brand-accent text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Active Festival Campaign
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                Back To School 2026: Up to 40% Off!
              </h2>
              <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                Empower your child's learning journey! Massive discounts on NCERT study materials, Wren & Martin reference kits, color drawing textbooks, and school reference bundles.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onViewOffers}
                  className="bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Shop Discount Store
                </button>
                
                <button
                  onClick={triggerConfetti}
                  className="bg-white/10 hover:bg-white/20 text-brand-accent font-bold text-xs px-6 py-3 rounded-xl border border-white/10 transition-all duration-300 cursor-pointer flex items-center gap-1"
                >
                  🎉 Click For Luck!
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="bg-brand-accent text-slate-900 p-6 rounded-2xl text-center shadow-lg transform rotate-2 max-w-[200px]">
                <span className="text-xs font-bold uppercase block tracking-wider leading-none">Limited Period</span>
                <span className="text-4xl font-black font-display my-2 block">40%</span>
                <span className="text-[10px] font-semibold block">Flat discount on pre-ordered textbooks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Combo Offers Segment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-brand-primary rounded" /> Curated Combo Semester Packs
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Compiled modules recommended directly by top faculties to save massive procurement costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="bg-blue-50 text-brand-primary text-xs font-bold px-2.5 py-1 rounded-full uppercase">
                    {combo.badge}
                  </span>
                  <span className="text-xs font-semibold text-brand-success">
                    Save ₹{combo.saveAmount} Instantly
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-base text-slate-800">
                  {combo.title}
                </h3>
                <p className="text-slate-500 text-xs mt-1">Contains {combo.booksCount} essential syllabus textbooks:</p>
                
                {/* Book list tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {combo.booksIncluded.map((b, i) => (
                    <span key={i} className="text-[10px] bg-slate-50 border border-slate-150 text-slate-600 px-2 py-0.5 rounded-md">
                      📖 {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-xs line-through block">₹{combo.originalPrice}</span>
                  <span className="text-lg font-mono font-bold text-slate-800">₹{combo.price}</span>
                </div>

                <button
                  onClick={() => {
                    const text = `Hi, I want to inquire about the package combo:\n\n*${combo.title}*\nIncludes: ${combo.booksIncluded.join(", ")}\nPrice: ₹${combo.price}\n(Saved ₹${combo.saveAmount}!)`;
                    window.open(`https://api.whatsapp.com/send?phone=919447012345&text=${encodeURIComponent(text)}`, "_blank");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1 shadow-md shadow-green-600/10 cursor-pointer"
                >
                  <Icons.Send className="w-3.5 h-3.5" /> Inquire Combo
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Customer Reviews Auto-Scroll */}
      <section className="bg-slate-900 text-white py-16 overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 z-10 relative">
          <span className="text-xs font-bold text-brand-accent uppercase tracking-widest block">
            What our readers say
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Trusted by Instructors & Students Alike
          </h2>

          <div className="min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <p className="text-slate-300 text-base md:text-lg italic leading-relaxed max-w-2xl mx-auto">
                  "{REVIEWS[activeReviewIndex].text}"
                </p>

                {/* Stars */}
                <div className="flex justify-center gap-1 text-brand-accent">
                  {Array.from({ length: REVIEWS[activeReviewIndex].rating }).map((_, i) => (
                    <Icons.Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <img
                    src={REVIEWS[activeReviewIndex].photoUrl}
                    alt={REVIEWS[activeReviewIndex].name}
                    className="w-10 h-10 rounded-full object-cover border border-brand-accent"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-xs text-white leading-none">
                      {REVIEWS[activeReviewIndex].name}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      {REVIEWS[activeReviewIndex].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 pt-4">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveReviewIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeReviewIndex === i ? "bg-brand-accent w-4" : "bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 13. Newsletter Block */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg shadow-blue-900/5 space-y-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full mx-auto flex items-center justify-center text-brand-primary mb-2">
            <Icons.Mail className="w-6 h-6" />
          </div>

          <h2 className="font-display text-2xl font-bold text-slate-800">
            Stay Updated on Academic Announcements
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Subscribe to receive curriculum releases, solved exam guides, and discount offer notifications directly.
          </p>

          {newsletterSubscribed ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-100 font-semibold text-xs inline-block"
            >
              🎉 Thank you! You've successfully subscribed to our newsletter.
            </motion.div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
              <button
                type="submit"
                className="bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
