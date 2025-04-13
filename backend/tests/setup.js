const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const logger = require('../src/utils/logger');

// Disable logging during tests
logger.silent = true;

let mongod;

// Connect to the in-memory database before running tests
beforeAll(async () => {
    try {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri);
    } catch (error) {
        console.error('Error connecting to in-memory MongoDB:', error);
        throw error;
    }
});

// Clear all test data after each test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});

// Disconnect and stop MongoDB after all tests are done
afterAll(async () => {
    await mongoose.connection.close();
    if (mongod) {
        await mongod.stop();
    }
});

// Set up global test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_EXPIRES_IN = '1h';
