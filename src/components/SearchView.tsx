import { useState, useMemo } from "react";
import { Search, Filter, RefreshCw, Star, Info, ChevronRight } from "lucide-react";
import { Book } from "../types";
import { BOOKS, PUBLISHERS, CATEGORIES } from "../data";

interface SearchViewProps {
  onBookClick: (id: string) => void;
  initialQuery?: string;
  key?: any;
}

export default function SearchView({ onBookClick, initialQuery = "" }: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPublisher, setSelectedPublisher] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<"all" | "under-250" | "250-750" | "over-750">("all");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "price-low" | "price-high" | "rating">("popular");

  // Filtered books
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      // 1. Text Query
      const matchesText =
        query.trim() === "" ||
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.publisher.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.includes(query);

      // 2. Category
      const matchesCategory =
        selectedCategory === "all" ||
        book.category.toLowerCase() === selectedCategory.toLowerCase();

      // 3. Publisher
      const matchesPublisher =
        selectedPublisher === "all" ||
        book.publisher.toLowerCase().includes(selectedPublisher.toLowerCase());

      // 4. Language
      const matchesLanguage =
        selectedLanguage === "all" ||
        book.language.toLowerCase() === selectedLanguage.toLowerCase();

      // 5. Rating
      const matchesRating = book.rating >= selectedRating;

      // 6. Price
      let matchesPrice = true;
      if (priceRange === "under-250") {
        matchesPrice = book.price < 250;
      } else if (priceRange === "250-750") {
        matchesPrice = book.price >= 250 && book.price <= 750;
      } else if (priceRange === "over-750") {
        matchesPrice = book.price > 750;
      }

      return matchesText && matchesCategory && matchesPublisher && matchesLanguage && matchesRating && matchesPrice;
    }).sort((a, b) => {
      // Sorting
      if (sortBy === "newest") {
        return b.isNewArrival === a.isNewArrival ? 0 : b.isNewArrival ? 1 : -1;
      }
      if (sortBy === "popular") {
        return (b.salesCount || 0) - (a.salesCount || 0);
      }
      if (sortBy === "price-low") {
        return a.price - b.price;
      }
      if (sortBy === "price-high") {
        return b.price - a.price;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [query, selectedCategory, selectedPublisher, selectedLanguage, selectedRating, priceRange, sortBy]);

  const handleResetFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedPublisher("all");
    setSelectedLanguage("all");
    setSelectedRating(0);
    setPriceRange("all");
    setSortBy("popular");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Search Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold mb-2 text-white">
          Mega Search Database
        </h1>
        <p className="text-white/80 text-xs sm:text-sm mb-6 max-w-xl">
          Enter keywords, author names, or unique ISBN-13 barcode codes to locate physical inventory on our shelves instantly.
        </p>

        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Type book name, author, publisher or ISBN number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white text-slate-800 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-accent/20 border-none shadow-lg text-sm"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Filter Sidebar */}
        <div className="space-y-6 lg:col-span-1 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm h-fit">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-display font-bold text-slate-800 flex items-center gap-2 text-sm">
              <Filter className="w-4 h-4 text-brand-primary" /> Active Filters
            </span>
            <button
              onClick={handleResetFilters}
              className="text-xs text-brand-primary font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2.5 focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Publisher Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Publisher</label>
            <select
              value={selectedPublisher}
              onChange={(e) => setSelectedPublisher(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2.5 focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value="all">All Publishers</option>
              {PUBLISHERS.map((pub) => (
                <option key={pub.id} value={pub.name}>
                  {pub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Price Category</label>
            <div className="space-y-1 text-xs">
              {[
                { id: "all", label: "Any price" },
                { id: "under-250", label: "Under ₹250" },
                { id: "250-750", label: "₹250 - ₹750" },
                { id: "over-750", label: "Above ₹750" }
              ].map((p) => (
                <label key={p.id} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-lg cursor-pointer">
                  <input
                    type="radio"
                    name="price-group"
                    checked={priceRange === p.id}
                    onChange={() => setPriceRange(p.id as any)}
                    className="text-brand-primary"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Language</label>
            <div className="flex gap-2">
              {["all", "english", "malayalam"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`flex-1 p-2 border rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? "bg-blue-50 border-brand-primary text-brand-primary"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {lang === "all" ? "Any" : lang}
                </button>
              ))}
            </div>
          </div>

          {/* Ratings minimum */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Min Rating</label>
            <div className="flex items-center gap-1">
              {[0, 3, 4, 4.5].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setSelectedRating(stars)}
                  className={`flex-1 py-1.5 border rounded-lg text-xs font-bold flex items-center justify-center gap-0.5 cursor-pointer ${
                    selectedRating === stars
                      ? "bg-amber-50 border-amber-400 text-amber-700"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {stars === 0 ? "All" : `${stars}★`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Results Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              Found <span className="font-extrabold text-brand-primary">{filteredBooks.length}</span> matching volumes
            </p>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2 focus:outline-none focus:border-brand-primary cursor-pointer font-semibold"
              >
                <option value="popular">Popularity (Sales)</option>
                <option value="newest">Newest Arrivals First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating Evaluation</option>
              </select>
            </div>
          </div>

          {/* Book List container */}
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onBookClick(book.id)}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Simulated 3D Book Cover on Search */}
                    <div className="aspect-[4/3] bg-slate-50 rounded-xl flex items-center justify-center p-4 mb-4 relative overflow-hidden">
                      <div className={`w-16 aspect-[3/4] rounded-r-md bg-gradient-to-br ${book.coverColor} text-white flex flex-col justify-between p-2 shadow-md group-hover:scale-105 transition-transform`}>
                        <span className="text-sm">{book.coverEmoji}</span>
                        <p className="text-[6px] leading-tight font-extrabold line-clamp-2">{book.title}</p>
                      </div>

                      {book.offerBadge && (
                        <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          {book.offerBadge}
                        </span>
                      )}

                      <span className="absolute bottom-2 right-2 text-[9px] bg-white/80 backdrop-blur text-slate-500 font-mono px-2 py-0.5 rounded-full border border-slate-100 font-semibold uppercase">
                        {book.language}
                      </span>
                    </div>

                    <span className="inline-block bg-slate-50 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md mb-1.5">
                      {book.category}
                    </span>

                    <h3 className="font-display font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">By {book.author}</p>
                    <p className="text-slate-400 text-[10px] italic mt-0.5">{book.publisher}</p>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mt-1.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold text-slate-600">{book.rating}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-150 pt-3 mt-4 flex items-center justify-between">
                    <div>
                      {book.oldPrice && (
                        <span className="text-slate-400 text-[10px] block line-through leading-none">₹{book.oldPrice}</span>
                      )}
                      <span className="text-sm font-mono font-bold text-slate-800">₹{book.price}</span>
                    </div>
                    <span className="text-xs font-semibold text-brand-primary group-hover:underline flex items-center gap-0.5">
                      Check Stock <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-150 rounded-full mx-auto flex items-center justify-center text-slate-400">
                <Info className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-800">No Volumes Found</h3>
                <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
                  We currently do not have any listings matching that keyword. Reset your filters or search by author name.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
