import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to Payment Gateway
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Secure, fast, and reliable payment processing for your business needs.
      </p>
      <Link
        to="/payment"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Make a Payment
      </Link>
    </div>
  );
};

export default Home; 