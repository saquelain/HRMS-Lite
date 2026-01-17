import mongoose, { Schema, Model } from "mongoose";
import { Employee } from "@/types";

const employeeSchema = new Schema<Employee>(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      minlength: [2, "Department must be at least 2 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
employeeSchema.index({ employeeId: 1 });
employeeSchema.index({ email: 1 });

const EmployeeModel: Model<Employee> =
  mongoose.models.Employee || mongoose.model<Employee>("Employee", employeeSchema);

export default EmployeeModel;