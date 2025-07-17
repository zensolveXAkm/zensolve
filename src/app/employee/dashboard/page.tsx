
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CalendarCheck, Phone, IndianRupee, ClipboardList, ListTodo, Activity } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";

interface DashboardCardData {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description: string;
    href: string;
}

const initialCards: Omit<DashboardCardData, 'value' | 'description'>[] = [
    { title: "Attendance", icon: <CalendarCheck className="h-4 w-4 text-muted-foreground" />, href: "/employee/attendance" },
    { title: "DSR Submitted", icon: <ClipboardList className="h-4 w-4 text-muted-foreground" />, href: "/employee/dsr"},
    { title: "Calls Made", icon: <Phone className="h-4 w-4 text-muted-foreground" />, href: "/employee/calls"},
    { title: "Total Earnings", icon: <IndianRupee className="h-4 w-4 text-muted-foreground" />, href: "/employee/earnings"},
    { title: "Pending Tasks", icon: <ListTodo className="h-4 w-4 text-muted-foreground" />, href: "/employee/pending-work"},
    { title: "Overall Performance", icon: <Activity className="h-4 w-4 text-muted-foreground" />, href: "/employee/performance"},
];

export default function EmployeeDashboardPage() {
    const [dashboardData, setDashboardData] = useState<DashboardCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            
            // TODO: Replace with actual employee ID
            const employeeId = "current_employee_id"; 

            // Fetch total earnings
            let totalEarnings = 0;
            try {
                // For now, fetching all earnings as employeeId is not implemented
                const earningsQuery = query(collection(db, "earnings"));
                const earningsSnapshot = await getDocs(earningsQuery);
                earningsSnapshot.forEach(doc => {
                    totalEarnings += doc.data().amount || 0;
                });
            } catch (error) {
                console.error("Error fetching earnings:", error);
            }
            
            // Fetch other stats similarly in the future
            // For now, they will show placeholder text
            const fetchedData: DashboardCardData[] = [
                { title: "Attendance", value: "N/A", icon: <CalendarCheck className="h-4 w-4 text-muted-foreground" />, description: "Mark today's attendance", href: "/employee/attendance" },
                { title: "DSR Submitted", value: "N/A", icon: <ClipboardList className="h-4 w-4 text-muted-foreground" />, description: "Submit your daily report", href: "/employee/dsr"},
                { title: "Calls Made", value: "N/A", icon: <Phone className="h-4 w-4 text-muted-foreground" />, description: "Log your client calls", href: "/employee/calls"},
                { title: "Total Earnings", value: `₹${totalEarnings.toLocaleString('en-IN')}`, icon: <IndianRupee className="h-4 w-4 text-muted-foreground" />, description: "Earnings you generated", href: "/employee/earnings"},
                { title: "Pending Tasks", value: "N/A", icon: <ListTodo className="h-4 w-4 text-muted-foreground" />, description: "Check your assigned tasks", href: "/employee/pending-work"},
                { title: "Overall Performance", value: "N/A", icon: <Activity className="h-4 w-4 text-muted-foreground" />, description: "View your performance report", href: "/employee/performance"},
            ];
            
            setDashboardData(fetchedData);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const renderCardContent = (card: DashboardCardData) => (
        <>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
            <Button asChild variant="link" className="px-0 mt-2 text-sm">
                <Link href={card.href}>View Details <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
            </Button>
        </>
    );

     const renderLoadingCardContent = () => (
        <>
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4 mt-1" />
            <Skeleton className="h-6 w-24 mt-4" />
        </>
    );

    return (
        <div className="flex min-h-screen flex-col bg-secondary p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl space-y-8">
                <header>
                    <h1 className="text-3xl font-bold">Employee Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's your performance snapshot.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? 
                        initialCards.map(card => (
                            <Card key={card.title}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    {card.icon}
                                </CardHeader>
                                <CardContent>
                                    {renderLoadingCardContent()}
                                </CardContent>
                            </Card>
                        )) :
                        dashboardData.map(card => (
                            <Card key={card.title}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                    {card.icon}
                                </CardHeader>
                                <CardContent>
                                    {renderCardContent(card)}
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
