import nodemailer from "nodemailer";

const otpStore = new Map(); // Temporary storage for OTPs

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOTP = async (email) => {
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes validity
    otpStore.set(email, { otp, expiresAt });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code for Hostel Complaint",
        text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { success: true, message: "OTP sent successfully!" };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, message: "Failed to send OTP." };
    }
};

export const verifyOTP = (email, enteredOtp) => {
    const storedOtp = otpStore.get(email);
    if (!storedOtp) return { success: false, message: "OTP not found or expired." };

    if (storedOtp.expiresAt < Date.now()) {
        otpStore.delete(email);
        return { success: false, message: "OTP expired." };
    }

    if (storedOtp.otp !== enteredOtp) {
        return { success: false, message: "Invalid OTP." };
    }

    otpStore.delete(email);
    return { success: true, message: "OTP verified!" };
};
