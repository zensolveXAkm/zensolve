
"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";

import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, UserCheck, UserX, Send, FileText, Loader2 } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt: Timestamp;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, "employees"), orderBy("createdAt", "desc"));
    const unsubscribeEmployees = onSnapshot(q, (querySnapshot) => {
      const employeesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Employee));
      setEmployees(employeesData);
      if(isLoading) setIsLoading(false);
    }, (error) => {
      console.error("Error fetching employees: ", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to load employees." });
      setIsLoading(false);
    });

    return () => {
        unsubscribeEmployees();
    };
  }, [toast, isLoading]);

  const activeEmployees = employees.filter(e => e.status === 'active').length;

  return (
    <div className="flex min-h-screen flex-col bg-secondary p-4 sm:p-6 lg:p-8 space-y-8">
      <header className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold">Manage Employees</h1>
            <p className="text-muted-foreground">View your employee data. To add or manage employees, please use the Firebase Console.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-2xl font-bold">{employees.length}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-2xl font-bold">{activeEmployees}</div>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inactive Employees</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-2xl font-bold">{employees.length - activeEmployees}</div>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Employee List</CardTitle>
            <CardDescription>View, manage, and assign tasks to your employees.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLoading ? (
                <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-sm text-muted-foreground">{employee.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={employee.status === 'active' ? 'default' : 'destructive'} className="capitalize bg-opacity-20 text-opacity-100">
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="outline" size="sm"><Send className="mr-2 h-4 w-4" /> Send Work</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Work to {employee.name}</DialogTitle>
                            <DialogDescription>
                              Assign a new task or send instructions to this employee.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="task-description">Task Description</Label>
                              <Textarea id="task-description" placeholder="Enter task details here..." className="min-h-[120px]" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Send Task</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                     
                      <Button variant="secondary" size="sm"><FileText className="mr-2 h-4 w-4" /> View Report</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
