import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  selectedPlan: { type: String, required: true },
  mealTypes: [String],
  deliveryDays: [String],
  allergies: String,
  totalPrice: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Subscription || mongoose.model("Subscription", SubscriptionSchema);