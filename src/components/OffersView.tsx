import { useState, useEffect } from "react";
import { Clock, Tag, ShoppingBag, Send, Star, HelpCircle } from "lucide-react";
import { Book } from "../types";
import { BOOKS, COMBOS } from "../data";

interface OffersViewProps {
  onBookClick: (id: string) => void;
}

export default function OffersView({ onBookClick }: OffersViewProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 35, seconds: 48 });

  // Countdown clock ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return { days: 2, hours: 12, minutes: 0, seconds: 0 }; // Reset loop for demo
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const discountedBooks = BOOKS.filter((b) => b.oldPrice !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* 1. Countdown Special offer header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        
        {/* Subtle vectors */}
        <div className="absolute right-0 bottom-0 top-0 w-1/4 bg-brand-accent/5 rounded-l-full filter blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block bg-brand-accent text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
              Limited-Time Flash Offer
            </span>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Kottayam Head Office Special <br />
              Pre-Semester Discount Blitz!
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
              Lock in flat discounts on university guidelines, medical reference manuals, and elementary CBSE packages before stock shifts. Same-day branch pickup is available on WhatsApp pre-orders.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-3 bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest block flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 animate-pulse" /> Offer Closes In:
            </span>
            
            {/* Ticker units */}
            <div className="grid grid-cols-4 gap-2 text-white">
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
                <span className="text-xl sm:text-2xl font-mono font-black text-brand-accent block">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase text-slate-400 font-bold block mt-0.5">Days</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
                <span className="text-xl sm:text-2xl font-mono font-black text-brand-accent block">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase text-slate-400 font-bold block mt-0.5">Hours</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
                <span className="text-xl sm:text-2xl font-mono font-black text-brand-accent block">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase text-slate-400 font-bold block mt-0.5">Mins</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-white/5">
                <span className="text-xl sm:text-2xl font-mono font-black text-brand-accent block">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase text-slate-400 font-bold block mt-0.5">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Semester Combo Kits */}
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-brand-primary" /> Multi-Book Semester Kits
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Buy together to avoid curriculum misalignment and save major delivery/handling fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-brand-accent text-slate-900 text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                Save ₹{combo.saveAmount}
              </div>

              <div>
                <span className="text-[10px] bg-blue-50 text-brand-primary font-bold px-2.5 py-1 rounded-full uppercase">
                  {combo.badge}
                </span>
                <h3 className="font-display font-extrabold text-base text-slate-800 mt-3">
                  {combo.title}
                </h3>
                <p className="text-slate-500 text-xs mt-1">Consists of the following standard curriculum publications:</p>
                
                <ul className="space-y-1.5 mt-3 text-xs text-slate-600 font-medium">
                  {combo.booksIncluded.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-accent rounded-full" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 line-through block">₹{combo.originalPrice} M.R.P.</span>
                  <span className="text-xl font-mono font-bold text-slate-800">₹{combo.price}</span>
                </div>

                <button
                  onClick={() => {
                    const text = `Hello Students Book Stall, I want to inquire/pre-order the: \n*${combo.title}* \nPrice: ₹${combo.price} (MRP: ₹${combo.originalPrice}). \nPlease confirm stock and pickup schedule.`;
                    window.open(`https://api.whatsapp.com/send?phone=919447012345&text=${encodeURIComponent(text)}`, "_blank");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-green-600/10 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Book Combo Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Discount Books Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Tag className="w-6 h-6 text-brand-primary" /> Curated Discount Publications
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Enjoy exclusive stall discounts on leading study references and local literature items.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onBookClick(book.id)}
              className="bg-white rounded-2xl border border-slate-150 hover:border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-slate-50 rounded-xl flex items-center justify-center p-3 relative overflow-hidden mb-4">
                  <span className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {book.offerBadge}
                  </span>
                  
                  {/* Spine design cover */}
                  <div className="book-perspective w-14 aspect-[3/4]">
                    <div className={`w-full h-full rounded-r bg-gradient-to-br ${book.coverColor} text-white flex flex-col justify-between p-2 shadow-md`}>
                      <span className="text-xs">{book.coverEmoji}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[9px] bg-slate-50 text-slate-500 font-bold px-2 py-0.5 rounded uppercase block w-max mb-1.5">
                  {book.category}
                </span>

                <h3 className="font-display font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-brand-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">By {book.author}</p>

                {/* Stars */}
                <div className="flex items-center gap-1 mt-1.5 text-amber-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold text-slate-600">{book.rating}</span>
                </div>
              </div>

              <div className="border-t border-slate-150 pt-3 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] block line-through leading-none">₹{book.oldPrice}</span>
                  <span className="text-sm font-mono font-bold text-slate-800">₹{book.price}</span>
                </div>
                <span className="text-xs text-brand-primary font-semibold group-hover:underline">
                  Claim Deal
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-150 space-y-4">
        <h3 className="font-display font-bold text-slate-800 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-primary" /> Offers & Pre-Orders FAQs
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-1">How do I purchase combo kits?</h4>
            <p>Select the desired kit and click "Book Combo Now" to coordinate instant home shipping or standard pickup with a store assistant on WhatsApp.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-1">Are there additional student discounts?</h4>
            <p>Yes! Registered students, teachers, and school board coordinators get an extra 2% custom rebate on full academic sets when purchasing in bulk.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
