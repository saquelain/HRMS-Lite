import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import EmployeeModel from "@/lib/models/employee";
import AttendanceModel from "@/lib/models/attendance";
import { normalizeDate } from "@/lib/utils";

// GET dashboard statistics
export async function GET() {
  try {
    await connectDB();

    // Total employees
    const totalEmployees = await EmployeeModel.countDocuments();

    // Today's date normalized
    const today = normalizeDate(new Date());

    // Today's attendance
    const todayAttendance = await AttendanceModel.find({ date: today });

    const todayPresent = todayAttendance.filter(
      (record) => record.status === "Present"
    ).length;

    const todayAbsent = todayAttendance.filter(
      (record) => record.status === "Absent"
    ).length;

    // Total attendance records
    const totalAttendanceRecords = await AttendanceModel.countDocuments();

    return NextResponse.json({
      success: true,
      data: {
        totalEmployees,
        todayPresent,
        todayAbsent,
        totalAttendanceRecords,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch dashboard stats",
      },
      { status: 500 }
    );
  }
}