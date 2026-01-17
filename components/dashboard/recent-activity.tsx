import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface AttendanceRecord {
  _id: string;
  employeeId: string;
  employeeName: string;
  date: Date;
  status: "Present" | "Absent";
}

interface RecentActivityProps {
  records: AttendanceRecord[];
}

export default function RecentActivity({ records }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Recent Attendance Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recent attendance records
          </div>
        ) : (
          <div className="space-y-4">
            {records.slice(0, 5).map((record) => (
              <div
                key={record._id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {record.employeeName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {record.employeeId} • {formatDate(record.date)}
                  </p>
                </div>
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
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}