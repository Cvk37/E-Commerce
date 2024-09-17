import React, { useContext ,FC} from 'react';
import CartContext from '../context/CartContext';
import DealsContext from '../context/DealsContext';

// Define the types for your product, deal, and cart item
interface Product {
  productId: number;
  name: string;
  price: number;
}

interface Deal {
  product: Product;
  discount: number;
}

interface CartItem {
  product: Product;
  images: { id: number; url: string }[];
  quantity: number;
}

const ShoppingCart: FC = () => {
  const { cartItems, clearCart, setCartItems } = useContext(CartContext);
  const { deals } = useContext(DealsContext);

  const totalPrice = cartItems.reduce((total: number, item: CartItem) => {
    const deal = deals.find((deal: Deal) => deal.product.productId === item.product.productId);
    const price = deal ? item.product.price * (1 - deal.discount / 100) : item.product.price;
    return total + price * item.quantity;
  }, 0);

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your Shopping Cart is Empty</p>
      ) : (
        <div>
          <table style={{ marginRight: '20px' }}>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Image</th>
                <th style={{ width: '50%' }}>Name</th>
                <th style={{ width: '30%' }}>Price</th>
                <th style={{ width: '20%' }}>Qty</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem, index: number) => {
                const deal = deals.find((deal: Deal) => deal.product.productId === item.product.productId);
                const price = deal ? item.product.price * (1 - deal.discount / 100) : item.product.price;

                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.images[0].url}
                        alt={`Image ${item.images[0].id}`}
                        style={{ width: '50px' }}
                      />
                    </td>
                    <td>{item.product.name}</td>
                    <td>
                      {deal ? (
                        <>
                          <span style={{ textDecoration: 'line-through' }}>
                            ${item.product.price.toFixed(2)}
                          </span>
                          <span style={{ color: 'red', marginLeft: '10px' }}>
                            ${price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span>${item.product.price.toFixed(2)}</span>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                        min="1"
                        style={{ width: '50px' }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p style={{ marginTop: '10px' }}>Total: ${totalPrice.toFixed(2)}</p>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
