import React from 'react'

const About = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', maxWidth: '900px', margin: '40px auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5em', color: '#333' }}>
          About <span style={{ color: '#6A38C2' }}>Job</span><span style={{ color: '#d11342' }}>Links</span>
        </h1>
        <p style={{ fontSize: '1.1em', color: '#555' }}>Connecting Talent with Opportunity</p>
      </header>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8em', color: '#6A38C2', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
          Our Mission
        </h2>
        <p style={{ color: '#666' }}>
          At JobLinks, our mission is to bridge the gap between talented professionals and innovative companies. We strive to create a seamless and efficient platform where job seekers can discover their dream careers and employers can find the perfect candidates to drive their success. We believe that the right job can transform a person's life, and the right employee can transform a business.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8em', color: '#6A38C2', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
          Who We Are
        </h2>
        <p style={{ color: '#666' }}>
          JobLinks was founded by a team of passionate individuals who experienced firsthand the challenges of job hunting and recruitment. We envisioned a more intuitive, user-friendly, and effective job portal that caters to the diverse needs of the modern workforce and employers. Our team combines expertise in technology, human resources, and user experience to deliver a platform that truly makes a difference.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8em', color: '#6A38C2', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
          What We Offer
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: 1, minWidth: '300px', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.4em', color: '#d11342', marginBottom: '10px' }}>For Job Seekers</h3>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', color: '#666' }}>
              <li>Access to a wide range of job opportunities across various industries.</li>
              <li>Easy-to-use search and filtering tools to find relevant positions.</li>
              <li>Personalized job alerts and recommendations.</li>
              <li>Resources and tips for career development and job applications.</li>
              <li>A simple and quick application process.</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: '300px', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.4em', color: '#d11342', marginBottom: '10px' }}>For Employers</h3>
            <ul style={{ listStyle: 'disc', marginLeft: '20px', color: '#666' }}>
              <li>A platform to reach a vast pool of qualified candidates.</li>
              <li>Tools to post job openings quickly and manage applications efficiently.</li>
              <li>Advanced search capabilities to find the right talent.</li>
              <li>Branding opportunities to showcase your company culture.</li>
              <li>Cost-effective recruitment solutions.</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8em', color: '#6A38C2', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
          Our Values
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px', color: '#666' }}><strong>Integrity:</strong> We operate with transparency and honesty in all our interactions.</li>
          <li style={{ marginBottom: '10px', color: '#666' }}><strong>Innovation:</strong> We continuously seek to improve our platform and services.</li>
          <li style={{ marginBottom: '10px', color: '#666' }}><strong>User-Centricity:</strong> We prioritize the needs and experiences of our users.</li>
          <li style={{ marginBottom: '10px', color: '#666' }}><strong>Collaboration:</strong> We believe in the power of connecting people and businesses.</li>
          <li style={{ marginBottom: '10px', color: '#666' }}><strong>Empowerment:</strong> We aim to empower individuals and organizations to achieve their goals.</li>
        </ul>
      </section>

      <section style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <h2 style={{ fontSize: '1.8em', color: '#6A38C2', marginBottom: '15px' }}>
          Join Us on Our Journey
        </h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Whether you are looking for your next career move or searching for the perfect candidate, JobLinks is here to help.
          Join our growing community today and let us be a part of your success story.
        </p>
        {/* You can add a Link component here if you use react-router-dom */}
        {/* <Link to="/register" style={{ padding: '10px 20px', backgroundColor: '#d11342', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '1.1em' }}>
          Get Started
        </Link> */}
      </section>

      {/* Optional: Placeholder for a team section if you want to add it later */}
      {/*
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.8em', color: '#6A38C2', borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '15px', textAlign: 'center' }}>
          Meet the Team
        </h2>
        <p style={{ color: '#666', textAlign: 'center' }}>
          [Information about your team members can go here. You could use cards or a grid layout.]
        </p>
      </section>
      */}

      <style jsx>{`
        /* You can add component-specific global styles here if needed */
      `}</style>
    </div>
  )
}

export default About
