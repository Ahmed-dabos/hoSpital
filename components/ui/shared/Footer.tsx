import Link from "next/link";
import { HeartPulse, Mail, MapPin, Phone } from "lucide-react";
import { getDepartments } from "@/layouts/home/departments.actions";
export default async function Footer() {
  const departments = await getDepartments()
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8 text-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-white/5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-rose-500/10 p-2 rounded-xl border border-rose-500/20 group-hover:border-rose-500/40 group-hover:bg-rose-500/20 transition-all duration-300">
                <HeartPulse className="h-6 w-6 text-rose-500 animate-pulse" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-rose-400 transition-colors duration-300">
                ho<span className="text-rose-500">S</span>pital
              </span>
            </Link>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Providing standard-setting elite healthcare treatments since 2001. Combining advanced diagnostics with human compassion to care for you and your family.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-900 border border-white/5 hover:border-rose-500/40 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-900 border border-white/5 hover:border-rose-500/40 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-900 border border-white/5 hover:border-rose-500/40 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-slate-900 border border-white/5 hover:border-rose-500/40 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-all duration-300">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-base uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#departments" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-base uppercase tracking-wider">Our Departments</h4>
            <ul className="space-y-2.5">
              {departments.map(department => { 
              return (<li key={department.id}>
                <Link href={`/departments/${department.slug}`} className="text-slate-400 hover:text-rose-400 text-sm transition-colors duration-200">
                  {department.name}
                </Link>
              </li>)
              })}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base uppercase tracking-wider">Clinic Contacts</h4>
            <ul className="space-y-3.5 text-slate-400 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium text-xs">Emergency Hotline</span>
                  <span>1-800-555-0199</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium text-xs">General Support</span>
                  <span>contact@hospital-elite.com</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium text-xs">Clinic Address</span>
                  <span>742 Medical Center Blvd, NY 10019</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs font-light">
          <span>&copy; {new Date().getFullYear()} hoSpital. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors duration-200">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}