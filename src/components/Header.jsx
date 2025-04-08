import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header({ setIsAuthenticated }) {
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Cart ({cartCount})</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
