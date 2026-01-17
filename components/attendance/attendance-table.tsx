"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface AttendanceRecord {
  _id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  status: "Present" | "Absent";
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export default function AttendanceTable({ records }: AttendanceTableProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee ID</TableHead>
            <TableHead>Employee Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                No attendance records found
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record._id}>
                <TableCell className="font-medium">
                  {record.employeeId}
                </TableCell>
                <TableCell>{record.employeeName}</TableCell>
                <TableCell>{formatDate(record.date)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      record.status === "Present" ? "default" : "destructive"
                    }
                    className={
                      record.status === "Present"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}