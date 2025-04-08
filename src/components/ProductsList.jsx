import ProductCard from './ProductCard'

export default function ProductsList({ products }) {
  if (products.length === 0) {
    return <div className="no-products">No products found</div>
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
