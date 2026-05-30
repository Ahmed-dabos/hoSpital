import HomeCarousel from "./HomeCarousel";
import { Suspense } from "react";
import { 
  Heart, 
  Brain, 
  Baby, 
  Dna, 
  Activity, 
  Bone, 
  CheckCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Phone 
} from "lucide-react";
import AppointmentForm from "./AppointmentForm";
import GradientButton from "@/components/ui/shared/GradientButton";
import Departments from "./departments-section";
export function HomePage() {
  return (
    <main className="w-full min-h-screen bg-slate-950 text-white relative">
      <HomeCarousel />

      <section id="services" className="relative py-24 sm:py-32 overflow-hidden border-b border-white/5 bg-slate-950">
        <div className="absolute top-1/4 left-1/4 w-87.5 h-87.5 rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wider">
              Clinical Operations
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
              Our Core Clinical Services
            </h2>
            <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
              hoSpital delivers customized, world-class healthcare pathways utilizing premium medical intelligence and modern technical infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="relative group p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-rose-500/30 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-rose-500 w-fit group-hover:bg-rose-500/20 group-hover:border-rose-500/40 transition-all duration-300">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mt-6">Emergency & Critical Care</h3>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                Advanced trauma response, highly mobilized emergency surgical units, and 24/7 immediate clinical stabilization pathways.
              </p>
            </div>

            <div className="relative group p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-rose-500/30 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-rose-500 w-fit group-hover:bg-rose-500/20 group-hover:border-rose-500/40 transition-all duration-300">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mt-6">AI-Driven Diagnostics</h3>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                High-resolution medical imaging, automated pathology analytics, and predictive health diagnostic models.
              </p>
            </div>

            <div className="relative group p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-rose-500/30 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-rose-500 w-fit group-hover:bg-rose-500/20 group-hover:border-rose-500/40 transition-all duration-300">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mt-6">Advanced Surgical Suites</h3>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                Minimally invasive robotic-assisted surgery, sterile modern operating theatres, and customized recovery systems.
              </p>
            </div>

            <div className="relative group p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-rose-500/30 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-rose-500 w-fit group-hover:bg-rose-500/20 group-hover:border-rose-500/40 transition-all duration-300">
                <Dna className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mt-6">Primary & Preventive Medicine</h3>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                Holistic primary healthcare clinics, regular wellness diagnostic panels, and customized wellness roadmaps.
              </p>
            </div>

            <div className="relative group p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-rose-500/30 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-rose-500 w-fit group-hover:bg-rose-500/20 group-hover:border-rose-500/40 transition-all duration-300">
                <Baby className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mt-6">Specialized Inpatient Wards</h3>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                Luxury residential recovery rooms featuring 24/7 dedicated nursing staff and real-time biometric telemetry.
              </p>
            </div>

            <div className="relative group p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-rose-500/30 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-rose-500 w-fit group-hover:bg-rose-500/20 group-hover:border-rose-500/40 transition-all duration-300">
                <Bone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white mt-6">Physical & Active Rehabilitation</h3>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                Custom physical therapy regimens, occupational health restoration systems, and skeletal recovery exercises.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="text-white py-12 text-center">loading departments...</div>}>
        <section id="departments" className="bg-slate-900/10">
          <Departments />
        </section>
      </Suspense>

      <section id="about" className="relative py-24 sm:py-32 overflow-hidden border-b border-white/5 bg-slate-900/20">
        <div className="absolute bottom-1/4 right-1/4 w-87.5 h-87.5 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md flex flex-col justify-between h-40 hover:border-rose-500/20 transition-all duration-300">
                <span className="text-4xl sm:text-5xl font-black text-rose-500">25+</span>
                <span className="text-sm sm:text-base font-semibold text-slate-200">Years Excellence</span>
              </div>
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md flex flex-col justify-between h-40 hover:border-rose-500/20 transition-all duration-300">
                <span className="text-4xl sm:text-5xl font-black text-blue-400">500+</span>
                <span className="text-sm sm:text-base font-semibold text-slate-200">Expert Specialists</span>
              </div>
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md flex flex-col justify-between h-40 hover:border-rose-500/20 transition-all duration-300">
                <span className="text-4xl sm:text-5xl font-black text-emerald-400">15k+</span>
                <span className="text-sm sm:text-base font-semibold text-slate-200">Happy Patients</span>
              </div>
              <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md flex flex-col justify-between h-40 hover:border-rose-500/20 transition-all duration-300">
                <span className="text-4xl sm:text-5xl font-black text-indigo-400">99.9%</span>
                <span className="text-sm sm:text-base font-semibold text-slate-200">Success Rate</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                  About hoSpital
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Pioneering Healthcare Excellence Since 2001
                </h2>
              </div>
              <p className="text-slate-400 text-base sm:text-lg font-light leading-relaxed">
                For over two decades, hoSpital has remained at the absolute forefront of advanced medical therapies. We couple digital precision diagnostics with human integrity to give our communities standard-setting patient outcomes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-500 shrink-0" />
                  <span className="text-slate-200 text-sm sm:text-base font-medium">Equipped with 24/7 Rapid Emergency Trauma Units</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-500 shrink-0" />
                  <span className="text-slate-200 text-sm sm:text-base font-medium">AI-Assisted Diagnostics & High-Resolution Pathology Laboratories</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-500 shrink-0" />
                  <span className="text-slate-200 text-sm sm:text-base font-medium">Empathic Post-Operative Treatment and Rehabilitation Plans</span>
                </div>
              </div>
              <div className="pt-2">
                <GradientButton
                  href="#contact"
                  className="px-8 py-4 gap-2"
                >
                  Schedule A Visit
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative py-24 sm:py-32 overflow-hidden bg-slate-950">
        <div className="absolute top-1/3 right-1/4 w-100 h-100 rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="w-full lg:w-5/12 space-y-8 sm:space-y-12">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                  Get In Touch
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Reach Out To Us Anytime
                </h2>
                <p className="text-slate-400 font-light text-base sm:text-lg leading-relaxed pt-2">
                  Our professional service assistants, emergency dispatchers, and clinical administrative staffs remain standing by to handle all patient queries.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-slate-900/30 hover:border-white/10 transition-colors duration-300">
                  <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Emergency Hotlines</h4>
                    <p className="text-slate-300 text-sm mt-1">1-800-555-0199 (Toll Free)</p>
                    <p className="text-rose-500 text-xs font-bold mt-0.5">24/7 Immediate Trauma Dispatch</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-slate-900/30 hover:border-white/10 transition-colors duration-300">
                  <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">General Email</h4>
                    <p className="text-slate-300 text-sm mt-1">contact@hospital-elite.com</p>
                    <p className="text-slate-500 text-xs mt-0.5">Response within 12 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-slate-900/30 hover:border-white/10 transition-colors duration-300">
                  <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Hospital Location</h4>
                    <p className="text-slate-300 text-sm mt-1">742 Medical Center Boulevard, Suite 100</p>
                    <p className="text-slate-500 text-xs mt-0.5">New York, NY 10019</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-slate-900/30 hover:border-white/10 transition-colors duration-300">
                  <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 text-indigo-400 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Visiting Hours</h4>
                    <p className="text-slate-300 text-sm mt-1">Daily: 08:00 AM - 08:00 PM</p>
                    <p className="text-slate-500 text-xs mt-0.5">Specialized ICU: 11:00 AM - 04:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-7/12">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}