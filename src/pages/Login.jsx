import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = allUsers.find(
      (u) => u.email === form.email && u.password === form.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate(user.role === 'admin' ? '/dashboard/admin' : '/dashboard/patient');
    } else {
      alert('❌ Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-indigo-100 to-pink-100 px-4">
      <motion.div
        className="backdrop-blur-lg bg-white/30 border border-white/20 shadow-2xl rounded-3xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-indigo-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl shadow-md">
            🦷
          </div>
          <h1 className="text-3xl font-extrabold text-indigo-800 mt-4">Dental Center Login</h1>
          <p className="text-gray-600 mt-1 text-sm">Welcome back! Please login to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-white/70 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-white/70 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl font-semibold shadow-md transition"
          >
            🔐 Login
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Try <span className="font-semibold">admin@example.com</span> / <span className="font-semibold">admin123</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
