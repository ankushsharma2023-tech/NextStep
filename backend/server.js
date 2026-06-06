const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_ORIGIN,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

const corsOptions = {
  origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // <-- No quote marks! This is a raw Regex.
app.use(express.json());
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://ankushsharma2023_db_user:1grMUQfEq2zGHI1N@cluster0.b3akra1.mongodb.net/nextstep?retryWrites=true&w=majority';

mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Error: Failed to connect to', mongoUri);
    console.error(err);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reviews', require('./routes/reviews'));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`?? Server running on port ${PORT}`));
