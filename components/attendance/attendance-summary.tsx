"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employee, AttendanceSummary } from "@/types";
import { CheckCircle2, XCircle, Calendar } from "lucide-react";

interface AttendanceSummaryProps {
  employees: Employee[];
}

export default function AttendanceSummaryCard({
  employees,
}: AttendanceSummaryProps) {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedEmployeeId) {
      fetchSummary(selectedEmployeeId);
    } else {
      setSummary(null);
    }
  }, [selectedEmployeeId]);

  const fetchSummary = async (employeeId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/attendance/summary/${employeeId}`);
      const data = await response.json();

      if (data.success) {
        setSummary(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Select
            value={selectedEmployeeId}
            onValueChange={setSelectedEmployeeId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select employee to view summary" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((emp) => (
                <SelectItem key={emp._id} value={emp.employeeId}>
                  {emp.employeeId} - {emp.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading && (
          <div className="text-center py-8 text-gray-500">
            Loading summary...
          </div>
        )}

        {!loading && summary && (
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle2 className="w-8 h-8 text-green-600 mb-2" />
              <p className="text-2xl font-bold text-green-900">
                {summary.totalPresent}
              </p>
              <p className="text-sm text-green-700">Present</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg border border-red-200">
              <XCircle className="w-8 h-8 text-red-600 mb-2" />
              <p className="text-2xl font-bold text-red-900">
                {summary.totalAbsent}
              </p>
              <p className="text-sm text-red-700">Absent</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Calendar className="w-8 h-8 text-blue-600 mb-2" />
              <p className="text-2xl font-bold text-blue-900">
                {summary.totalDays}
              </p>
              <p className="text-sm text-blue-700">Total Days</p>
            </div>
          </div>
        )}

        {!loading && !summary && selectedEmployeeId && (
          <div className="text-center py-8 text-gray-500">
            No attendance records found for this employee
          </div>
        )}
      </CardContent>
    </Card>
  );
}