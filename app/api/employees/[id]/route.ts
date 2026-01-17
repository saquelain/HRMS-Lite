import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import EmployeeModel from "@/lib/models/employee";
import AttendanceModel from "@/lib/models/attendance";

// DELETE employee by ID
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // Await params in Next.js 15
    const { id } = await context.params;

    const employee = await EmployeeModel.findById(id);

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          error: "Employee not found",
        },
        { status: 404 }
      );
    }

    // Delete all attendance records for this employee
    await AttendanceModel.deleteMany({ employeeId: employee.employeeId });

    // Delete employee
    await EmployeeModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Employee and related attendance records deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete employee",
      },
      { status: 500 }
    );
  }
}