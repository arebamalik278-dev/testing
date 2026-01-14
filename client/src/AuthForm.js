import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = ({ role }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data ready for your future backend connection
    const userData = { email, password, role };
    console.log(`Submitting ${isLogin ? 'Login' : 'Signup'} for ${role}:`, userData);
    alert(`${isLogin ? 'Logged in' : 'Signed up'} as ${role}`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{role.toUpperCase()} PANEL</h2>
          <p>{isLogin ? 'Welcome back! Please login.' : 'Create a new account.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com" 
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required 
            />
          </div>

          <button type="submit" className="auth-btn">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? ' Sign Up' : ' Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;