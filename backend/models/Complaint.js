import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hostelBlock: { type: String, required: true },
    roomNo: { type: String, required: true },
    email: { type: String, required: true },
    complaintCategory: { type: String, required: true },
    postedDate: { type: Date, default: Date.now },
    complaintDescription: { type: String, required: true },
    availableDate: { type: String, required: true },
    availableTime: { type: String, required: true },
    filePath: { type: String }, // This will store the file path (if uploaded)
    status: { type: String, default: "Pending" }, // ✅ Default status as "Pending"
  otp: String, // ✅ Temporary storage for OTP (can use Redis for better security)
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);

export default Complaint; // ✅ Use 'export default' for ES modules
