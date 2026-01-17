import mongoose, { Schema, Model } from "mongoose";
import { Attendance } from "@/types";

const attendanceSchema = new Schema<Attendance>(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: ["Present", "Absent"],
        message: "Status must be either Present or Absent",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create compound unique index to prevent duplicate attendance on same date
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const AttendanceModel: Model<Attendance> =
  mongoose.models.Attendance ||
  mongoose.model<Attendance>("Attendance", attendanceSchema);

export default AttendanceModel;