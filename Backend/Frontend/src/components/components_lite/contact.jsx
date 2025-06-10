import React, { useState } from "react";
import Footer from "./Footer";
import LoginNavbar from "./LoginNavbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div>
      <LoginNavbar/>
    <div className="px-4 py-12 max-w-5xl mx-auto font-sans">

      <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
      <p className="text-gray-600 mt-2">
        We'd love to hear from you! Fill out the form below or reach us via contact info.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Form Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: "name", label: "Full Name", type: "text" },
              { id: "email", label: "Email Address", type: "email" },
              { id: "subject", label: "Subject", type: "text" },
            ].map(({ id, label, type }) => (
              <div key={id}>
                <label htmlFor={id} className="block mb-1 font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            ))}

            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 rounded-md font-semibold hover:bg-violet-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Our Contact Information</h2>
          <p>
            <strong>Name:</strong> Rajat Nadda
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:Rjt.345@gmail.com" className="text-violet-600 hover:underline">
              Rjt.345@gmail.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+918219652044" className="text-violet-600 hover:underline">
              +91 8219652044
            </a>
          </p>
          <p>
            <strong>Address:</strong>
            <br />
            Bilaspur, Jhandutta<br />
            Himachal Pradesh, 174034<br />
            India
          </p>
        </div>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default Contact;
