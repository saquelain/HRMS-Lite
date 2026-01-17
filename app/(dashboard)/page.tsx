"use client";

import { useEffect, useState } from "react";
import { Users, CheckCircle2, XCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import StatsCard from "@/components/dashboard/stats-card";
import RecentActivity from "@/components/dashboard/recent-activity";
import QuickActions from "@/components/dashboard/quick-actions";
import { DashboardStats } from "@/types";

interface AttendanceRecord {
  _id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  status: "Present" | "Absent";
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    todayPresent: 0,
    todayAbsent: 0,
    totalAttendanceRecords: 0,
  });
  const [recentActivity, setRecentActivity] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsResponse = await fetch("/api/dashboard");
      const statsData = await statsResponse.json();

      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch recent attendance
      const attendanceResponse = await fetch("/api/attendance");
      const attendanceData = await attendanceResponse.json();

      if (attendanceData.success) {
        setRecentActivity(attendanceData.data);
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of your HR management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          color="blue"
          description="Active employees"
        />
        <StatsCard
          title="Present Today"
          value={stats.todayPresent}
          icon={CheckCircle2}
          color="green"
          description="Marked present"
        />
        <StatsCard
          title="Absent Today"
          value={stats.todayAbsent}
          icon={XCircle}
          color="red"
          description="Marked absent"
        />
        <StatsCard
          title="Total Records"
          value={stats.totalAttendanceRecords}
          icon={Calendar}
          color="purple"
          description="All-time attendance"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activity */}
      <RecentActivity records={recentActivity} />
    </div>
  );
}