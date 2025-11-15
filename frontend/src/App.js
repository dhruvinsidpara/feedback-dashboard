import React, { useState, useEffect, useCallback } from 'react';
import FeedbackForm from './components/FeedbackForm';
import Analytics from './components/Analytics';
import FeedbackTable from './components/FeedbackTable';
import AdminLogin from './components/AdminLogin';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Use useCallback to fix the warning
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const feedbackRes = await fetch(`${API_URL}/feedback`);
      if (!feedbackRes.ok) throw new Error('Failed to fetch feedbacks');
      const feedbackData = await feedbackRes.json();
      setFeedbacks(feedbackData);

      const statsRes = await fetch(`${API_URL}/feedback/stats`);
      if (!statsRes.ok) throw new Error('Failed to fetch stats');
      const statsData = await statsRes.json();
      setStats(statsData);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  // Check if already logged in
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
      fetchData();
    }
  }, [fetchData]);

  const handleAdminLogin = (status) => {
    setIsAdmin(status);
    setShowAdminLogin(false);
    if (status) {
      fetchData();
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
    setFeedbacks([]);
    setStats({});
  };

  const handleFeedbackSubmit = () => {
    alert('✅ Thank you for your feedback!');
    if (isAdmin) {
      fetchData();
    }
  };

  // Show admin login modal
  if (showAdminLogin && !isAdmin) {
    return <AdminLogin onLogin={handleAdminLogin} onClose={() => setShowAdminLogin(false)} />;
  }

  return (
    <div className="App" style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>🎯 Feedback Management System</h1>
          <p style={styles.subtitle}>Upteky Solution Pvt. Ltd.</p>
        </div>
        
        {isAdmin && (
          <button onClick={handleLogout} style={styles.logoutButton}>
            🚪 Logout
          </button>
        )}
      </header>

      {/* Public Feedback Form - Always Visible */}
      <FeedbackForm onSubmitSuccess={handleFeedbackSubmit} />

      {/* Admin Button - Only show if not logged in */}
      {!isAdmin && (
        <div style={styles.adminButtonContainer}>
          <button 
            onClick={() => setShowAdminLogin(true)} 
            style={styles.adminButton}
            className="admin-access-button"
          >
            🔐 Admin Access
          </button>
        </div>
      )}

      {/* Admin Dashboard - Only show if logged in */}
      {isAdmin && (
        <>
          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.loader}></div>
              <p>Loading dashboard...</p>
            </div>
          ) : (
            <>
              {error && (
                <div style={styles.errorBanner}>
                  ⚠️ Error: {error}
                </div>
              )}

              <div style={styles.adminSection}>
                <h2 style={styles.adminHeading}>📊 Admin Dashboard</h2>
                <Analytics stats={stats} />
                <FeedbackTable feedbacks={feedbacks} />
              </div>
            </>
          )}
        </>
      )}

      <footer style={styles.footer}>
        <p>© 2024 Upteky Solution Pvt. Ltd. | Developed for SDE Intern Task</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    paddingTop: '20px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    color: '#2c3e50',
    fontSize: '36px',
    marginBottom: '10px',
    fontWeight: '700'
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '18px',
    fontWeight: '400'
  },
  adminButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 0',
    padding: '20px'
  },
  adminButton: {
    padding: '16px 48px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  logoutButton: {
    padding: '12px 24px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  adminSection: {
    marginTop: '40px',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  adminHeading: {
    color: '#2c3e50',
    fontSize: '28px',
    marginBottom: '30px',
    textAlign: 'center',
    paddingBottom: '20px',
    borderBottom: '3px solid #007bff'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    marginTop: '40px'
  },
  loader: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite'
  },
  errorBanner: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: '600'
  },
  footer: {
    marginTop: '50px',
    padding: '20px',
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '14px',
    borderTop: '1px solid #ddd'
  }
};

export default App;