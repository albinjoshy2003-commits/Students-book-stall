import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Sparkles } from "lucide-react";

interface SplashProps {
  onComplete: () => void;
  key?: any;
}

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // smooth exit
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#0D47A1] via-[#0A2E6B] to-[#051630] text-white overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `pulse ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center max-w-md px-6 text-center z-10"
      >
        {/* Animated Book opening container */}
        <div className="relative mb-8 w-24 h-24 flex items-center justify-center">
          <motion.div
            animate={{
              rotateY: [0, -180, -360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="book-perspective w-16 h-16 text-brand-accent drop-shadow-[0_10px_15px_rgba(255,179,0,0.3)]"
          >
            <BookOpen className="w-16 h-16" strokeWidth={1.5} />
          </motion.div>
          
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-brand-accent"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-white"
        >
          Students Book Stall
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-brand-accent/90 font-medium italic tracking-wide text-sm md:text-base mb-12"
        >
          "Knowledge Begins Here"
        </motion.p>

        {/* Loading bar container */}
        <div className="w-64 bg-slate-800/80 backdrop-blur-sm rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700/50 mb-4">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            className="bg-gradient-to-r from-brand-accent to-amber-400 h-full rounded-full shadow-[0_0_10px_rgba(255,179,0,0.5)]"
          />
        </div>

        <span className="text-xs font-mono text-slate-300 tracking-wider">
          Loading Library... {progress}%
        </span>

        {/* Skip Button */}
        <motion.button
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 text-xs text-white/50 hover:text-brand-accent font-medium border border-white/20 hover:border-brand-accent/50 rounded-full px-4 py-1.5 transition-colors duration-300"
        >
          Skip Intro
        </motion.button>
      </motion.div>
    </div>
  );
}
