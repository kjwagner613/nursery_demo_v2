import React from 'react';

const Contact = () => {
  return (
    <div>
      <h1
        style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-titles)' }}
        className="my-8"
      >
        Contact Us
      </h1>
      <div className="contact-container flex gap-20 justify-center self-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4">
        <div className="contactInfo flex flex-col items-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4 leading-snug text-s">
          <p className="columnTitles font-Playfair text-2xl">Tuleleke Nursery</p>
          <p>Front Desk: 555-555-5555</p>
          <p>Scheduling: 555-555-5555</p>
          <p>Delivery: 555-555-5555</p>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        </div>
        <div className="contactInfo flex flex-col items-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4 text-s">
          <p className="columnTitles font-Playfair text-2xl">Macdoel</p>
          <p>Front Desk: 555-555-5555</p>
          <p>Scheduling: 555-555-5555</p>
          <p>Delivery: 555-555-5555</p>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        </div>
        <div className="contactInfo flex flex-col items-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4 text-s">
          <p className="columnTitles font-Playfair text-2xl">Susanville</p>
          <p>Front Desk: 555-555-5555</p>
          <p>Scheduling: 555-555-5555</p>
          <p>Delivery: 555-555-5555</p>
          <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
