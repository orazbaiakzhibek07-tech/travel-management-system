const pool = require('../models/db');

const getAllTrips = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = 'SELECT * FROM trips WHERE user_id = $1';
    let params = [req.userId];
    if (search) {
      query += ` AND (title ILIKE $2 OR city ILIKE $2 OR country ILIKE $2)`;
      params.push(`%${search}%`);
    }
    if (status) {
      query += ` AND status = $${params.length + 1}`;
      params.push(status);
    }
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getTripById = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await pool.query(
      'SELECT * FROM trips WHERE id = $1 AND user_id = $2',
      [id, req.userId]
    );
    if (trip.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Сапар табылмады' });
    }
    res.json({ success: true, data: trip.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const createTrip = async (req, res) => {
  try {
    const { title, country, city, price, duration, description, image_url, includes, start_date, end_date } = req.body;
    const result = await pool.query(
      `INSERT INTO trips (user_id, title, country, city, price, duration, description, image_url, includes, start_date, end_date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [req.userId, title, country, city, price, duration, description, image_url, includes, start_date, end_date]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, country, city, price, duration, description, status, start_date, end_date } = req.body;
    const result = await pool.query(
      `UPDATE trips SET title=$1, country=$2, city=$3, price=$4, duration=$5,
       description=$6, status=$7, start_date=$8, end_date=$9
       WHERE id=$10 AND user_id=$11 RETURNING *`,
      [title, country, city, price, duration, description, status, start_date, end_date, id, req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Сапар табылмады' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM trips WHERE id=$1 AND user_id=$2 RETURNING *',
      [id, req.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Сапар табылмады' });
    }
    res.json({ success: true, message: 'Сапар өшірілді' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip };