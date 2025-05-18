import React, { useState } from "react";

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
    // Handle form submission logic here
    // For example, send data to a backend API or an email service
    console.log("Form data submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Please fill out the form below or reach out
        to us using the contact details provided.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <div style={{ flex: 1, minWidth: "300px", marginRight: "20px" }}>
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="email"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="subject"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="message"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        <div style={{ flex: 1, minWidth: "300px", marginTop: "30px" }}>
          <h2>Our Contact Information</h2>
          <p>
            <strong>[Your Company Name / Job Portal Name]</strong>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:[yourcontactemail@example.com]">
              [yourcontactemail@example.com]
            </a>
          </p>
          <p>
            <strong>Phone:</strong> [Your Phone Number] (e.g., +1 234 567 8900)
          </p>
          <p>
            <strong>Address:</strong>
            <br />
            [Your Street Address]
            <br />
            [Your City, State, Zip Code]
            <br />
            [Your Country]
          </p>
          {/* You can add a map embed here if you like */}
          {/* 
          <h3>Our Location</h3>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..." 
            width="100%" 
            height="300" 
            style={{ border:0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
          */}
        </div>
      </div>

      <style jsx>{`
        h1,
        h2 {
          color: #333;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Contact;
