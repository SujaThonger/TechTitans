import React from 'react';
import './cta.css';

const CTA = () => {
   const handleRedirect = () => {
    window.location.href = '/Multi_signIN/hh.html'; // Redirects to hh.html inside the public folder
  };

  return (
    <div className="gpt3__cta">
      <div className="gpt3__cta-content">
        <h3>Register Today & start exploring the endless possibilities.</h3>
      </div>
    </div>
  );
};

export default CTA;
