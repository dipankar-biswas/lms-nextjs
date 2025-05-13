import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
  totalCompletedLessons: {
    required: true,
    type: Array,
  },
  totalCompletedModeules: {
    required: true,
    type: Array,
  },
  course: {
    type: Schema.ObjectId,
    ref: "Course",
  },
  student: {
    type: Schema.ObjectId,
    ref: "User",
  },
   quizAssessment: {
    type: Schema.ObjectId,
    ref: "Assessment",
  },
});

// ✅ Use `mongoose.models` to avoid OverwriteModelError
export const Report =
  mongoose.models.Report || mongoose.model("Report", reportSchema);
