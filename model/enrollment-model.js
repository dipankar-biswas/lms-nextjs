import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
  enrollment_date: {
    required: true,
    type: Date,
  },
  status: {
    required: true,
    type: String,
  },
  completion_date: {
    required: false,
    type: Date,
  },
  method: {
    required: true,
    type: Number,
  },
  course: {
    type: Schema.ObjectId,
    ref: "Course",
  },
  student: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

// ✅ Use `mongoose.models` to avoid OverwriteModelError
export const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
