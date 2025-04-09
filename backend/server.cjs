const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Health check endpoint for Render
app.get('/health', (req, res) => {
    console.log('Health check requested');
    res.status(200).json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Kelal Gateway API is running' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Get port from environment variable
const PORT = process.env.PORT || 8080;

// Start server immediately
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Process ID: ${process.pid}`);
    console.log(`Listening on: 0.0.0.0:${PORT}`);
    console.log('Health check endpoint available at /health');
});

// Handle cleanup
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

module.exports = app;
