import React, { forwardRef, useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";

const ContactUs = forwardRef((props, ref) => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    if (!import.meta.env.VITE_EMAILJS_USER_ID) {
      alert("EmailJS Public Key (User ID) is missing. Check .env.local");
      return;
    }

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          console.log("✅ Message sent successfully:", result.text);
          setStatusMessage("Message sent successfully! ✅");
          form.current.reset();
        },
        (error) => {
          console.error("❌ Failed to send message:", error.text);
          setStatusMessage("Failed to send message. Please try again later. ❌");
        }
      );
  };

  return (
    <div ref={ref} className="contact-us">
      <h2>Contact Us</h2>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <input type="text" name="user_name" placeholder="Name" required />
        </div>
        <div className="form-group">
          <input type="email" name="user_email" placeholder="Email ID" required />
        </div>
        <div className="form-group">
          <input type="text" name="subject" placeholder="Subject" required />
        </div>
        <div className="form-group">
          <textarea name="message" cols="40" rows="4" placeholder="Enter your message" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
});

export default ContactUs;
