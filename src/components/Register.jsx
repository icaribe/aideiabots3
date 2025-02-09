import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSupabase } from '../contexts/SupabaseContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { supabase } = useSupabase();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
          console.log(data);
        navigate('/'); // Redirect to login or a welcome page after successful registration
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
        <div className="switch-form">
            <p>Already have an account?</p>
            <Link to="/">
                <button>Login</button>
            </Link>
        </div>
    </div>
  );
}

export default Register;
