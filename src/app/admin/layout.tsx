
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, PlusCircle, Users, Briefcase, Mail } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({
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
                    <Image src="https://github.com/akm12109/zensolve-assets/blob/main/Logo%20Zensolve.jpg?raw=true" alt="Zensolve Logo" width={32} height={32} className="rounded-md" />
                    <span>Zensolve</span>
                </Link>
                <SidebarTrigger />
            </div>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                <Link href="/admin">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <SidebarMenuButton asChild isActive={pathname === "/admin/add-job"}>
                <Link href="/admin/add-job">
                    <PlusCircle />
                    <span>Add Job</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <SidebarMenuButton asChild isActive={pathname === "/admin/applications"}>
                <Link href="/admin/applications">
                    <Users />
                    <span>Applications</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
             <SidebarMenuButton asChild isActive={pathname === "/admin/employees"}>
                <Link href="/admin/employees">
                    <Briefcase />
                    <span>Employees</span>
                </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <SidebarMenuButton asChild isActive={pathname === "/admin/newsletter"}>
                <Link href="/admin/newsletter">
                    <Mail />
                    <span>Newsletter</span>
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
