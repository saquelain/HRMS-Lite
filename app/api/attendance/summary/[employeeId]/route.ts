import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AttendanceModel from "@/lib/models/attendance";
import EmployeeModel from "@/lib/models/employee";

// GET attendance summary for a specific employee
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ employeeId: string }> }
) {
  try {
    await connectDB();
    
    // Await params in Next.js 15
    const { employeeId } = await context.params;

    // Check if employee exists
    const employee = await EmployeeModel.findOne({ employeeId });
    
    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          error: "Employee not found",
        },
        { status: 404 }
      );
    }

    // Get all attendance records for this employee
    const attendanceRecords = await AttendanceModel.find({ 
      employeeId: employeeId 
    });

    const totalPresent = attendanceRecords.filter(
      (record) => record.status === "Present"
    ).length;

    const totalAbsent = attendanceRecords.filter(
      (record) => record.status === "Absent"
    ).length;

    const summaryData = {
      employeeId,
      employeeName: employee.fullName,
      totalPresent,
      totalAbsent,
      totalDays: totalPresent + totalAbsent,
    };

    return NextResponse.json({
      success: true,
      data: summaryData,
    });
  } catch (error: any) {
    console.error("Summary API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch attendance summary",
      },
      { status: 500 }
    );
  }
}