"use client"

import React from "react"
import Link from "next/link"
import { HeartPulse, Activity, Sparkles, Phone, Calendar } from "lucide-react"
import GradientButton from "@/components/ui/shared/GradientButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function HomeCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  React.useEffect(() => {
    if (!api) return

    const autoplayInterval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 6000)

    return () => clearInterval(autoplayInterval)
  }, [api])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent className="h-full">
          <CarouselItem className="h-full w-full relative flex items-center justify-center bg-[url('/photo_2026-05-20_01-20-13.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
            
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl mx-auto space-y-6">
                <span 
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 backdrop-blur-md uppercase tracking-wider transition-all duration-1000 transform ${
                    current === 0 ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
                  }`}
                >
                  <HeartPulse className="h-3.5 w-3.5 text-rose-500 animate-pulse" /> Elite Healthcare Services
                </span>
                
                <h1 
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight select-none transition-all duration-1000 transform delay-100 ${
                    current === 0 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  Compassionate Care, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-500 to-red-500">
                    Advanced Medicine
                  </span>
                </h1>
                
                <p 
                  className={`text-base sm:text-lg md:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed select-none transition-all duration-1000 delay-200 transform ${
                    current === 0 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  Empowering our community with state-of-the-art diagnostics, world-class medical specialists, and dedicated primary care clinics.
                </p>
                
                <div 
                  className={`pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 transform ${
                    current === 0 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <GradientButton
                    href="#services"
                    className="w-full sm:w-auto px-8 py-4 gap-2"
                  >
                    <span>Explore Services</span>
                  </GradientButton>
                  <Link
                    href="#departments"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Explore Departments</span>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="h-full w-full relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-indigo-950 to-blue-950">
              <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[150px] animate-pulse duration-5000" />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl mx-auto space-y-6">
                <span 
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md uppercase tracking-wider transition-all duration-1000 transform ${
                    current === 1 ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
                  }`}
                >
                  <Activity className="h-3.5 w-3.5 text-blue-500 animate-bounce" /> Emergency Response Center
                </span>
                
                <h1 
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight select-none transition-all duration-1000 transform delay-100 ${
                    current === 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  Emergency Trauma Care <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
                    Active 24 Hours a Day
                  </span>
                </h1>
                
                <p 
                  className={`text-base sm:text-lg md:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed select-none transition-all duration-1000 delay-200 transform ${
                    current === 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  Equipped with highly specialized trauma surgeons, rapid response ambulances, and immediate critical care units.
                </p>
                
                <div 
                  className={`pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 transform ${
                    current === 1 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <a
                    href="tel:911"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Get Immediate Help</span>
                  </a>
                  <Link
                    href="#emergency"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Emergency Units</span>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem className="h-full w-full relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950">
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[130px] animate-pulse duration-7000" />
              <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full bg-teal-500/10 blur-[110px] animate-pulse duration-3000" />
              <div className="absolute inset-0 bg-slate-950/20" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl mx-auto space-y-6">
                <span 
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md uppercase tracking-wider transition-all duration-1000 transform ${
                    current === 2 ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> Medical Innovation
                </span>
                
                <h1 
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight select-none transition-all duration-1000 transform delay-100 ${
                    current === 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  Next-Gen Medical AI <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">
                    Clinical Diagnostics
                  </span>
                </h1>
                
                <p 
                  className={`text-base sm:text-lg md:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed select-none transition-all duration-1000 delay-200 transform ${
                    current === 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  Pioneering clinical AI research and digital imaging diagnostics to deliver precise pathology and fast, customized therapeutic paths.
                </p>
                
                <div 
                  className={`pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-300 transform ${
                    current === 2 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                >
                  <Link
                    href="#appointment"
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book Diagnostics</span>
                  </Link>
                  <Link
                    href="#research"
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Our Technology</span>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious className="hidden md:inline-flex absolute left-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full border border-white/15 bg-slate-950/40 text-white backdrop-blur-md hover:bg-slate-900/60 hover:text-white transition-all duration-300 hover:scale-105" />
        <CarouselNext className="hidden md:inline-flex absolute right-6 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full border border-white/15 bg-slate-950/40 text-white backdrop-blur-md hover:bg-slate-900/60 hover:text-white transition-all duration-300 hover:scale-105" />

        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center items-center gap-3">
          {Array.from({ length: count }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 focus:outline-none focus:ring-1 focus:ring-rose-500/50 ${
                current === idx 
                  ? "w-8 bg-rose-500" 
                  : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Show slide ${idx + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}