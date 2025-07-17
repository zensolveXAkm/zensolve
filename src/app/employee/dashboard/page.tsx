
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CalendarCheck, Phone, IndianRupee, ClipboardList, ListTodo, Activity } from "lucide-react";
import Link from "next/link";

const dashboardCards = [
    { title: "Attendance", value: "98.5%", icon: <CalendarCheck className="h-4 w-4 text-muted-foreground" />, description: "Last 30 days", href: "/employee/attendance" },
    { title: "DSR Submitted", value: "21 / 22", icon: <ClipboardList className="h-4 w-4 text-muted-foreground" />, description: "This month", href: "/employee/dsr"},
    { title: "Calls Made", value: "1,204", icon: <Phone className="h-4 w-4 text-muted-foreground" />, description: "This month", href: "/employee/calls"},
    { title: "Earnings", value: "₹45,231", icon: <IndianRupee className="h-4 w-4 text-muted-foreground" />, description: "+15% from last month", href: "/employee/earnings"},
    { title: "Pending Tasks", value: "3", icon: <ListTodo className="h-4 w-4 text-muted-foreground" />, description: "High priority", href: "/employee/pending-work"},
    { title: "Overall Performance", value: "Excellent", icon: <Activity className="h-4 w-4 text-muted-foreground" />, description: "Top 5% performer", href: "#"},
]

export default function EmployeeDashboardPage() {
    return (
        <div className="flex min-h-screen flex-col bg-secondary p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl space-y-8">
                <header>
                <h1 className="text-3xl font-bold">Employee Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here's your performance snapshot.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dashboardCards.map(card => (
                        <Card key={card.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                                {card.icon}
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{card.value}</div>
                                <p className="text-xs text-muted-foreground">{card.description}</p>
                                <Button asChild variant="link" className="px-0 mt-2 text-sm">
                                    <Link href={card.href}>View Details <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Daily Progress</CardTitle>
                            <CardDescription>Submit your Daily Status Report (DSR) here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg">
                                <p className="text-muted-foreground">DSR submission form will be here.</p>
                                <Button className="mt-4">Submit DSR</Button>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>New Tasks from Admin</CardTitle>
                            <CardDescription>Check for new work assigned by the administrator.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg">
                                <p className="text-muted-foreground">New tasks will be listed here.</p>
                                <Button variant="outline" className="mt-4">Refresh</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}

