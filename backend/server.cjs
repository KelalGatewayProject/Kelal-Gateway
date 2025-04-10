const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');

// Initialize Express app
const app = express();

// CORS configuration
const allowedOrigins = [
    'https://kelal-gateway-frontend.onrender.com',
    'http://localhost:3000'
];

// Middleware
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Dedicated healthz endpoint for Render
app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
});

// Health check endpoint for internal monitoring
app.get('/health', (req, res) => {
    try {
        const timestamp = new Date().toISOString();
        const memoryUsage = process.memoryUsage();
        const healthData = { 
            status: 'ok',
            timestamp: timestamp,
            environment: process.env.NODE_ENV || 'development',
            uptime: process.uptime(),
            processId: process.pid,
            memory: {
                heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
                heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
                rss: Math.round(memoryUsage.rss / 1024 / 1024)
            }
        };
        
        console.log('Health check requested at:', timestamp, 'Data:', healthData);
        res.status(200).json(healthData);
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            error: error.message
        });
    }
});

// Basic route for testing
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'ok',
        message: 'Kelal Gateway API is running',
        timestamp: new Date().toISOString()
    });
});

// Monitoring routes
app.post('/api/monitoring/metrics', (req, res) => {
    const metrics = req.body;
    console.log('Performance Metrics:', metrics);
    res.sendStatus(200);
});

app.post('/api/monitoring/logs', (req, res) => {
    const logs = req.body;
    console.log('Application Logs:', logs);
    res.sendStatus(200);
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

// Internal keep-alive mechanism - hit health endpoint every 2 minutes
setInterval(() => {
    const options = {
        hostname: '127.0.0.1',
        port: PORT,
        path: '/health',
        method: 'GET',
        timeout: 5000
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('Internal health check successful:', {
                statusCode: res.statusCode,
                data: JSON.parse(data)
            });
        });
    });

    req.on('error', (error) => {
        console.error('Internal health check failed:', {
            error: error.message,
            code: error.code,
            timestamp: new Date().toISOString()
        });
    });

    req.on('timeout', () => {
        console.error('Internal health check timed out');
        req.destroy();
    });

    req.end();
}, 120000);

// Keep-alive logging - log every 5 minutes
setInterval(() => {
    console.log('==========================================');
    console.log(`Server status: Running for ${Math.floor(process.uptime())} seconds`);
    console.log(`Memory usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`);
    console.log('==========================================');
}, 300000);

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
