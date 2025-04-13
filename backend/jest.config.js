module.exports = {
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/fixtures/',
        '/dist/'
    ],
    testMatch: [
        '**/tests/**/*.test.js',
        '**/tests/**/*.spec.js'
    ],
    setupFilesAfterEnv: ['./tests/setup.js'],
    testTimeout: 30000,
    detectOpenHandles: true,
    forceExit: true,
    clearMocks: true,
    restoreMocks: true,
    testEnvironmentOptions: {
        beforeEach: () => {
            jest.useFakeTimers();
        },
        afterEach: () => {
            jest.useRealTimers();
        }
    }
};
