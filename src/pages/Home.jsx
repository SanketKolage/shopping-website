import { useState, useEffect } from 'react'
import ProductsList from '../components/ProductsList'
import Cart from '../components/Cart'
import { useCart } from '../context/CartContext'

export default function Home() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCart, setShowCart] = useState(false)
  const { showSuccess } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories'),
        ])

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const productsData = await productsResponse.json()
        const categoriesData = await categoriesResponse.json()

        setProducts(productsData)
        setFilteredProducts(productsData)
        setCategories(categoriesData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = products

    if (selectedCategory !== 'all') {
      result = result.filter(
        (product) => product.category === selectedCategory
      )
    }

    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(result)
  }, [selectedCategory, searchQuery, products])

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category)
  }

  if (isLoading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="home-container">
      {showSuccess && (
        <div className="success-popup">Order placed successfully!</div>
      )}
      <div className="filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button
          className="toggle-cart-btn"
          onClick={() => setShowCart(!showCart)}
        >
          {showCart ? 'Hide Cart' : 'Show Cart'}
        </button>
      </div>

      {showCart ? (
        <Cart onClose={() => setShowCart(false)} />
      ) : (
        <ProductsList products={filteredProducts} />
      )}
    </div>
  )
}
