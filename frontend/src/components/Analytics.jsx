import React from 'react';

const Analytics = ({ stats }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>📊</div>
        <h3 style={styles.title}>Total Feedbacks</h3>
        <p style={styles.number}>{stats.total || 0}</p>
      </div>

      <div style={styles.card}>
        <div style={styles.icon}>⭐</div>
        <h3 style={styles.title}>Average Rating</h3>
        <p style={styles.number}>
          {stats.avgRating ? stats.avgRating.toFixed(2) : '0.00'}
        </p>
      </div>

      <div style={{...styles.card, ...styles.positiveCard}}>
        <div style={styles.icon}>😊</div>
        <h3 style={styles.title}>Positive (4-5)</h3>
        <p style={styles.number}>{stats.positive || 0}</p>
      </div>

      <div style={{...styles.card, ...styles.negativeCard}}>
        <div style={styles.icon}>😞</div>
        <h3 style={styles.title}>Negative (&lt;3)</h3>
        <p style={styles.number}>{stats.negative || 0}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s'
  },
  positiveCard: {
    backgroundColor: '#d4edda',
    borderLeft: '4px solid #28a745'
  },
  negativeCard: {
    backgroundColor: '#f8d7da',
    borderLeft: '4px solid #dc3545'
  },
  icon: {
    fontSize: '32px',
    marginBottom: '10px'
  },
  title: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  number: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#007bff',
    margin: '10px 0 0 0'
  }
};

export default Analytics;