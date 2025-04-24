import mongoose, { Schema } from "mongoose";

const testimonialSchema = new Schema({
  content: {
    required: true,
    type: String,
  },
  rating: {
    required: true,
    type: Number,
  },
  courseId: {
    type: Schema.ObjectId,
    ref: "Course",
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

// ✅ Use `mongoose.models` to avoid OverwriteModelError
export const Testimonial =
  mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
