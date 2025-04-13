const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
    try {
        // MongoDB Atlas connection string
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://mdb_sa_id_67fbc5c8f0a19c6a346258cf:mdb_sa_sk_JMPpiwLc8HBEiRykQkv7IjqfxpCa9veEbSoaLLca@kelal-gateway.mongodb.net/kelal-gateway?retryWrites=true&w=majority';

        await mongoose.connect(mongoURI);
        logger.info('MongoDB Atlas connected successfully');
    } catch (error) {
        logger.error('MongoDB connection error:', error.message);
        // Exit process with failure
        process.exit(1);
    }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
    logger.info('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
    logger.error('MongoDB error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected');
});

// Handle application termination
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        logger.error('Error closing MongoDB connection:', err.message);
        process.exit(1);
    }
});

module.exports = connectDB;
