
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, CalendarCheck, Phone, IndianRupee, ClipboardList, ListTodo, Globe } from "lucide-react";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2">
                 <Link href="/" className="flex items-center gap-2 font-bold text-lg mr-6">
                    <Globe className="h-6 w-6 text-primary" />
                    <span>Zensolve</span>
                </Link>
                <SidebarTrigger />
            </div>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/employee/dashboard"}>
                <Link href="/employee/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/employee/attendance"}>
                <Link href="/employee/attendance">
                    <CalendarCheck />
                    <span>Attendance</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <SidebarMenuButton asChild isActive={pathname === "/employee/dsr"}>
                <Link href="/employee/dsr">
                    <ClipboardList />
                    <span>DSR</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <SidebarMenuButton asChild isActive={pathname === "/employee/calls"}>
                <Link href="/employee/calls">
                    <Phone />
                    <span>Calls</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
             <SidebarMenuButton asChild isActive={pathname === "/employee/pending-work"}>
                <Link href="/employee/pending-work">
                    <ListTodo />
                    <span>Pending Work</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
             <SidebarMenuButton asChild isActive={pathname === "/employee/earnings"}>
                <Link href="/employee/earnings">
                    <IndianRupee />
                    <span>Earnings</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
