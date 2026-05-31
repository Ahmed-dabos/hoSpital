import { db } from "@/db/database";
import { physicians } from "@/db/schema";
import { getPhysician } from "@/layouts/home";
import { notFound } from "next/navigation";


export async function generateStaticParams() {
    const allPhysicians = await db.select().from(physicians);
    return allPhysicians.map(physician => ({ slug: physician.slug }));
}
import { Stethoscope, Award, Briefcase, GraduationCap } from "lucide-react";

export default async function Physician({params}: {params: Promise<{slug: string}>}) {
  const { slug } = await params
  const physician = await getPhysician(slug)
  if(!physician?.details?.content) {
     return notFound()
  }

  const contentClass = "space-y-4 text-slate-300 leading-relaxed text-sm md:text-base [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:tracking-tight [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:tracking-tight [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:text-slate-300 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:text-slate-300 [&_ul]:my-4 [&_li]:marker:text-rose-500 [&_hr]:border-white/10 [&_hr]:my-6";

  return (
    <main className="mt-25 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white space-y-10 animate-in fade-in duration-500">
      <div className="relative rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden hover:border-rose-500/20 transition-all duration-300 shadow-2xl p-6 md:p-10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative h-44 w-44 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shrink-0 group">
            <img 
              src={physician.imgUrl} 
              alt={physician.name} 
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 uppercase">
                {physician.department.name} Department
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {physician.name}
              </h1>
              <p className="text-lg text-slate-300 font-medium flex items-center justify-center md:justify-start gap-2">
                <Briefcase className="h-4 w-4 text-rose-400" />
                {physician.title}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/40 p-3.5 rounded-xl border border-white/5">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Status</p>
                <p className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5 justify-center md:justify-start">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active Care
                </p>
              </div>
              <div className="bg-slate-950/40 p-3.5 rounded-xl border border-white/5">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Department</p>
                <p className="text-sm font-semibold text-rose-400 mt-1 truncate">
                  {physician.department.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 hover:border-rose-500/20 transition-all duration-300 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Clinical Affiliation
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Stethoscope className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Practice</p>
                  <p className="text-sm text-slate-200 mt-0.5">{physician.department.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2 border-t border-white/5">
                <Award className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Specialty Title</p>
                  <p className="text-sm text-slate-200 mt-0.5">{physician.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <section id="exp" className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 hover:border-rose-500/20 transition-all duration-300 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-4 border-b border-white/5">
              <GraduationCap className="h-5 w-5 text-rose-500" />
              Professional Experience & Bio
            </h2>
            <div
              className={contentClass}
              dangerouslySetInnerHTML={{
                __html: physician.details?.content.Experiences,
              }}
            />
          </section>
        </div>
      </div>
    </main>
  )
}

