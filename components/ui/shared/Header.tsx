import Link from "next/link";
import { HeartPulse, Calendar, Phone } from "lucide-react";
import GradientButton from "./GradientButton";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-slate-950/20 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2">
          <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 group shrink-0">
            <div className="bg-rose-500/10 p-1.5 sm:p-2 rounded-lg sm:rounded-xl border border-rose-500/20 group-hover:border-rose-500/40 group-hover:bg-rose-500/20 transition-all duration-300">
              <HeartPulse className="h-5 w-5 sm:h-6 sm:w-6 text-rose-500 animate-pulse" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-rose-400 transition-colors duration-300">
              ho<span className="text-rose-500">S</span>pital
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link 
              href="/" 
              className="text-white/80 hover:text-white font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-rose-500 after:transition-all after:duration-300"
            >
              Home
            </Link>
            <Link 
              href="#services" 
              className="text-white/80 hover:text-white font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-rose-500 after:transition-all after:duration-300"
            >
              Services
            </Link>
            <Link 
              href="#departments" 
              className="text-white/80 hover:text-white font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-rose-500 after:transition-all after:duration-300"
            >
              Departments
            </Link>
            <Link 
              href="#about" 
              className="text-white/80 hover:text-white font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-rose-500 after:transition-all after:duration-300"
            >
              About
            </Link>
            <Link 
              href="#contact" 
              className="text-white/80 hover:text-white font-medium text-sm transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-rose-500 after:transition-all after:duration-300"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a
              href="tel:+18005550199"
              className="hidden lg:flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold transition-colors mr-2"
            >
              <Phone className="h-4 w-4 text-rose-500" />
              <span>1-800-555-0199</span>
            </a>
            
            <GradientButton
              href="#appointment"
              className="px-3.5 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl shadow-rose-500/25 hover:shadow-rose-500/40 gap-1.5 sm:gap-2"
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Book Appointment</span>
            </GradientButton>
          </div>
        </div>
      </div>
    </header>
  );
}