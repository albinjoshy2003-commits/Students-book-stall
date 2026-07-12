import { BookOpen, MapPin, Mail, Phone, Calendar, ArrowUp } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Col 1: Store Bio */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <div className="bg-brand-primary p-2 rounded-xl text-brand-accent">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg tracking-tight block leading-none">
                STUDENTS
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-accent uppercase">
                Book Stall
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Kerala's most trusted textbook and reference material distributor since 1998. Supplying school curriculum, degree guides, professional competitive prep, and local literature.
          </p>
          <div className="pt-2 text-xs text-brand-accent font-medium italic">
            "Knowledge Begins Here"
          </div>
        </div>

        {/* Col 2: Top Categories */}
        <div className="space-y-4">
          <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
            Top Categories
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { id: "academic", label: "School & Academic Books" },
              { id: "engineering", label: "Engineering & IT Guides" },
              { id: "medical", label: "Medical & Nursing Manuals" },
              { id: "competitive", label: "Competitive Test Preps" },
              { id: "malayalam", label: "Malayalam Literary Novels" }
            ].map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setCurrentTab("categories")}
                  className="hover:text-brand-accent transition-colors duration-200 text-left"
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
            Useful Resources
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { id: "home", label: "Home Showcase" },
              { id: "offers", label: "Festival & Combo Offers" },
              { id: "about", label: "Our Story & Journey" },
              { id: "contact", label: "Locate Branch Outlets" },
              { id: "contact", label: "Submit Feedback Form" }
            ].map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentTab(link.id)}
                  className="hover:text-brand-accent transition-colors duration-200 text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Reach Out */}
        <div className="space-y-4 text-sm">
          <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
            Central Helpdesk
          </h4>
          <ul className="space-y-3">
            <li className="flex gap-2">
              <Phone className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
              <span>+91 481 2561234 (HQ)</span>
            </li>
            <li className="flex gap-2">
              <Mail className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
              <span className="truncate">info@studentsbookstall.com</span>
            </li>
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
              <span>Kottayam Main Office, Kerala</span>
            </li>
            <li className="flex gap-2">
              <Calendar className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
              <span>Mon - Sat | 09:00 AM - 08:30 PM</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <p>© {new Date().getFullYear()} Students Book Stall. All rights reserved.</p>
          <p className="mt-0.5">Designed with absolute premium educational precision.</p>
        </div>

        {/* Top Scroll button */}
        <button
          onClick={handleScrollTop}
          className="bg-slate-800 hover:bg-brand-primary text-slate-400 hover:text-white p-2.5 rounded-xl transition-all duration-300 shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" /> Scroll to Top
        </button>
      </div>
    </footer>
  );
}
