import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signup', {
        name,
        email,
        password,
      });

      alert(response.data.message); // "User registered successfully"
      navigate('/login');
    } catch (error) {
      setMessage(
        error.response?.data?.detail || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h1 className='text-center text-gray-800 font-bold text-2xl pb-10 ' >Welcome to the Payment Gateway</h1>
    <div className="flex items-center justify-center h-4/5">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

        {message && (
          <div className="text-red-600 text-sm text-center">{message}</div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-gray-600 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-indigo-500"
            />
          </div>

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
            <label htmlFor="password2" className="text-sm font-semibold text-gray-600 block">
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
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
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
