
// /src/SHome.jsx

import React, { useRef } from 'react';
import './SHome.css';
import SFaq from '../../Components/SFaq/SFaq';
import ContactUs from '../../Components/ContactUs/ContactUs';
import SHeader from '../../Components/SHeader/SHeader';
import About from '../../Components/About/About';
import SNavBar from '../../Components/SNavBar/SNavBar'; 
import SFooter from '../../Components/SFooter/SFooter';

const SHome = () => {
  const aboutRef = useRef(null);
  const contactusRef = useRef(null);
  const faqRef = useRef(null);
   const headerRef = useRef(null);
  

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <SNavBar scrollToRef={scrollToRef} refs={{
         about: aboutRef,
        contact: contactusRef,
        faq: faqRef,
         header: headerRef,
        
      }} />
      <SHeader ref={headerRef} /> 
      <div ref={faqRef}><SFaq /></div>
      <div ref={aboutRef}><About /></div>
      <div ref={contactusRef}><ContactUs /></div>
      <SFooter/> 
    </div>
  );
};

export default SHome;

