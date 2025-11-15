import React from 'react';

const FeedbackTable = ({ feedbacks }) => {
  return (
    <div style={styles.container}>
      <h2>All Feedbacks</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Rating</th>
            <th style={styles.th}>Message</th>
            <th style={styles.th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td style={styles.td}>{feedback.name}</td>
              <td style={styles.td}>{feedback.email}</td>
              <td style={styles.td}>{'⭐'.repeat(feedback.rating)}</td>
              <td style={styles.td}>{feedback.message}</td>
              <td style={styles.td}>
                {new Date(feedback.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '30px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  th: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  }
};

export default FeedbackTable;