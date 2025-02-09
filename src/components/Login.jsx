import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSupabase } from '../contexts/SupabaseContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { supabase } = useSupabase();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard'); // Redirect to dashboard or home page after successful login
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="switch-form">
        <p>Don't have an account?</p>
        <Link to="/register">
            <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
