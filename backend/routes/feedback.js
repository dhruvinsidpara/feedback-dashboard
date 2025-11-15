const express = require('express');
const router = express.Router();
const db = require('../database');

// POST - Add new feedback
router.post('/', (req, res) => {
  const { name, email, message, rating } = req.body;

  // Validation
  if (!name || !message) {
    return res.status(400).json({ 
      error: 'Name and message are required' 
    });
  }

  if (!email) {
    return res.status(400).json({ 
      error: 'Email is required' 
    });
  }

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ 
      error: 'Rating must be between 1 and 5' 
    });
  }

  const query = `
    INSERT INTO feedbacks (name, email, message, rating) 
    VALUES (?, ?, ?, ?)
  `;
  
  db.run(query, [name, email, message, rating], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to save feedback' });
    }
    
    res.status(201).json({ 
      id: this.lastID, 
      message: 'Feedback submitted successfully',
      feedback: { id: this.lastID, name, email, message, rating }
    });
  });
});

// GET - Fetch all feedbacks
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM feedbacks 
    ORDER BY createdAt DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch feedbacks' });
    }
    res.json(rows);
  });
});

// GET - Analytics/Stats
router.get('/stats', (req, res) => {
  const statsQuery = `
    SELECT 
      COUNT(*) as total,
      AVG(rating) as avgRating,
      SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) as positive,
      SUM(CASE WHEN rating < 3 THEN 1 ELSE 0 END) as negative
    FROM feedbacks
  `;
  
  db.get(statsQuery, [], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }
    
    res.json({
      total: row.total || 0,
      avgRating: row.avgRating || 0,
      positive: row.positive || 0,
      negative: row.negative || 0
    });
  });
});

// GET - Single feedback by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const query = `SELECT * FROM feedbacks WHERE id = ?`;
  
  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    res.json(row);
  });
});

module.exports = router;
