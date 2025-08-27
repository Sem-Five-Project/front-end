'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    profilePicture: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    console.log("Form data being sent:", JSON.stringify(formData));

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      console.log("Response data:", data);
      if (!response.ok) {
        setError(data.message || 'Registration failed');
      } else {
        setSuccess('Registration successful! Please login.');
      }
    } catch (err) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Register for Edimy</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
   
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="Role" className="block mb-1 font-semibold">Role</label>
          <input
            type="role"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="profilePicture" className="block mb-1 font-semibold">Profile Picture URL</label>
          <input
            type="url"
            id="profilePicture"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {error && <p className="text-orange-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
