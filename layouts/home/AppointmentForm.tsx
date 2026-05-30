"use client"

import { Calendar } from "lucide-react";
import GradientButton from "@/components/ui/shared/GradientButton";

export default function AppointmentForm() {
  return (
    <form 
      id="appointment"
      onSubmit={(e) => e.preventDefault()}
      className="bg-slate-900/40 border border-white/10 p-6 sm:p-10 rounded-3xl backdrop-blur-md relative overflow-hidden space-y-6"
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-white">Book Private Consultation</h3>
        <p className="text-slate-400 text-sm font-light">Fill out this quick form to reserve your diagnostic slot instantly.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Full Name</label>
          <input 
            type="text" 
            placeholder="Jane Doe"
            className="w-full bg-slate-950/60 border border-white/10 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 rounded-xl px-4 py-3.5 text-white text-sm transition-all outline-none"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            placeholder="jane@example.com"
            className="w-full bg-slate-950/60 border border-white/10 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 rounded-xl px-4 py-3.5 text-white text-sm transition-all outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Preferred Date</label>
          <input 
            type="date" 
            className="w-full bg-slate-950/60 border border-white/10 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 rounded-xl px-4 py-3.5 text-white text-sm transition-all outline-none"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Target Specialty</label>
          <select 
            className="w-full bg-slate-950/60 border border-white/10 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 rounded-xl px-4 py-3.5 text-white text-sm transition-all outline-none"
            required
          >
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="oncology">Oncology</option>
            <option value="orthopedics">Orthopedics</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">Consultation Notes</label>
        <textarea 
          placeholder="Briefly describe your symptoms or booking requirements..."
          className="w-full bg-slate-950/60 border border-white/10 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 rounded-xl px-4 py-3.5 text-white text-sm transition-all outline-none h-32 resize-none"
        ></textarea>
      </div>

      <GradientButton
        type="submit"
        className="w-full py-4 shadow-rose-500/25 hover:shadow-rose-500/40 gap-2"
      >
        <Calendar className="h-4 w-4" />
        <span>Reserve Appointment</span>
      </GradientButton>
    </form>
  );
}
