"use client";
import React, { useState } from 'react';
import { login } from '@/services/authService/auth-service'; // Import login function from auth-service
import { useRouter } from 'next/navigation'; // Used for routing after login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Used for redirecting after successful login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginDetails = { email, password };
      const response = await login(loginDetails);
      console.log('Login successful:', response);

      // Redirect to the dashboard or home page after successful login
      router.push('/dashboard'); // Change the route as per your application's routing
    } catch (err) {
      setError('Login failed. Please check your credentials and try again!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
