import { getOneDepartment } from "@/layouts/home";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Stethoscope, Activity, Layers, Users, HelpCircle } from "lucide-react";


const contentClass = "space-y-4 text-slate-300 leading-relaxed text-sm md:text-base [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:tracking-tight [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:tracking-tight [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:text-slate-300 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:text-slate-300 [&_ul]:my-4 [&_li]:marker:text-rose-500 [&_hr]:border-white/10 [&_hr]:my-6";

export default async function department({params}:{params: Promise<{slug: string}>}) {
    const { slug } = await params
    const department = await getOneDepartment(slug)
    if(!department?.details?.content) {
        return notFound()
    }

    return (
        <main className="mt-25 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-white space-y-10 animate-in fade-in duration-500">
            <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                    src={department?.imgUrl} 
                    alt={department?.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-8 md:p-12">
                    <div className="space-y-3 max-w-3xl">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20 uppercase">
                            Clinical Department
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
                            {department?.name}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {department?.details?.content?.details && (
                        <section id="details" className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 hover:border-rose-500/20 transition-all duration-300 space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-4 border-b border-white/5">
                                <Stethoscope className="h-5 w-5 text-rose-500" />
                                Department Overview
                            </h2>
                            <div
                                className={contentClass}
                                dangerouslySetInnerHTML={{
                                    __html: department?.details?.content?.details,
                                }}
                            />
                        </section>
                    )}

                    {department?.details?.content?.services && (
                        <section id="services" className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 hover:border-rose-500/20 transition-all duration-300 space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-4 border-b border-white/5">
                                <Activity className="h-5 w-5 text-rose-500" />
                                Clinical Services & Treatments
                            </h2>
                            <div
                                className={contentClass}
                                dangerouslySetInnerHTML={{
                                    __html: department?.details?.content?.services,
                                }}
                            />
                        </section>
                    )}

                    {department?.details?.content?.equipments && (
                        <section id="equipments" className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 hover:border-rose-500/20 transition-all duration-300 space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-4 border-b border-white/5">
                                <Layers className="h-5 w-5 text-rose-500" />
                                Medical Technology & Equipment
                            </h2>
                            <div
                                className={contentClass}
                                dangerouslySetInnerHTML={{
                                    __html: department?.details?.content?.equipments,
                                }}
                            />
                        </section>
                    )}
                </div>

                <div className="space-y-8">
                    {department?.physicians && department.physicians.length > 0 && (
                        <section id="physicians" className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 hover:border-rose-500/20 transition-all duration-300 space-y-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-4 border-b border-white/5">
                                <Users className="h-5 w-5 text-rose-500" />
                                Clinical Team
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                {department.physicians.map(physician => (
                                    <div key={physician.id} className="group relative overflow-hidden rounded-xl border border-white/5 bg-slate-950/60 hover:border-rose-500/30 hover:bg-slate-950/80 transition-all duration-300">
                                        <Link href={`/physicians/${physician.slug}`} className="flex items-center gap-4 p-4">
                                            <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                                <img 
                                                    src={physician.imgUrl} 
                                                    alt={physician.name} 
                                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors duration-300 truncate">
                                                    {physician.name}
                                                </h3>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    View Profile
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {department?.details?.content?.faq && (
                        <section id="faq" className="rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md p-6 md:p-8 hover:border-rose-500/20 transition-all duration-300 space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2.5 pb-4 border-b border-white/5">
                                <HelpCircle className="h-5 w-5 text-rose-500" />
                                Frequently Asked Questions
                            </h2>
                            <div
                                className={contentClass}
                                dangerouslySetInnerHTML={{
                                    __html: department?.details?.content?.faq,
                                }}
                            />
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}