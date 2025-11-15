import React, { useState } from 'react';

const FeedbackForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${API_URL}/feedback`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit feedback');
      }
      
      alert('✅ Feedback submitted successfully!');
      setFormData({ name: '', email: '', message: '', rating: 5 });
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
      alert('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>📝 Submit Your Feedback</h2>
      
      {error && (
        <div style={styles.error}>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Message *</label>
          <textarea
            name="message"
            placeholder="Share your feedback..."
            value={formData.message}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Rating *</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="5">⭐⭐⭐⭐⭐ Excellent (5)</option>
            <option value="4">⭐⭐⭐⭐ Good (4)</option>
            <option value="3">⭐⭐⭐ Average (3)</option>
            <option value="2">⭐⭐ Poor (2)</option>
            <option value="1">⭐ Very Poor (1)</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '⏳ Submitting...' : '🚀 Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    marginBottom: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  heading: {
    marginBottom: '25px',
    color: '#333',
    fontSize: '24px'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    minHeight: '120px',
    boxSizing: 'border-box',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s'
  },
  error: {
    padding: '10px',
    backgroundColor: '#fee',
    color: '#c33',
    borderRadius: '6px',
    marginBottom: '15px'
  }
};

export default FeedbackForm;