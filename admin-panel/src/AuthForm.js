import React, { useState } from 'react';

const AuthForm = ({ mode }) => {
  // Fix: Safe title generation using optional chaining and a fallback
  const formTitle = (mode?.toUpperCase()) || "AUTHENTICATION";

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting ${mode} form:`, formData);
  };

  return (
    <div className="auth-container">
      <h2>{formTitle}</h2> {/* This line is where your error was likely happening */}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={formData.password} 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required 
          />
        </div>

        <button type="submit">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;