import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <SidebarInset className="flex-1 w-full bg-slate-950 text-white min-h-screen border-none">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}