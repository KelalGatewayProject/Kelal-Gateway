/**
 * Deployment Configuration for Mobile Ticketing System
 */

module.exports = {
  // Application name
  name: "mobile-ticketing-system",

  // Environment variables
  env: {
    NODE_ENV: "production",
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
    EMAIL_SERVICE: process.env.EMAIL_SERVICE,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 900000,
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
    CSRF_SECRET: process.env.CSRF_SECRET,
    LOG_LEVEL: process.env.LOG_LEVEL || "error",
    LOG_FILE_PATH: process.env.LOG_FILE_PATH || "logs/app.log",
  },

  // Build command
  build: "npm run build",

  // Deployment region
  region: "eu-north-1",

  // Instance type (if using EC2)
  instanceType: "t3.small",

  // Auto-scaling configuration
  autoScaling: {
    min: 1,
    max: 3,
    cpuThreshold: 70,
  },

  // Health check path
  healthCheckPath: "/api/health",

  // Database connection (placeholder - update with actual values)
  database: {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || "ticketing_db",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
  },
};
