# Complete Setup Guide for Mobile Ticketing System

This document provides a comprehensive step-by-step guide to set up the entire Mobile Ticketing System from scratch.

## Prerequisites

- Node.js 18 or later
- Git
- MongoDB account
- Twilio account (for SMS verification)
- Email service provider (for email notifications)

## Step 1: Clone the Repository

```bash
git clone https://github.com/KelalGatewayProject/Kelal-Gateway.git
cd Kelal-Gateway
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
```

Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
EMAIL_SERVICE=your_email_service
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password
FRONTEND_URL=http://localhost:3000
```

## Step 4: Set Up MongoDB

1. Create a MongoDB Atlas account or use another MongoDB provider
2. Set up a new cluster
3. Create a database user with appropriate permissions
4. Whitelist your IP address or set network access to allow connections from anywhere
5. Get your MongoDB connection string and add it to your `.env` files

## Step 5: Set Up Twilio for SMS Verification

1. Create a Twilio account
2. Get your Account SID and Auth Token
3. Get a Twilio phone number
4. Add these details to your backend `.env` file

## Step 6: Set Up Email Service

1. Choose an email service provider (Gmail, SendGrid, etc.)
2. Configure the email service with your account details
3. Add these details to your backend `.env` file

## Step 7: Start the Development Server

```bash
npm run dev
```

This will start both the frontend and backend servers in development mode.

## Step 8: Initialize the Database

The application will automatically create the necessary collections in MongoDB when it first runs. If you want to add sample data, you can use the following script:

```bash
node backend/scripts/seed-database.js
```

## Step 9: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

## Step 10: Create an Admin User

Register a new user through the application interface, then update the user's role to "admin" in the MongoDB database:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Step 11: Set Up for Production

When deploying to production, make sure to:

1. Set `NODE_ENV=production` in your environment variables
2. Use a strong, unique JWT secret
3. Set up proper security measures (HTTPS, rate limiting, etc.)
4. Configure proper logging and monitoring

## Step 12: Build for Production

```bash
npm run build
```

This will create a production build of the frontend in the `dist` directory.

## Step 13: Start the Production Server

```bash
npm start
```

This will start the server in production mode, serving the built frontend files.

## Troubleshooting

### Database Connection Issues

- Verify your MongoDB connection string is correct
- Ensure your IP address is whitelisted in MongoDB Atlas
- Check that your database user has the correct permissions

### SMS Verification Issues

- Verify your Twilio credentials are correct
- Ensure your Twilio account has sufficient funds
- Check that your Twilio phone number is configured correctly

### Email Service Issues

- Verify your email service credentials are correct
- Check that your email service is properly configured
- Ensure your email account has not been blocked or limited

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Twilio Documentation](https://www.twilio.com/docs)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)