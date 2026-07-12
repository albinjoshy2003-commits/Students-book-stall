import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { X, User, GraduationCap, School, CheckCircle2, Mail, Lock, KeyRound } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (username: string, role: string) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState<"student" | "parent" | "teacher">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please fill in your email address.");
      return;
    }
    if (!password || password.length < 5) {
      setError("Password must be at least 5 characters long.");
      return;
    }
    if (!isLogin && !name) {
      setError("Please enter your name.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      onSuccess(isLogin ? email.split("@")[0] : name, userRole);
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Content card */}
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10"
      >
        {/* Top bar styling */}
        <div className="bg-brand-primary p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-black/15 hover:bg-black/30 transition-colors duration-200 text-white"
            id="auth-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h3 className="font-display text-2xl font-bold mb-1">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h3>
          <p className="text-white/80 text-xs">
            {isLogin 
              ? "Access study guides, competitive test preps, and order tracking" 
              : "Register for custom curriculum updates and digital catalogs"}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-brand-success mb-4" />
              <h4 className="font-display text-xl font-bold text-slate-800">
                {isLogin ? "Login Successful!" : "Registration Successful!"}
              </h4>
              <p className="text-slate-500 text-sm mt-1">
                Preparing your customized bookstore dashboard...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Type Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  I am a:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUserRole("student")}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 text-xs font-medium transition-all duration-200 ${
                      userRole === "student"
                        ? "border-brand-primary bg-blue-50 text-brand-primary"
                        : "border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 mb-1" />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole("parent")}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 text-xs font-medium transition-all duration-200 ${
                      userRole === "parent"
                        ? "border-brand-primary bg-blue-50 text-brand-primary"
                        : "border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <User className="w-5 h-5 mb-1" />
                    Parent
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole("teacher")}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border-2 text-xs font-medium transition-all duration-200 ${
                      userRole === "teacher"
                        ? "border-brand-primary bg-blue-50 text-brand-primary"
                        : "border-slate-100 bg-slate-50/50 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <School className="w-5 h-5 mb-1" />
                    Teacher
                  </button>
                </div>
              </div>

              {/* General inputs */}
              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Albin Joshy"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">WhatsApp Number (For Order Tracking)</label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="e.g. +91 9447012345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200"
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 block">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              {error && (
                <div className="text-xs font-medium text-brand-error bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-secondary text-white text-sm font-semibold py-2.5 rounded-xl shadow-lg shadow-brand-primary/25 transition-all duration-200"
              >
                {isLogin ? "Sign In" : "Register Now"}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="text-xs font-semibold text-brand-secondary hover:underline"
                >
                  {isLogin
                    ? "New to Students Book Stall? Create account"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
