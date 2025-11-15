import React, { useState } from 'react';

const AdminLogin = ({ onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password === 'admin123') {
      onLogin(true);
      localStorage.setItem('isAdmin', 'true');
    } else {
      setError('❌ Invalid password!');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeButton}>✕</button>
        
        <div style={styles.loginBox}>
          <h2 style={styles.title}>🔐 Admin Login</h2>
          <p style={styles.subtitle}>Enter admin password to access dashboard</p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              autoFocus
            />
            
            {error && <p style={styles.error}>{error}</p>}
            
            <button type="submit" style={styles.button}>
              🔓 Login
            </button>
          </form>
          
          <p style={styles.hint}>💡 Demo Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
  },
  modal: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    maxWidth: '450px',
    width: '90%',
    animation: 'slideIn 0.3s ease-out'
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    color: '#999',
    cursor: 'pointer',
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },
  loginBox: {
    padding: '50px 40px 40px 40px'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px',
    fontSize: '28px'
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '15px',
    boxSizing: 'border-box',
    transition: 'all 0.3s'
  },
  button: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  error: {
    color: '#dc3545',
    fontSize: '14px',
    marginBottom: '15px',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#ffe6e6',
    borderRadius: '6px',
    fontWeight: '600'
  },
  hint: {
    textAlign: 'center',
    color: '#28a745',
    fontSize: '13px',
    marginTop: '20px',
    padding: '8px',
    backgroundColor: '#e8f5e9',
    borderRadius: '6px'
  }
};

export default AdminLogin;