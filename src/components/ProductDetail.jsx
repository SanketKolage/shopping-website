import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) {
          throw new Error('Product not found')
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (isLoading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!product) return <div className="not-found">Product not found</div>

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
        <p className="category">{product.category}</p>
        <p className="description">{product.description}</p>
        <div className="rating">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </div>
        <button
          className="add-to-cart"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <Link to="/" className="back-link">
          Back to products
        </Link>
      </div>
    </div>
  )
}
