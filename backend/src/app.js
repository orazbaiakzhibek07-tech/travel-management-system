const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Travel Planner API жұмыс істеп тұр! ✈️' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер ${PORT} портта іске қосылды`);
});

module.exports = app;