import { motion } from "motion/react";
import { X, ShoppingCart, Send, MapPin, Sparkles, Star, Share2 } from "lucide-react";
import { Book } from "../types";
import { BOOKS, BRANCHES } from "../data";

interface BookDetailModalProps {
  bookId: string | null;
  onClose: () => void;
  onBookClick: (id: string) => void;
}

export default function BookDetailModal({ bookId, onClose, onBookClick }: BookDetailModalProps) {
  if (!bookId) return null;

  const book = BOOKS.find((b) => b.id === bookId);
  if (!book) return null;

  // Find related books in same category
  const relatedBooks = BOOKS.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 3);

  const handleWhatsAppInquiry = (branchName: string, whatsappNumber: string) => {
    const text = `Hi Students Book Stall (${branchName}), I am inquiring about the book:\n\n*${book.title}*\nAuthor: ${book.author}\nISBN: ${book.isbn}\nPrice: ₹${book.price}\n\nIs this in stock for pickup or home delivery?`;
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
    window.open(`https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out ${book.title} by ${book.author} at Students Book Stall!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`Copied link to clipboard: ${book.title} - ${book.author}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Main card */}
      <motion.div
        initial={{ scale: 0.95, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 30, opacity: 0 }}
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10 my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header toolbar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-20 flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            Book Specification Sheet
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-brand-primary rounded-full hover:bg-slate-50 transition-colors"
              title="Share Book"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              id="book-detail-close-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Col: Gorgeous 3D Book representation */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="book-perspective w-full max-w-[240px] aspect-[3/4] py-4">
                <motion.div
                  whileHover={{ rotateY: -15, rotateX: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 150 }}
                  className="book-preserve-3d w-full h-full relative cursor-pointer"
                >
                  {/* Spine simulated */}
                  <div className="absolute top-0 bottom-0 left-0 w-[24px] bg-black/20 origin-left transform -rotate-y-90 rounded-l-md" />
                  
                  {/* Book cover body */}
                  <div className={`w-full h-full rounded-r-xl shadow-2xl bg-gradient-to-br ${book.coverColor} p-6 text-white flex flex-col justify-between border-l border-white/20 select-none relative overflow-hidden`}>
                    {/* Cover Gloss Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    
                    {/* Sticker */}
                    <div className="flex justify-between items-start">
                      <span className="text-3xl filter drop-shadow">{book.coverEmoji}</span>
                      {book.offerBadge && (
                        <span className="bg-brand-accent text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                          {book.offerBadge}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mt-4 z-10">
                      <h4 className="font-display text-lg font-bold leading-tight line-clamp-3 text-white/95">
                        {book.title}
                      </h4>
                      <p className="text-xs text-white/70 font-medium">By {book.author}</p>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/20 pt-3 mt-4 text-[10px] font-mono text-white/65">
                      <span>{book.publisher.split(" ")[0]}</span>
                      <span>{book.edition}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Cover Note */}
              <p className="text-[10px] text-slate-400 mt-3 italic text-center">
                Interactive 3D preview. Drag/Hover cover to view dimensions.
              </p>

              {/* High lights */}
              <div className="grid grid-cols-2 gap-3 w-full mt-6">
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Pages</span>
                  <span className="text-sm font-mono font-bold text-slate-700">{book.pages} pages</span>
                </div>
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100 text-center">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Rating</span>
                  <span className="text-sm font-bold text-amber-500 flex items-center justify-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> {book.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Details */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="inline-block bg-blue-50 text-brand-primary text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                  {book.category} {book.subcategory ? `• ${book.subcategory}` : ""}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                  {book.title}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Written by <span className="font-semibold text-slate-700">{book.author}</span> | Published by <span className="font-semibold text-brand-secondary">{book.publisher}</span>
                </p>
              </div>

              {/* Price block */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-semibold block uppercase">Our Special Stall Price</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-mono font-extrabold text-slate-800">₹{book.price}</span>
                    {book.oldPrice && (
                      <span className="text-sm font-mono text-slate-400 line-through">₹{book.oldPrice}</span>
                    )}
                  </div>
                </div>
                {book.oldPrice && (
                  <div className="bg-brand-accent/20 border border-brand-accent/30 text-brand-secondary px-3 py-1.5 rounded-xl text-center">
                    <span className="text-[10px] uppercase font-bold block leading-none">Instant Saving</span>
                    <span className="text-sm font-mono font-black">₹{book.oldPrice - book.price}</span>
                  </div>
                )}
              </div>

              {/* Book Metadata details */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 bg-white border border-slate-100 rounded-2xl p-4 text-sm shadow-sm">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">ISBN-13 Code</span>
                  <span className="font-mono font-semibold text-slate-700">{book.isbn}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Edition Year</span>
                  <span className="font-semibold text-slate-700">{book.edition}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Publication Language</span>
                  <span className="font-semibold text-slate-700">{book.language}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Availability Status</span>
                  <span className="font-semibold text-brand-success flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-success animate-ping" />
                    Available Instantly
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">About this publication</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Dynamic Action Area: Branch inquiries via WhatsApp */}
              <div className="space-y-3 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 text-slate-800 font-bold text-sm uppercase tracking-wide">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  <span>Stall Check & Same-Day WhatsApp pickup</span>
                </div>
                <p className="text-xs text-slate-500">
                  Select your nearest branch to verify live inventory, reserve your book, or coordinate fast home delivery on WhatsApp:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {BRANCHES.map((b, i) => (
                    <button
                      key={i}
                      onClick={() => handleWhatsAppInquiry(b.name, b.whatsapp)}
                      className="flex flex-col items-start p-3 bg-slate-50 hover:bg-green-50/50 border border-slate-200/60 hover:border-green-300 rounded-xl text-left transition-all duration-300 group cursor-pointer"
                    >
                      <span className="text-xs font-bold text-slate-800 group-hover:text-green-700">
                        {b.name.split(" ")[0]}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{b.phone}</span>
                      <span className="mt-2 text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 group-hover:bg-green-200">
                        <Send className="w-2.5 h-2.5" /> Chat Stall
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related books segment */}
          {relatedBooks.length > 0 && (
            <div className="border-t border-slate-100 pt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-accent" /> Related Publications
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedBooks.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => onBookClick(b.id)}
                    className="flex gap-3 bg-slate-50/50 hover:bg-white p-3 border border-slate-100 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md"
                  >
                    <div className={`w-12 h-16 rounded bg-gradient-to-br ${b.coverColor} text-white flex items-center justify-center text-lg shadow-sm flex-shrink-0`}>
                      {b.coverEmoji}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-slate-800 truncate leading-snug">
                        {b.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">By {b.author}</p>
                      <span className="text-xs font-mono font-bold text-slate-700 block mt-1">₹{b.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
