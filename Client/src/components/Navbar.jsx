import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/home" className="text-white font-bold text-xl">
              Payment Gateway
            </Link>
          </div>
          { location.pathname !== "/login" && location.pathname !== "/signup" && 
          <div className="flex space-x-4">
            <Link
              to="/home"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/home')}`}
            >
              Home
            </Link>
            <Link
              to="/payment"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/payment')}`}
            >
              Make Payment
            </Link>
            <Link
              to="/transactions"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/transactions')}`}
            >
              Transactions
            </Link>
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin')}`}
            >
              Admin
            </Link>
          </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 