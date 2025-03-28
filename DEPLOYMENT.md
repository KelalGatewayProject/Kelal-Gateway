# Mobile Ticketing System Deployment Guide

This document provides instructions for deploying the Mobile Ticketing System.

## Prerequisites

- Node.js 18 or later
- Git
- MongoDB account (for database)
- Twilio account (for SMS verification)
- Email service provider (for email notifications)

## Infrastructure Setup

### Database Configuration

1. **MongoDB Setup**
   - Create a MongoDB Atlas account or use another MongoDB provider
   - Set up a new cluster
   - Create a database user with appropriate permissions
   - Whitelist your IP address or set network access to allow connections from anywhere
   - Get your MongoDB connection string

2. **Environment Variables**
   - Create a `.env` file in the root directory and the backend directory
   - Add the following variables to both files:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Add the following to the backend `.env` file:
     ```
     TWILIO_ACCOUNT_SID=your_twilio_account_sid
     TWILIO_AUTH_TOKEN=your_twilio_auth_token
     TWILIO_PHONE_NUMBER=your_twilio_phone_number
     EMAIL_SERVICE=your_email_service
     EMAIL_USER=your_email_user
     EMAIL_PASSWORD=your_email_password
     ```

## Deployment Options

### Option 1: Traditional Hosting (Recommended for simplicity)

1. Choose a hosting provider (Heroku, DigitalOcean, Render, etc.)
2. Set up a new project/app
3. Connect your GitHub repository
4. Configure environment variables
5. Deploy the application

### Option 2: Docker Deployment

1. Build the Docker image:
   ```
   docker build -t mobile-ticketing-system .
   ```

2. Run the container:
   ```
   docker run -p 3000:3000 -p 5000:5000 --env-file .env mobile-ticketing-system
   ```

### Option 3: Manual Deployment

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/mobile-ticketing-system.git
   cd mobile-ticketing-system
   ```

2. Install dependencies:
   ```
   npm install
   cd backend
   npm install
   cd ..
   ```

3. Build the frontend:
   ```
   npm run build
   ```

4. Start the server:
   ```
   npm start
   ```

## CI/CD Pipeline

1. Set up GitHub Actions workflow (see .github/workflows/deploy.yml)
2. Add necessary secrets to your GitHub repository
3. Push code to trigger deployment

## Database Setup

1. The application will automatically create the necessary collections in MongoDB
2. You can initialize the database with sample data if needed

## Monitoring and Logging

1. Set up application monitoring using a service like New Relic, Datadog, or Sentry
2. Configure logging to capture important events and errors
3. Set up alerts for critical issues

## Troubleshooting

- Check environment variables are correctly set
- Verify database connection
- Review application logs for errors
- Ensure all required ports are open and accessible