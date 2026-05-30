const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Travel Planner API жұмыс істеп тұр! ✈️' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Маршрут табылмады' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер ${PORT} портта іске қосылды`);
});

module.exports = app;