const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bookRoutes = require('./src/routes/bookRoutes');
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['*'] 
};

// Middleware to simulate HTTPS enforcement
const simulateHTTPS = (req, res, next) => {
  // Simulate HTTPS enforcement
  res.setHeader('X-Simulated-HTTPS', 'Enabled');
  next();
}

// Use the middlewares
app.use(simulateHTTPS);

app.use(cors(corsOptions)); // Use the CORS configuration
app.use(helmet());
app.use(express.json());

// Add this new route for the root path
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the Book API",
    documentation: "/api-docs",
    endpoints: {
      books: "/api/books"
    }
  });
});

app.use('/api/books', bookRoutes);

const startServer = () => {
  const port = process.env.PORT || 8000;
  return app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

if (require.main === module) {
  startServer();
}

// Export the app
module.exports = { app, startServer };
