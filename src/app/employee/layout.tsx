
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider, Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { LayoutDashboard, CalendarCheck, Phone, IndianRupee, ClipboardList, ListTodo, LogOut } from "lucide-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        if (pathname !== "/employee/login" && pathname !== "/employee/register") {
            router.push("/employee/login");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user && pathname !== "/employee/login" && pathname !== "/employee/register") {
    return null; // or a loading spinner, as the redirect is happening
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}


export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push("/employee/login");
    } catch (error) {
      toast({ variant: "destructive", title: "Logout Failed", description: "Something went wrong." });
    }
  };
  
  if (pathname === '/employee/login' || pathname === '/employee/register') {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
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
            <div className="mt-auto p-2">
                <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
          </Sidebar>
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
    </AuthProvider>
  );
}
