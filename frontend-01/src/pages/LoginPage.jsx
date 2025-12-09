import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { login, signup, isLoggingIn, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (!isLogin && !formData.fullName.trim()) return toast.error("Full name is required");
    if (!isLogin && formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) login(formData);
      else signup(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 relative overflow-hidden transition-colors duration-500">
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 1. Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] [background-size:24px_24px] z-0" />
        
        {/* 2. Floating Orb Blobs */}
        <motion.div 
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#a1c4fd]/20 rounded-full blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 -right-20 w-80 h-80 bg-[#c2e9fb]/20 rounded-full blur-[100px]"
          animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute -bottom-20 left-1/3 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* --- THE GLASS NEXUS CARD --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        // --- FIX IS HERE: Changed "out" to "easeOut" ---
        transition={{ duration: 0.6, ease: "easeOut" }} 
        className="relative z-10 w-full max-w-md p-2"
      >
        <div className="bg-base-100/60 backdrop-blur-2xl border border-base-200/50 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] overflow-hidden">
          
          <div className="p-8 sm:p-10">
            {/* Header / Logo */}
            <div className="text-center mb-8">
              <motion.div 
                className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-[#a1c4fd]/20 to-[#c2e9fb]/20 mb-4 shadow-sm"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <div className="size-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" }}>
                  <MessageSquare className="size-5 text-[#374151]" />
                </div>
              </motion.div>
              
              <h1 className="text-2xl font-bold tracking-tight mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-sm text-base-content/60">
                {isLogin ? "Enter your details to continue" : "Get started with your free account"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Animated Height Wrapper for Signup Field */}
              <AnimatePresence initial={false}>
                {!isLogin && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="form-control mb-5">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="size-5 text-base-content/40 group-focus-within:text-[#a1c4fd] transition-colors" />
                        </div>
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="input w-full pl-12 bg-base-200/40 border-transparent focus:border-transparent focus:bg-base-100 focus:ring-2 focus:ring-[#a1c4fd]/30 rounded-2xl transition-all h-12"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div className="form-control">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="size-5 text-base-content/40 group-focus-within:text-[#a1c4fd] transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input w-full pl-12 bg-base-200/40 border-transparent focus:border-transparent focus:bg-base-100 focus:ring-2 focus:ring-[#a1c4fd]/30 rounded-2xl transition-all h-12"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="size-5 text-base-content/40 group-focus-within:text-[#a1c4fd] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input w-full pl-12 pr-12 bg-base-200/40 border-transparent focus:border-transparent focus:bg-base-100 focus:ring-2 focus:ring-[#a1c4fd]/30 rounded-2xl transition-all h-12"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center opacity-40 hover:opacity-100 transition-opacity"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn w-full border-none shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-2xl text-[#374151] font-bold text-base h-12 mt-2"
                style={{ background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" }}
                disabled={isLoggingIn || isSigningUp}
              >
                {(isLoggingIn || isSigningUp) ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    {isLogin ? "Sign In" : "Create Account"} 
                    <ArrowRight className="size-4" />
                  </span>
                )}
              </button>
            </form>

            {/* Toggle Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-base-content/60">
                {isLogin ? "New to Memo?" : "Already have an account?"}{" "}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="font-semibold hover:underline text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" }}
                >
                  {isLogin ? "Create account" : "Sign in"}
                </button>
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;