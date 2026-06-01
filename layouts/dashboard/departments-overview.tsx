import { Layers, Pencil, Stethoscope } from "lucide-react";
import DeleteButton from "./delete-button";
import ArchiveButton from "./archive-button";
import { getDepartmentsOverview, getPhysicians } from "./dashboard.server";
import { Button } from "@/components/ui/button";    
import Link from "next/link";
export default async function DepartmentsOverview() {
    const departments = await getDepartmentsOverview()
    const physicans = await getPhysicians()
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <Layers className="h-8 w-8 text-rose-500" />
                        Clinical Departments
                    </h1>
                    <p className="text-sm font-light text-slate-400 mt-1">
                        Overview of active medical divisions, emergency care units, and clinical channels.
                    </p>
                </div>
                <div className="bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20 text-xs font-semibold text-rose-400 w-fit">
                    {departments.length} total departments
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map(department => (
                    <div 
                        key={department.id}
                        className="relative group rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden hover:border-rose-500/30 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between"
                    >
                        {department.status === "archive" ? (
                            <p className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-rose-500/20 border border-rose-500/30 text-rose-300 backdrop-blur-md shadow-md">
                                archived
                            </p>
                        ) : (
                            <p className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 backdrop-blur-md shadow-md">
                                published
                            </p>
                        )}
                        <div className="aspect-[16/10] w-full overflow-hidden relative border-b border-white/5 bg-slate-950">
                            <img 
                                src={department.imgUrl} 
                                alt={department.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1">
                                    Active Division
                                </span>
                                <h3 className="text-lg font-bold text-white tracking-tight">
                                    {department.name}
                                </h3>
                                <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                                    Fully configured with 24/7 staff coverage schedules, specialized medical systems, and integrated clinical workflows.
                                </p>
                            </div>
                            
                            <div className="border-t border-white/5 mt-5 pt-4 flex gap-2 w-full">
                                <DeleteButton id={department.id} type="department" />
                                <ArchiveButton id={department.id} status={department.status} />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-1 gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 bg-slate-800/40 hover:bg-slate-800/60 text-slate-300 hover:text-white cursor-pointer backdrop-blur-sm"
                                    asChild
                                >
                                    <Link href={`/dashboard/edit-department/${department.slug}`} className="flex items-center justify-center gap-1.5 w-full h-full">
                                        <Pencil className="h-3.5 w-3.5 text-slate-400" />
                                        edit
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <hr />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                        <Stethoscope className="h-8 w-8 text-rose-500" />
                        Clinical physicians
                    </h1>
                    <p className="text-sm font-light text-slate-400 mt-1">
                        Overview of all clinical physicans in our departments
                    </p>
                </div>
                <div className="bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20 text-xs font-semibold text-rose-400 w-fit">
                    {physicans.length} total physicians
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {physicans.map(physician => (
                    <div 
                        key={physician.id}
                        className="relative group rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden hover:border-rose-500/30 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div className="aspect-[16/10] w-full overflow-hidden relative border-b border-white/5 bg-slate-950">
                            <img 
                                src={physician.imgUrl} 
                                alt={physician.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-1">
                                    deparmtment: {physician.department ? physician.department.name : "unknown"}
                                </span>
                                <h3 className="text-lg font-bold text-white tracking-tight">
                                    {physician.name}
                                </h3>
                                <p className="text-sm  text-white tracking-tight">
                                    {physician.title}
                                </p>
                            </div>
                            
                            <div className="border-t border-white/5 mt-5 pt-4 flex gap-2 w-full">
                                <DeleteButton id={physician.id} type="physician" />
                                    <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-1 gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 bg-slate-800/40 hover:bg-slate-800/60 text-slate-300 hover:text-white cursor-pointer backdrop-blur-sm"
                                    asChild
                                >
                                    <Link href={`/dashboard/edit-physician/${physician.slug}`} className="flex items-center justify-center gap-1.5 w-full h-full">
                                        <Pencil className="h-3.5 w-3.5 text-slate-400" />
                                        edit
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
