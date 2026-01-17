export interface Employee {
  _id?: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Attendance {
  _id?: string;
  employeeId: string;
  date: Date;
  status: "Present" | "Absent";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AttendanceSummary {
  employeeId: string;
  employeeName: string;
  totalPresent: number;
  totalAbsent: number;
  totalDays: number;
}

export interface DashboardStats {
  totalEmployees: number;
  todayPresent: number;
  todayAbsent: number;
  totalAttendanceRecords: number;
}