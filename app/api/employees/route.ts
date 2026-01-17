import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import EmployeeModel from "@/lib/models/employee";

// GET all employees
export async function GET() {
  try {
    await connectDB();
    const employees = await EmployeeModel.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      data: employees,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch employees",
      },
      { status: 500 }
    );
  }
}

// POST create new employee
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const { employeeId, fullName, email, department } = body;

    // Validation
    if (!employeeId || !fullName || !email || !department) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Check if employee already exists
    const existingEmployee = await EmployeeModel.findOne({
      $or: [{ employeeId }, { email }],
    });

    if (existingEmployee) {
      const field = existingEmployee.employeeId === employeeId ? "Employee ID" : "Email";
      return NextResponse.json(
        {
          success: false,
          error: `${field} already exists`,
        },
        { status: 409 }
      );
    }

    const employee = await EmployeeModel.create({
      employeeId,
      fullName,
      email,
      department,
    });

    return NextResponse.json(
      {
        success: true,
        data: employee,
        message: "Employee created successfully",
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
        error: "Failed to create employee",
      },
      { status: 500 }
    );
  }
}