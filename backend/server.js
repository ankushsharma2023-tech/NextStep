const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // 1. Imported path module to fix .env location

// 2. Explicitly tell dotenv to look in the exact current folder for variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// 3. Added your exact Vercel deployment URL to the allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_ORIGIN,
  'https://next-step-one-blond.vercel.app', // Your live frontend
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

// 4. Updated CORS options to properly check origins and handle preflight requests
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, postman, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // <-- No quote marks! Raw Regex for Express 5.
app.use(express.json());

// Database Connection
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://ankushsharma2023_db_user:1grMUQfEq2zGHI1N@cluster0.b3gkra1.mongodb.net/nextstep?retryWrites=true&w=majority';

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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));