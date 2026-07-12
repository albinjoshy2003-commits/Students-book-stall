import { useState } from "react";
import { BookOpen, Star, Sparkles, Building2 } from "lucide-react";
import { Publisher, Book } from "../types";
import { PUBLISHERS, BOOKS } from "../data";

interface PublishersViewProps {
  onBookClick: (id: string) => void;
  initialPublisherId?: string | null;
}

export default function PublishersView({ onBookClick, initialPublisherId = null }: PublishersViewProps) {
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher>(
    PUBLISHERS.find((p) => p.id === initialPublisherId) || PUBLISHERS[0]
  );

  const matchingBooks = BOOKS.filter((book) =>
    book.publisher.toLowerCase().includes(selectedPublisher.name.split(" ")[0].toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Visual Header */}
      <div className="bg-[#0D47A1] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 rounded-l-full filter blur-xl pointer-events-none" />
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="inline-block bg-brand-accent text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            Premium Partners
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-8 h-8 text-brand-accent" /> Publisher Collections
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            We partner directly with leading domestic and international publications, ensuring standard textbook curricula and genuine exam syllabus editions.
          </p>
        </div>
      </div>

      {/* Grid selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {PUBLISHERS.map((pub) => (
          <button
            key={pub.id}
            onClick={() => setSelectedPublisher(pub)}
            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all duration-300 cursor-pointer ${
              selectedPublisher.id === pub.id
                ? "border-brand-primary bg-blue-50/50 shadow-md translate-y-[-2px]"
                : "border-slate-100 bg-white hover:bg-slate-50"
            }`}
          >
            <div className={`w-12 h-12 rounded-full ${pub.bgColor} flex items-center justify-center text-xs font-bold shadow-md`}>
              {pub.logoText}
            </div>
            <div className="mt-3">
              <h4 className="font-bold text-[11px] text-slate-800 leading-tight">
                {pub.name.split(" ")[0]}
              </h4>
              <span className="text-slate-400 text-[9px] block mt-0.5 font-semibold">
                {pub.count}+ titles
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Active publisher detailed description */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-8">
          <div className={`w-24 h-24 rounded-3xl ${selectedPublisher.bgColor} flex items-center justify-center text-xl font-extrabold shadow-lg mb-4`}>
            {selectedPublisher.logoText}
          </div>
          <h3 className="font-display font-extrabold text-slate-800 text-center leading-tight">
            {selectedPublisher.name}
          </h3>
          <span className="text-xs text-brand-secondary font-mono mt-1 font-bold">
            Registered Vendor
          </span>
        </div>

        <div className="md:col-span-9 space-y-4">
          <span className="text-[10px] bg-blue-50 text-brand-primary font-bold px-2.5 py-1 rounded-full uppercase tracking-wider block w-max">
            Publisher Overview
          </span>
          <p className="text-slate-600 text-sm leading-relaxed">
            {selectedPublisher.description}
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500 font-semibold font-mono">
            <span>📚 Active Catalog: {selectedPublisher.count} Volumes</span>
            <span>📍 Physical Availability: In stock</span>
            <span>⭐ Rated: 4.8 / 5.0</span>
          </div>
        </div>
      </div>

      {/* Matching books grid */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-accent" /> Available Volumes by {selectedPublisher.name}
        </h3>

        {matchingBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchingBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => onBookClick(book.id)}
                className="bg-white rounded-2xl border border-slate-150 hover:border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${book.coverColor} text-white flex items-center justify-center text-3xl mb-4 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{book.coverEmoji}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider block mb-1">
                    ISBN: {book.isbn.slice(-5)}
                  </span>
                  <h4 className="font-display font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-primary transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-slate-400 text-xs mt-0.5">By {book.author}</p>
                  
                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-1 text-amber-500">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold text-slate-600">{book.rating}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-800">₹{book.price}</span>
                  <span className="text-[11px] text-brand-primary font-bold group-hover:underline">Verify Stall →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center text-slate-400">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-800">Currently No Listed Titles</h3>
              <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto">
                We are currently processing catalog additions for this publisher. Contact our physical helpdesk to inspect off-shelf assets.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
