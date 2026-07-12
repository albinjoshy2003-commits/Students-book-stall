import { useState, FormEvent } from "react";
import { Phone, Mail, Clock, Send, CheckCircle2, MapPin, Map, HelpCircle } from "lucide-react";
import { BRANCHES } from "../data";

export default function ContactView() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // clear fields
      setName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Contact Section Header */}
      <div className="bg-[#0D47A1] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 rounded-l-full filter blur-xl pointer-events-none" />
        <div className="relative z-10 max-w-xl space-y-2">
          <span className="inline-block bg-brand-accent text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
            Direct Helpdesk
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Connect With Our Stalls
          </h1>
          <p className="text-white/80 text-xs sm:text-sm">
            Have questions regarding book editions, syllabus sets, or wholesale supplies? Reach out to our central desk or select a branch below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Branch lists & contact cards */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Our Physical Outlets
          </span>

          <div className="space-y-4">
            {BRANCHES.map((b, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3 hover:border-brand-primary transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-display font-extrabold text-sm text-slate-800">
                      {b.name}
                    </h3>
                    <p className="text-slate-500 text-[11px] mt-1 leading-snug">{b.address}</p>
                  </div>
                  <span className="bg-blue-50 text-brand-primary text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 border-t border-slate-50 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{b.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-primary" />
                    <span className="truncate">{b.timing.split("(")[0]}</span>
                  </div>
                </div>

                {/* Live WhatsApp chat trigger */}
                <button
                  onClick={() => {
                    const text = `Hi ${b.name}, I'm calling from your catalog website. Is an assistant available to chat about stock?`;
                    const clean = b.whatsapp.replace(/[^0-9]/g, "");
                    window.open(`https://api.whatsapp.com/send?phone=${clean}&text=${encodeURIComponent(text)}`, "_blank");
                  }}
                  className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-bold text-xs py-2 rounded-xl border border-green-200/50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.012 14.06 1 11.457 1c-5.44 0-9.866 4.372-9.87 9.802 0 1.96.512 3.878 1.483 5.584L1.93 22.17l5.836-1.516z"/>
                  </svg>
                  Connect on WhatsApp Desk
                </button>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Map className="w-4 h-4 text-brand-primary" /> Core Stall Geography
            </span>
            <div className="bg-blue-50/60 aspect-[16/9] rounded-xl flex flex-col items-center justify-center p-4 border border-blue-100/40 text-center space-y-2 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D47A1_1px,transparent_1px)] [background-size:16px_16px]" />
              <MapPin className="w-8 h-8 text-brand-primary animate-bounce" />
              <div>
                <p className="text-xs font-bold text-slate-800">Kerala Central Route Map</p>
                <p className="text-[10px] text-slate-500">Kottayam (HQ) • Cochin Press Club • Trivandrum Overbridge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Feedback Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Stall Inquiry Form
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight mb-4">
                Send a Direct Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-150 rounded-2xl p-8 text-center space-y-4 my-8">
                  <CheckCircle2 className="w-16 h-16 text-brand-success mx-auto" />
                  <div>
                    <h3 className="font-display font-bold text-slate-800">Inquiry Received Successfully</h3>
                    <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                      Thank you for contacting Students Book Stall. A reference manager from our Kottayam head desk has cataloged your ticket and will reply on email/phone within 2 business hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Submit Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 block">Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Albin Joshy"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 block">WhatsApp / Phone</label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 9447012345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 block">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. user@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 block">Subject / Book Requested</label>
                    <input
                      type="text"
                      placeholder="e.g. Engineering Math, NCERT Class XII kit..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 block">Your Message *</label>
                    <textarea
                      placeholder="Enter book specifications, required editions, wholesale quantity or general feedback..."
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-400"
                    id="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Transmitting Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-brand-accent" /> Send Central Desk Ticket
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3 text-slate-500 text-[10px]">
              <HelpCircle className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
              <p className="leading-normal">
                All data transmitted is secured. For extreme urgent bookings or immediate bulk school syllabus distributions, please contact our Kottayam branch headquarters on <strong>+91 481 2561234</strong> directly.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
