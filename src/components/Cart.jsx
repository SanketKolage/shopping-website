import { useCart } from '../context/CartContext'

export default function Cart({ onClose }) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    checkout,
    showSuccess,
  } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <button onClick={onClose} className="close-cart">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="item-details">
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="remove-item"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={checkout}>
          Checkout
        </button>
        <button onClick={onClose} className="continue-shopping">
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
