import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import AttendanceModel from "@/lib/models/attendance";
import EmployeeModel from "@/lib/models/employee";
import { normalizeDate } from "@/lib/utils";

// GET attendance records with optional filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const employeeId = searchParams.get("employeeId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // Build query
    const query: any = {};

    if (employeeId) {
      query.employeeId = employeeId;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = normalizeDate(startDate);
      }
      if (endDate) {
        query.date.$lte = normalizeDate(endDate);
      }
    }

    const attendanceRecords = await AttendanceModel.find(query).sort({ date: -1 });

    // Populate employee names
    const recordsWithNames = await Promise.all(
      attendanceRecords.map(async (record) => {
        const employee = await EmployeeModel.findOne({ employeeId: record.employeeId });
        return {
          _id: record._id,
          employeeId: record.employeeId,
          employeeName: employee?.fullName || "Unknown",
          date: record.date,
          status: record.status,
          createdAt: record.createdAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: recordsWithNames,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch attendance records",
      },
      { status: 500 }
    );
  }
}

// POST mark attendance
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { employeeId, date, status } = body;

    // Validation
    if (!employeeId || !date || !status) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

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

    // Validate status
    if (status !== "Present" && status !== "Absent") {
      return NextResponse.json(
        {
          success: false,
          error: "Status must be either Present or Absent",
        },
        { status: 400 }
      );
    }

    // Validate date (not future date)
    const attendanceDate = normalizeDate(date);
    const today = normalizeDate(new Date());
    
    if (attendanceDate > today) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot mark attendance for future dates",
        },
        { status: 400 }
      );
    }

    // Check if attendance already exists for this date
    const existingAttendance = await AttendanceModel.findOne({
      employeeId,
      date: attendanceDate,
    });

    if (existingAttendance) {
      return NextResponse.json(
        {
          success: false,
          error: "Attendance already marked for this date",
        },
        { status: 409 }
      );
    }

    const attendance = await AttendanceModel.create({
      employeeId,
      date: attendanceDate,
      status,
    });

    return NextResponse.json(
      {
        success: true,
        data: attendance,
        message: "Attendance marked successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        {
          success: false,
          error: messages[0],
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to mark attendance",
      },
      { status: 500 }
    );
  }
}