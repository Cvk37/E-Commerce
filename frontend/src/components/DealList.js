import React, { useContext } from 'react';
import DealsContext from '../context/DealsContext'; 
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import '../css/DealList.css';

const DealList = () => {
  const { deals, countdowns } = useContext(DealsContext);

  if (deals.length === 0) {
    return <div>No Deals Available at this time, Check later</div>;
  }

  return (
    <div className="deal-list">
      {deals.map(deal => (
        <div key={deal.id} className="deal-item">
          <div className='deal-description'>
           <h4><Link to={`/products/${deal.product.name}`}>{deal.product.name} </Link></h4>
            {deal.product.images.length > 0 && (
              <img src={deal.product.images[0].url} alt="Deal Image" className="deal-image" />
            )}
            <p>{deal.product.description}</p>
            {deal.product.price && (
              <div className="price-container">
                <span className="original-price">${deal.product.price.toFixed(2)}</span>
                <span className="discounted-price">
                  ${(deal.product.price * (1 - deal.discount / 100)).toFixed(2)}
                </span>
                <span className="discount-percentage">({deal.discount}% off)</span>
              </div>
            )}
            <Button variant='contained' color='secondary'>Buy</Button>
          </div>
          <span className="expires-in">Expires : {countdowns[deal.id]}</span>
        </div>
      ))}
    </div>
  );
};

export default DealList;
