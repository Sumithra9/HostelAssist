import React, { forwardRef, useRef } from "react";
import emailjs from "emailjs-com";
import "./ContactUs.css";

const ContactUs = forwardRef((props, ref) => {
  const form = useRef();

  // Function to send email through EmailJS
  const sendEmail = (e) => {
    e.preventDefault();

    // Sending form data to EmailJS
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID, // Replace with your EmailJS service ID
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Replace with your EmailJS template ID
        form.current,
        process.env.REACT_APP_EMAILJS_USER_ID // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log("Message sent successfully:", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log("Failed to send message:", error.text);
          alert("Failed to send message, please try again later.");
        }
      );

    e.target.reset(); // Reset the form fields after submission
  };

  return (
    <div ref={ref} className="contact-us">
      <h2>Contact Us</h2>
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <input type="text" name="user_name" placeholder="Name" required />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="user_email"
            placeholder="Email ID"
            required
          />
        </div>
        <div className="form-group">
          <input type="text" name="subject" placeholder="Subject" required />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            cols="40"
            rows="4"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
});

export default ContactUs;
