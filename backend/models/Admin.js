import mongoose from 'mongoose'; // ✅ Correct
const adminSchema = new mongoose.Schema({
    aname: { type: String, required: true },
    aemail: { type: String, required: true, unique: true },
    apassword: { type: String, required: true },
});
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
