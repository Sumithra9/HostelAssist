import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hostelBlock: { type: String, required: true },
  roomNo: { type: String, required: true },
  complaintCategory: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
  complaintDescription: { type: String, required: true },
  availableDate: { type: String, required: true },
  availableTime: { type: String, required: true },
  file: { type: String }, // Store file path or URL
});

export default mongoose.model("Complaint", ComplaintSchema);
