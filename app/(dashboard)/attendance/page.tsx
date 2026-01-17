"use client";

import { useEffect, useState } from "react";
import { Employee } from "@/types";
import { toast } from "sonner";
import AttendanceForm from "@/components/attendance/attendance-form";
import AttendanceFilters from "@/components/attendance/attendance-filters";
import AttendanceTable from "@/components/attendance/attendance-table";
import AttendanceSummaryCard from "@/components/attendance/attendance-summary";

interface AttendanceRecord {
  _id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  status: "Present" | "Absent";
}

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [filters]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();
      if (data.success) {
        setEmployees(data.data);
      }
    } catch (error) {
      toast.error("Failed to load employees");
    }
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.employeeId) params.append("employeeId", filters.employeeId);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const response = await fetch(`/api/attendance?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setRecords(data.data);
      } else {
        toast.error("Failed to load attendance records");
      }
    } catch (error) {
      toast.error("An error occurred while loading attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Attendance</h1>
        <p className="text-gray-600 mt-1">
          Mark and track employee attendance records
        </p>
      </div>

      {/* Mark Attendance Form */}
      <AttendanceForm onSuccess={fetchAttendance} />

      {/* Attendance Summary */}
      <AttendanceSummaryCard employees={employees} />

      {/* Filters */}
      <AttendanceFilters
        employees={employees}
        filters={filters}
        onFilterChange={setFilters}
      />

      {/* Records Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            Loading records...
          </div>
        ) : (
          <AttendanceTable records={records} />
        )}
      </div>
    </div>
  );
}