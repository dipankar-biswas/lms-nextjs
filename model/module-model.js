import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  active: {
    required: true,
    default: false,
    type: Boolean,
  },
  slug: {
    required: true,
    type: String,
  },
  course: {
    required: true,
    type: Schema.ObjectId,
  },
  lessonIds: [{ type: Schema.ObjectId, ref: "Lesson" }],
  duration: {
    type: Number,
    default: 0,
  },
  order: {
    required: true,
    type: Number,
  }
});

// ✅ Correct way to prevent OverwriteModelError
export const Module =
  mongoose.models.Module || mongoose.model("Module", moduleSchema);
  
