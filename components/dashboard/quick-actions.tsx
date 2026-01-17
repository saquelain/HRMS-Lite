"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserPlus, Calendar, Users } from "lucide-react";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Add Employee",
      description: "Create a new employee record",
      icon: UserPlus,
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: () => router.push("/employees"),
    },
    {
      title: "Mark Attendance",
      description: "Record employee attendance",
      icon: Calendar,
      color: "bg-green-500 hover:bg-green-600",
      onClick: () => router.push("/attendance"),
    },
    {
      title: "View Employees",
      description: "Manage employee records",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600",
      onClick: () => router.push("/employees"),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.title}
                onClick={action.onClick}
                className={`h-auto flex-col items-start p-4 ${action.color} text-white`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span className="font-semibold text-base">{action.title}</span>
                <span className="text-sm opacity-90 font-normal mt-1">
                  {action.description}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}