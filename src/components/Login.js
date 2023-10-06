import React, { useState } from 'react';
import {sendSignInLinkToEmail } from 'firebase/auth';
import {auth} from './auth'

const EmailSignIn = () => {
  const [email, setEmail] = useState('');
  const handleEmailSignIn = async () => {
    try {
      // Send a sign-in link to the user's email
      await sendSignInLinkToEmail(auth, email, {
        url: 'http://localhost:3000/', // The URL where the user will be redirected after clicking the link
        handleCodeInApp: true, // This allows the app to handle the sign-in code
      });

      // Inform the user that the sign-in link has been sent
      alert('Sign-in link sent to your email. Please check your inbox.');
    } catch (error) {
      console.error('Error sending sign-in link:', error);
    }
  };

  return (
    <div>
      <h2>Email Sign-In</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleEmailSignIn}>Send Sign-In Link</button>
    </div>
  );
};

export default EmailSignIn;
