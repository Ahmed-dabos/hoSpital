"use client"
import { Button } from "@/components/ui/button";
import { toggleArchive } from "./dashboard.server";
export default function ArchiveButton({id, status}:{id : number, status: string} ) {
    return   (             
        <Button
            onClick={async() => await toggleArchive(id)}
            variant="ghost" 
            size="sm" 
            className={`flex-1 gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-300 border backdrop-blur-sm cursor-pointer ${
                status === "archive" 
                    ? "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20 hover:border-emerald-500/30 text-emerald-400 hover:text-emerald-300" 
                    : "bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/20 hover:border-rose-500/30 text-rose-400 hover:text-rose-300"
            }`}
        >
            {status === "archive" ? "publish" : "archive"}
        </Button>)
}