require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173'
  })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'FitTrack'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Server error'
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`FitTrack API listening on port ${port}`);
  });
}

module.exports = app;
