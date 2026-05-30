"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logout } from "@/layouts/auth/auth.actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { HeartPulse, LayoutDashboard, FolderPlus, UserPlus, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Add Department",
      href: "/dashboard/add-department",
      icon: FolderPlus,
    },
    {
      title: "Add Physician",
      href: "/dashboard/add-physician",
      icon: UserPlus,
    },
  ];

  return (
    <Sidebar className="border-r border-white/5 bg-slate-950/80 backdrop-blur-md">
      <SidebarHeader className="border-b border-white/5 py-5 px-5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-rose-500/10 p-1.5 rounded-lg border border-rose-500/20 group-hover:border-rose-500/40 group-hover:bg-rose-500/20 transition-all duration-300">
            <HeartPulse className="h-4.5 w-4.5 text-rose-500 animate-pulse" />
          </div>
          <span className="text-lg font-black tracking-tight text-white group-hover:text-rose-400 transition-colors duration-300">
            ho<span className="text-rose-500">S</span>pital
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-5 gap-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 block select-none">
          Administrative Actions
        </span>
        <SidebarMenu className="gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 border border-transparent select-none cursor-pointer",
                    isActive
                      ? "bg-rose-500/10 text-rose-400 border-rose-500/20 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  <Link href={item.href}>
                    <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-rose-400" : "text-slate-400 group-hover/menu-button:text-slate-200")} />
                    <span className="text-sm tracking-wide">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 p-4 flex flex-col gap-2">
        <form action={logout} className="w-full">
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10 rounded-xl px-3 py-2.5 transition-all duration-300 cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="text-sm font-semibold tracking-wide">Logout</span>
          </Button>
        </form>
      </SidebarFooter>
    </Sidebar>
  );
}