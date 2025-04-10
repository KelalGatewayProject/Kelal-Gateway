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
    console.log('Health check requested at:', new Date().toISOString());
    res.status(200).json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        uptime: process.uptime(),
        processId: process.pid
    });
});

// Basic route for testing
app.get('/', (req, res) => {
    console.log('Root endpoint requested at:', new Date().toISOString());
    res.json({ 
        message: 'Kelal Gateway API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        processId: process.pid
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

// Start server with explicit logging
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('==========================================');
    console.log('Server startup sequence initiated');
    console.log('==========================================');
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Process ID: ${process.pid}`);
    console.log(`Listening on: 0.0.0.0:${PORT}`);
    console.log('==========================================');
    console.log('Server is ready to accept connections');
    console.log('==========================================');
});

// Keep-alive mechanism - log every 5 minutes
setInterval(() => {
    console.log('==========================================');
    console.log(`Server status: Running for ${Math.floor(process.uptime())} seconds`);
    console.log(`Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
    console.log('==========================================');
}, 300000); // Every 5 minutes

// Handle cleanup
process.on('SIGTERM', () => {
    console.log('==========================================');
    console.log('SIGTERM received, initiating graceful shutdown');
    console.log('==========================================');
    server.close(() => {
        console.log('Server closed, exiting process');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('==========================================');
    console.error('Uncaught Exception:', err);
    console.error('==========================================');
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error('==========================================');
    console.error('Unhandled Rejection:', err);
    console.error('==========================================');
});

module.exports = app;
