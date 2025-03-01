# 🏨 **HostelAssist** - A Smart Hostel Complaint Management System  

HostelAssist is a **web-based complaint management system** designed to help hostel residents report issues efficiently while enabling hostel administrators to track and resolve complaints in an organized manner. The platform enhances communication between students and hostel authorities, ensuring quick resolutions to hostel-related problems.

---

## 🚀 **Project Overview**
Managing complaints in a hostel environment can be challenging due to **delayed responses, lack of tracking, and unstructured handling of issues**. HostelAssist solves this problem by providing a **centralized and efficient complaint management system**, allowing:
- **Students** to submit complaints under various categories.
- **Admins** to verify complaints via **OTP authentication**, track pending issues, and mark them as resolved.
- **Real-time complaint status updates**, ensuring transparency in the resolution process.

With a **user-friendly interface**, students can quickly raise concerns while admins can manage and resolve them effectively.

---

## 🎯 **Key Features**

### 🏠 **Student Features**
✅ **Secure Login & Signup**: Students can register and log in securely.  
✅ **Complaint Submission**: Lodge complaints under categories like **plumbing, electrical, housekeeping, mess, etc.**  
✅ **Status Tracking**: Monitor the progress of complaints (Pending, In Progress, Resolved).  
✅ **OTP-Based Verification**: Ensure valid complaint submissions via OTP authentication.  

### 🛠 **Admin Features**
✅ **Admin Authentication**: Secure login for admins.  
✅ **Complaint Management**: View, track, and resolve complaints.  
✅ **OTP Verification for Complaints**: Admins ask students for OTP to verify complaints before taking action.  
✅ **Status Updates**: Mark complaints as pending, in progress, or resolved.  

### 🔒 **Security Features**
🔹 **Password Hashing**: Uses `bcrypt.js` to encrypt passwords.  
🔹 **Session Management**: Secure authentication for users and admins.  
🔹 **Email-Based OTP**: Verifies complaint submissions via **nodemailer**.

---

## 🏗 **Technology Stack**
HostelAssist is built using the **MERN Stack** for a **scalable, secure, and responsive** experience.

### 🌐 **Frontend** - React.js (Vite)
- **React.js**: Component-based UI.
- **Vite**: Fast build tool for React.
- **CSS**: Styled for a modern and clean UI.
- **React Hooks**: Manages state efficiently.

### 🔙 **Backend** - Node.js & Express.js
- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Handles API routing and authentication.
- **bcrypt.js**: Hashes passwords securely.
- **nodemailer**: Sends OTP emails for verification.

### 🛢 **Database** - MongoDB
- **MongoDB**: NoSQL database to store complaints, users, and admin data.
- **Mongoose**: ODM (Object-Document Mapping) for MongoDB schema management.

### 📩 **Email Service**
- **Nodemailer**: Sends OTPs for complaint verification.

### ⚙ **Other Tools**
- **Postman**: API testing.
- **Git & GitHub**: Version control.

---

## 📜 **Why HostelAssist?**
🔹 **Eliminates manual complaint tracking** – everything is digital!  
🔹 **Real-time complaint status updates** – No confusion on complaint progress.  
🔹 **Secure authentication** – Only valid users can log in and submit complaints.  
🔹 **Easy-to-use admin panel** – Hostel authorities can manage issues efficiently.  

---
