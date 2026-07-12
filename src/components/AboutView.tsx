import { Award, Compass, Heart, Users, Calendar, ArrowRight } from "lucide-react";

export default function AboutView() {
  const milestones = [
    {
      year: "1998",
      title: "Humble Beginnings",
      description: "Started as a small 10x10 sq.ft physical academic stall near Kottayam KSRTC bus stand to support local degree and high school students with used and new textbooks."
    },
    {
      year: "2005",
      title: "Wholesale school integration",
      description: "Integrated directly with S Chand and NCERT publishers, supplying customized reference guides and board textbook kits to CBSE/ICSE schools across central Kerala."
    },
    {
      year: "2012",
      title: "Ernakulam YMCA expansion",
      description: "Opened our second multi-story branch on Press Club Road, Kochi, becoming the prime hub for engineering, commerce, and computer science semester reference books."
    },
    {
      year: "2018",
      title: "Trivandrum South-Kerala outlet",
      description: "Inaugurated our landmark Trivandrum branch near Overbridge junction, catering extensively to civil services (UPSC) and state competitive exam aspirants."
    },
    {
      year: "2026",
      title: "Dynamic digital cataloging",
      description: "Evolved our system with digital inventory tracking, allowing students to inspect title availability online and order books via prompt WhatsApp chat queues."
    }
  ];

  return (
    <div className="max-y-12 pb-16 space-y-16">
      
      {/* 1. Immersive Story Hero */}
      <section className="relative overflow-hidden bg-[#0D47A1] text-white py-16 px-4 sm:px-6 lg:px-8 text-center rounded-b-[40px] shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-950/80" />
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="bg-brand-accent text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            Our Journey
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Supporting Kerala's Scholars For Over 28 Years
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            The story of how a tiny book stall near the bus stand became the most trusted household name for academic and general literature.
          </p>
        </div>
      </section>

      {/* 2. Brand Mission, Vision, and Story Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">
            Stall Story
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-none">
            Where Knowledge Is Kept Accessible
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Students Book Stall was founded in 1998 by a group of educators who believed that premium study books shouldn't cost high fortunes. What started as a tiny reference hub in Kottayam quickly grew into a massive network by prioritizing students' immediate curriculum requirements.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Today, we are authorized distributors for major publishing giants, serving over 100 CBSE schools and thousands of self-study aspirants across the state.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <span className="text-2xl font-black text-brand-primary font-display block">100K+</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Syllabus Kits Supplied</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
              <span className="text-2xl font-black text-brand-primary font-display block">15,000+</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Active Academic Titles</span>
            </div>
          </div>
        </div>

        {/* Vision & Mission Card box */}
        <div className="space-y-6 bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-8">
          <div className="flex gap-4">
            <div className="bg-blue-100 text-brand-primary p-3 rounded-xl h-fit">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-800 text-base">Our Central Mission</h3>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                To simplify book procurement for students, parents, and schools by keeping standard curriculum guidelines in continuous, affordable, and easily reachable physical stock.
              </p>
            </div>
          </div>

          <div className="flex gap-4 border-t border-slate-200/80 pt-6">
            <div className="bg-blue-100 text-brand-primary p-3 rounded-xl h-fit">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-slate-800 text-base">Our Vision</h3>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                To establish an interconnected statewide academic distribution channel, combining prompt physical branch outlets with effortless digital lookups and prompt dispatch delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-slate-50 py-12 border-y border-slate-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">Our Core Pillars</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
              Pillars of Educational trust
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Student-First Affordability",
                desc: "We continuously lobby publishers for student welfare discount rates, keeping final textbook prices well below market averages."
              },
              {
                icon: Users,
                title: "Genuine Publications Only",
                desc: "We strictly refrain from photocopies, piracy, or duplicate prints. Every syllabus guide is 100% authentic and verified."
              },
              {
                icon: Award,
                title: "Prompt Kerala Dispatch",
                desc: "Same-day physical pickup or overnight door-to-door express parcel courier service for students located across remote Kerala villages."
              }
            ].map((v, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center space-y-3">
                <div className="w-10 h-10 bg-blue-50 text-brand-primary rounded-xl mx-auto flex items-center justify-center">
                  <v.icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-slate-800 text-sm">{v.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Journey Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <span className="text-xs font-bold text-brand-primary uppercase tracking-widest block">Timeline</span>
          <h2 className="font-display text-2xl font-bold text-slate-800 mt-1">
            Our Timeline Milestones
          </h2>
        </div>

        <div className="relative border-l-2 border-blue-100 pl-6 ml-4 space-y-8">
          {milestones.map((m, i) => (
            <div key={i} className="relative">
              {/* Dot indicator */}
              <div className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-brand-primary border-4 border-white text-white flex items-center justify-center text-[10px] shadow-sm font-bold z-10">
                •
              </div>

              <div className="space-y-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-brand-primary text-sm flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-lg">
                    <Calendar className="w-3.5 h-3.5" /> {m.year}
                  </span>
                  <h4 className="font-display font-bold text-slate-800 text-sm capitalize">
                    {m.title}
                  </h4>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mt-1">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
