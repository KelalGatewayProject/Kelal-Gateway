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
    res.status(200).json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        uptime: process.uptime()
    });
});

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ 
        message: 'Kelal Gateway API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.stack);
    res.status(500).json({ 
        error: 'Something broke!',
        timestamp: new Date().toISOString()
    });
});

// Get port from environment variable
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Process ID: ${process.pid}`);
    console.log(`Listening on: 0.0.0.0:${PORT}`);
});

// Keep-alive mechanism - log every minute
setInterval(() => {
    console.log(`Server status: Running for ${Math.floor(process.uptime())} seconds`);
}, 60000); // Every minute

// Handle cleanup
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down...');
    process.exit(0);
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
