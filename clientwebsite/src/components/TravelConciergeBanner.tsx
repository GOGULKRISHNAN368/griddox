import React from 'react';
import './TravelConciergeBanner.css';

const TravelConciergeBanner: React.FC = () => {
  return (
    <section className="travel-banner-section">
      <div className="travel-banner-overlay">
        <div className="travel-banner-content">
          <div className="travel-banner-left">
            <h2>TRAVEL CONCIERGE</h2>
          </div>
          <div className="travel-banner-center">
            <h3>NOW LIVE</h3>
          </div>
          <div className="travel-banner-right">
            <p className="appointment-text">BOOK AN APPOINTMENT WITH OUR IN-STORE STYLISTS</p>
            <p className="call-text">CALL +91 7428144338</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelConciergeBanner;
