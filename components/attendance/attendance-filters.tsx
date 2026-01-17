"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Employee } from "@/types";

interface AttendanceFiltersProps {
  employees: Employee[];
  filters: {
    employeeId: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (filters: {
    employeeId: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export default function AttendanceFilters({
  employees,
  filters,
  onFilterChange,
}: AttendanceFiltersProps) {
  const handleReset = () => {
    onFilterChange({
      employeeId: "",
      startDate: "",
      endDate: "",
    });
  };

  const hasActiveFilters =
    filters.employeeId || filters.startDate || filters.endDate;

  return (
    <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Employee Filter */}
        <div className="space-y-2">
          <Label htmlFor="filter-employee">Employee</Label>
          <Select
            value={filters.employeeId || "all"}
            onValueChange={(value) =>
              onFilterChange({ ...filters, employeeId: value === "all" ? "" : value })
            }
          >
            <SelectTrigger id="filter-employee">
              <SelectValue placeholder="All employees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All employees</SelectItem>
              {employees.map((emp) => (
                <SelectItem key={emp._id} value={emp.employeeId}>
                  {emp.employeeId} - {emp.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="filter-start-date">Start Date</Label>
          <Input
            id="filter-start-date"
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              onFilterChange({ ...filters, startDate: e.target.value })
            }
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="filter-end-date">End Date</Label>
          <Input
            id="filter-end-date"
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              onFilterChange({ ...filters, endDate: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}