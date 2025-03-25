/**
 * Deployment Configuration for Mobile Ticketing System
 */

module.exports = {
  // Application name
  name: "mobile-ticketing-system",

  // Environment variables
  env: {
    NODE_ENV: "production",
    PORT: 3000,
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
