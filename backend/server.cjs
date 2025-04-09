const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');

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
        uptime: process.uptime()
    });
});

// Basic route for testing
app.get('/', (req, res) => {
    console.log('Root endpoint requested');
    res.json({ 
        message: 'Kelal Gateway API is running',
        timestamp: new Date().toISOString()
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

// Add startup delay
console.log('Starting server with 5 second delay...');
setTimeout(() => {
    // Start server immediately
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log('Server startup complete at:', new Date().toISOString());
        console.log(`Server is running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
        console.log(`Process ID: ${process.pid}`);
        console.log(`Listening on: 0.0.0.0:${PORT}`);
        console.log('Health check endpoint available at /health');
        
        // Log initial health check using http module instead of fetch
        const options = {
            hostname: '127.0.0.1',
            port: PORT,
            path: '/health',
            method: 'GET'
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log('Initial health check response:', data);
            });
        });

        req.on('error', (err) => {
            console.error('Initial health check failed:', err);
        });

        req.end();
    });

    // Handle cleanup
    process.on('SIGTERM', () => {
        console.log('SIGTERM received at:', new Date().toISOString());
        console.log('Shutting down gracefully...');
        server.close(() => {
            console.log('Server closed at:', new Date().toISOString());
            process.exit(0);
        });
    });

    // Handle SIGINT (Ctrl+C)
    process.on('SIGINT', () => {
        console.log('SIGINT received at:', new Date().toISOString());
        console.log('Shutting down gracefully...');
        server.close(() => {
            console.log('Server closed at:', new Date().toISOString());
            process.exit(0);
        });
    });
}, 5000); // 5 second delay

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

// Log process events
process.on('exit', (code) => {
    console.log(`Process exiting with code ${code} at:`, new Date().toISOString());
});

module.exports = app;
