// /src/Components/Faq/Faq.js

import React, { forwardRef, useState } from 'react';
import './SFaq.css'; // Import the CSS file for styling

const SFaq = forwardRef((props, ref) => {
  // State to track the index of the active (open) FAQ
  const [activeIndex, setActiveIndex] = useState(null);

  // Updated FAQ data for speech-language therapy
  const faqData = [
    {
      question: 'How do I file a complaint in the hostel?',
      answer: 'To file a complaint, simply log in to your account and navigate to the "File Complaint" section. Select the complaint category, provide details, and submit it. The relevant admin will review your complaint and work on resolving it.',
    },
    {
      question: 'What types of complaints can I file?',
      answer: 'You can file complaints related to various issues such as electricity, water supply, carpentary, housekeeping, maintenance, ACs, or any other facility-related problems. Simply choose the category that best describes your issue when submitting the complaint.',
    },
    {
      question: 'Can I track the status of my complaint?',
      answer: 'Yes, you can easily track the status of your complaint. Go to the "Complaint History" section in your dashboard, where you can view the status of your active complaints and any resolutions provided by the admin.',
    },
    {
      question: 'Is there a way to provide feedback after a complaint is resolved?',
      answer: 'Yes, after your complaint is resolved, you will receive a prompt to provide feedback on the resolution process. Your feedback helps us improve our services and ensure issues are handled efficiently.',
    },
    {
      question: 'Can I cancel or modify a complaint after submitting it?',
      answer: 'Yes, it can be canceled and you can file a new complaint if you need to change any details or add new information',
    },
  ];

  // Function to handle click on a question
  const handleClick = (index) => {
    // Toggle the current FAQ item
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div ref={ref} className="faq">
      <h2>Frequently Asked Questions</h2>
      <ul className="questions">
        {faqData.map((item, index) => (
          <li key={index}>
            <div
              className="faq-question"
              onClick={() => handleClick(index)}
            >
              <label>{item.question}</label>
              <span className="faq-icon">
                {activeIndex === index ? '×' : '+'}
              </span>
            </div>
            <div
              className={`answer ${activeIndex === index ? 'open' : ''}`}
            >
              <p>{item.answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SFaq;
