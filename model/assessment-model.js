import mongoose, { Schema } from "mongoose";

const assessmentSchema = new Schema({
  assessments: {
    required: true,
    type: Array,
  },
  otherMarks: {
    required: true,
    type: Number,
  },
});

// ✅ Use `mongoose.models` to avoid OverwriteModelError
export const Assessment =
  mongoose.models.Assessment || mongoose.model("Assessment", assessmentSchema);
