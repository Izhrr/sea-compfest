import mongoose from "mongoose";
const ReviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  reviewMessage: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);