import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          RedisAI
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link to="#features" className="text-gray-600 hover:text-blue-600">Features</Link>
          <Link to="#pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
          <Link to="#about" className="text-gray-600 hover:text-blue-600">About Us</Link>
          <Link to="#contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
        </nav>
        <button className='bg-white hover:bg-gray-100 py-2 px-3 rounded border'>Sign In</button>
      </div>
    </header>
  )
}