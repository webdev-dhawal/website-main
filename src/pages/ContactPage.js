import './ContactPage.css';
import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwfv_aMBWfrhm89Ddjm3B_AwT9pWFcED7RIh4fBDEU7-n3mhHk4bX6m8mGKlUl7Q69F/exec',
        {
          method: 'POST',
          body: new URLSearchParams(formData),
        }
      );

      const result = await response.json();
      if (result.status === 'success') {
        setStatus('Thank you for contacting us!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email Address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
        </div>
        <button type="submit" className="submit-button">Send Message</button>
      </form>
      <p className="status-message">{status}</p>
    </div>
  );
}

export default ContactPage;
