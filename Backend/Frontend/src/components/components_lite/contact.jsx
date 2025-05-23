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
            <strong>[Rajat Nadda]</strong>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="Rajateranadda@gmail.com">
              [Rjt.345@gmail.com]
            </a>
          </p>
          <p>
            <strong>Phone:</strong> [+91 8219652044]
          </p>
          <p>
            <strong>Address:</strong>
            <br />
            [Bilaspur]
            <br />
            [Jhandutta, Himachal Pradesh, 174034]
            <br />
            [India]
          </p>
          
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
