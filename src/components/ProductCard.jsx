import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h3>{product.title}</h3>
          <p className="price">${product.price}</p>
          <p className="category">{product.category}</p>
        </div>
      </Link>
    </div>
  )
}
