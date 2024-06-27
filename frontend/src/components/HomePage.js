import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DealList from './DealList';
import '../css/HomePage.css'; // Import the CSS file for styling

const HomePage = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/deals')
      .then(response => setDeals(response.data))
      .catch(error => console.error('Error fetching deals:', error));
  }, []);

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>Welcome to ShopNest!</h2>
        <h3>Where shopping online is made simple and easy</h3>
      </div>
      <div className="deals-section">
        <h4>Limited Time Deals</h4>
        <div className="deals-container">
          <DealList deals={deals} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;




