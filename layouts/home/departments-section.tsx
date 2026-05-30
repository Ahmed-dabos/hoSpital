import { getDepartments } from "./departments.actions";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function departments() {
    const departments = await getDepartments()
    if(departments.length === 0) {
        return  <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                    <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
                        Our Specialized Departments
                    </h2>
                    <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed mb-10">
                        hoSpital features leading clinical departments led by world-class specialists and backed by state-of-the-art medical technology.
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wider">
                        There is no departments right now
                    </span>
                </div>
    }
    return (
        <div className="relative py-24 sm:py-32 overflow-hidden border-b border-white/5 bg-slate-900/20">
            <div className="absolute top-1/3 right-1/4 w-87.5 h-87.5 rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wider">
                        Medical Departments
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 tracking-tight">
                        Our Specialized Departments
                    </h2>
                    <p className="text-slate-400 mt-4 text-base sm:text-lg font-light leading-relaxed">
                        hoSpital features leading clinical departments led by world-class specialists and backed by state-of-the-art medical technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {departments.map(department => (
                        <Link 
                            key={department.id} 
                            href={`/departments/${department.slug}`}
                            className="relative group p-4 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md hover:border-rose-500/30 hover:bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                        >
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl relative">
                                <img 
                                    src={department.imgUrl} 
                                    alt={department.name} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                            </div>
                            
                            <div className="mt-6 flex items-center justify-between">
                                <div>
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                                        Clinical Center
                                    </span>
                                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-rose-400 transition-colors duration-300">
                                        {department.name}
                                    </h3>
                                </div>
                                <div className="bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20 text-rose-500 group-hover:bg-rose-500/20 group-hover:text-rose-400 transition-all duration-300 shrink-0">
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
