import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DealList from './DealList.tsx';
import '../css/HomePage.css';

// Define the type for a deal
interface Deal {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    axios.get<Deal[]>('http://localhost:8080/deals')
      .then(response => setDeals(response.data))
      .catch(error => console.error('Error fetching deals:', error));
  }, []);

  return (
    <div className="home-page">
      <div className="welcome-section">
        <h2>Welcome to ShopNest!</h2>
        <h4>Where shopping online is made simple and easy</h4>
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
