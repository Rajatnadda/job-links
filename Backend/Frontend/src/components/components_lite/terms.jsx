import React from 'react'
import Footer from './Footer'
import LoginNavbar from './LoginNavbar'

const Terms = () => {
  return (
    <div>
      <LoginNavbar/>
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1>Terms and Conditions</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <p>Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the [Your Job Portal Name] website (the "Service") operated by [Your Company Name] ("us", "we", or "our").</p>

      <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.</p>

      <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>

      <h2>1. Accounts</h2>
      <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
      <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
      <p>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

      <h2>2. Job Postings and Applications</h2>
      <p>If you are an employer, you are solely responsible for the content of your job postings. Postings must be for legitimate job opportunities and must not contain misleading, discriminatory, or illegal content.</p>
      <p>If you are a job seeker, you acknowledge that we do not guarantee employment. We are a platform to connect job seekers with potential employers. The accuracy of job listings is the responsibility of the employer posting them.</p>

      <h2>3. Intellectual Property</h2>
      <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of [Your Company Name] and its licensors. The Service is protected by copyright, trademark, and other laws of both [Your Country] and foreign countries.</p>
      <p>Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of [Your Company Name].</p>

      <h2>4. Links To Other Web Sites</h2>
      <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by [Your Company Name].</p>
      <p>[Your Company Name] has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that [Your Company Name] shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
      <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>

      <h2>5. Termination</h2>
      <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
      <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
      <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.</p>

      <h2>6. Limitation Of Liability</h2>
      <p>In no event shall [Your Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

      <h2>7. Disclaimer</h2>
      <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
      <p>[Your Company Name] its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.</p>

      <h2>8. Governing Law</h2>
      <p>These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.</p>
      <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>

      <h2>9. Changes</h2>
      <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
      <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>

      <h2>10. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us:</p>
      <ul>
        <li>By email: [Rajateranadda@gmail.com]</li>
        <li>By visiting this page on our website: [JobLinks.com]</li>
        <li>By phone number: [+91 8988142044]</li>
      </ul>

      <style jsx>{`
        h1 {
          color: #333;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
        }
        h2 {
          color: #555;
          margin-top: 30px;
          margin-bottom: 10px;
        }
        p {
          color: #666;
          margin-bottom: 15px;
        }
        ul {
          list-style-type: disc;
          margin-left: 20px;
        }
        li {
          margin-bottom: 5px;
        }
        // You can add more specific styles here if needed
      `}</style>
    </div>
      <Footer/>
    </div>
  )
}

export default Terms
