import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });

      alert(response.data.message); // "Login successful"
      // Optionally store user id/token:
      // localStorage.setItem("user_id", response.data.user_id);

      navigate('/home');
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Login failed';
      alert(errorMsg);
    }
  };

  return (
  <div>
      <h1 className='text-center text-gray-800 font-bold text-2xl pb-10 ' >Welcome to the Payment Gateway</h1>
    <div className="flex  justify-center h-3/5 ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-gray-600 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-gray-600 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
</div>
  );
};

export default Login;
