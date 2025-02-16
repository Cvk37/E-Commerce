import React from 'react';

// Define the Deal type (same as in HomePage.tsx)
interface Deal {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Define props for DealList
interface DealListProps {
  deals: Deal[];
}

const DealList: React.FC<DealListProps> = ({ deals }) => {
  return (
    <div>
      {deals.map((deal) => (
        <div key={deal.id}>
          <h3>{deal.title}</h3>
          <p>{deal.description}</p>
          <p>Price: ${deal.price}</p>
          <img src={deal.imageUrl} alt={deal.title} />
        </div>
      ))}
    </div>
  );
};

export default DealList;
