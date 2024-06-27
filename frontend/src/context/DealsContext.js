import React, { createContext, useState, useEffect } from 'react';

const DealsContext = createContext();

export const DealsProvider = ({ children }) => {
  const [deals, setDeals] = useState([]);
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('http://localhost:8080/deals');

        if (!response.ok) {
          throw new Error(`Failed to fetch deals: ${response.statusText}`);
        }
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error('Error fetching deals:', error.message);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedCountdowns = {};
      deals.forEach(deal => {
        updatedCountdowns[deal.id] = calculateTimeRemaining(deal.endTime);
      });
      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deals]);

  const calculateTimeRemaining = (endTime) => {
    const endDateTime = new Date(endTime).getTime();
    const now = new Date().getTime();
    let remainingTime = endDateTime - now;

    // Calculate days, hours, minutes, seconds from remaining milliseconds
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <DealsContext.Provider value={{ deals, countdowns }}>
      {children}
    </DealsContext.Provider>
  );
};

export default DealsContext;
