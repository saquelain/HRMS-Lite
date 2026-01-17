"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Employee } from "@/types";
import EmployeeForm from "@/components/employees/employee-form";
import EmployeeTable from "@/components/employees/employee-table";
import { toast } from "sonner";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();

      if (data.success) {
        setEmployees(data.data);
      } else {
        toast.error("Failed to load employees");
      }
    } catch (error) {
      toast.error("An error occurred while loading employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading employees...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">
            Manage your organization's employee records
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Employee Table */}
      <EmployeeTable employees={employees} onDelete={fetchEmployees} />

      {/* Add Employee Form */}
      <EmployeeForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={fetchEmployees}
      />
    </div>
  );
}