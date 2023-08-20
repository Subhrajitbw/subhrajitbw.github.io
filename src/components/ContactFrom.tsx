import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';


const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
            rows={4}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
