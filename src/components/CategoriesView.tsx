import { useState } from "react";
import * as Icons from "lucide-react";
import { Book, Category } from "../types";
import { CATEGORIES, BOOKS } from "../data";

interface CategoriesViewProps {
  onBookClick: (id: string) => void;
}

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Book className={className} />;
  return <IconComponent className={className} />;
};

export default function CategoriesView({ onBookClick }: CategoriesViewProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");

  const matchingBooks = BOOKS.filter((book) => {
    const matchesCategory = book.category.toLowerCase() === activeCategory.name.toLowerCase();
    const matchesSubcategory =
      activeSubcategory === "all" ||
      book.subcategory?.toLowerCase() === activeSubcategory.toLowerCase();
    return matchesCategory && matchesSubcategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Category Section Header */}
      <div className="bg-[#0D47A1] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 rounded-l-full filter blur-xl pointer-events-none" />
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="inline-block bg-brand-accent text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            Curriculum Categories
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Educational Divisions
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Quickly navigate by class, course, or specific interest field. Filter books with specialized sub-academic divisions below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Category tabs list */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-2">
            Select Educational Field
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveSubcategory("all");
                }}
                className={`p-4 rounded-2xl border text-left flex items-center gap-4 transition-all duration-300 cursor-pointer ${
                  activeCategory.id === cat.id
                    ? "border-brand-primary bg-blue-50/50 shadow-md translate-x-1"
                    : "border-slate-100 bg-white hover:bg-slate-50"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center`}>
                  <DynamicIcon name={cat.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-800 leading-snug">
                    {cat.name}
                  </h3>
                  <span className="text-slate-400 text-[10px] font-mono mt-0.5 block font-semibold">
                    {cat.count} volumes listed
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right column: Subcategories & results */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Subcategories Selector */}
          <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Filter by {activeCategory.name} Sub-division:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSubcategory("all")}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  activeSubcategory === "all"
                    ? "bg-brand-primary text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                Show All {activeCategory.name}
              </button>
              
              {activeCategory.subcategories?.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    activeSubcategory === sub
                      ? "bg-brand-primary text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Book List output */}
          {matchingBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {matchingBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onBookClick(book.id)}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex gap-4 group"
                >
                  <div className={`w-16 h-20 rounded-lg bg-gradient-to-br ${book.coverColor} text-white flex items-center justify-center text-2xl shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}>
                    {book.coverEmoji}
                  </div>
                  
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-800 truncate group-hover:text-brand-primary">
                        {book.title}
                      </h4>
                      <p className="text-slate-400 text-[10px] mt-0.5">By {book.author}</p>
                      {book.subcategory && (
                        <span className="text-[9px] bg-slate-50 border text-slate-400 px-1.5 py-0.5 rounded mt-1.5 inline-block">
                          {book.subcategory}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-50 pt-2 text-xs font-semibold text-slate-800">
                      <span>₹{book.price}</span>
                      <span className="text-[10px] text-brand-primary group-hover:underline">Verify Stall →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center text-slate-400">
                <Icons.BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-800">No Volumes In Stock</h3>
                <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto">
                  We are currently replenishing books for this specific subdivision. You can place a pre-order request via our WhatsApp channel.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
