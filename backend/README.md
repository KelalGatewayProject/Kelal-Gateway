# Mobile Ticketing System Backend API

## Overview

This is the backend API for the Mobile Ticketing System, providing endpoints for authentication, user management, event management, ticket management, and staff management.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ticketing-system
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   ```

3. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## Deployment Instructions

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (v4.4 or higher)
- PM2 (for production process management)

### Deployment Steps

1. **Server Setup**
   - Set up a Linux server (Ubuntu 20.04 LTS recommended)
   - Install Node.js: `curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - && sudo apt-get install -y nodejs`
   - Install MongoDB: Follow the [official MongoDB installation guide](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
   - Install PM2: `npm install -g pm2`

2. **Application Deployment**
   - Clone the repository: `git clone https://github.com/KelalGatewayProject/Kelal-Gateway.git`
   - Navigate to the backend directory: `cd Kelal-Gateway/backend`
   - Install dependencies: `npm install --production`

3. **Environment Configuration**
   - Create a production `.env` file: `cp .env.example .env`
   - Edit the `.env` file with production values:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/ticketing-system-prod
     JWT_SECRET=your_strong_production_secret_key
     JWT_EXPIRES_IN=7d
     NODE_ENV=production
     ```

4. **Database Setup**
   - Start MongoDB service: `sudo systemctl start mongod`
   - Enable MongoDB to start on boot: `sudo systemctl enable mongod`
   - Create database user (optional but recommended):
     ```
     mongo
     use ticketing-system-prod
     db.createUser({
       user: "ticketing_app",
       pwd: "strong_password_here",
       roles: [{ role: "readWrite", db: "ticketing-system-prod" }]
     })
     exit
     ```
   - Update MONGODB_URI in .env if using authentication:
     ```
     MONGODB_URI=mongodb://ticketing_app:strong_password_here@localhost:27017/ticketing-system-prod
     ```

5. **Starting the Application**
   - Start with PM2: `pm2 start server.js --name "ticketing-api"`
   - Save PM2 process list: `pm2 save`
   - Setup PM2 to start on boot: `pm2 startup`

6. **Nginx Setup (Optional but Recommended)**
   - Install Nginx: `sudo apt-get install -y nginx`
   - Create Nginx config file: `sudo nano /etc/nginx/sites-available/ticketing-api`
   - Add the following configuration:
     ```
     server {
         listen 80;
         server_name api.yourdomain.com;

         location / {
             proxy_pass http://localhost:5000;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
         }
     }
     ```
   - Enable the site: `sudo ln -s /etc/nginx/sites-available/ticketing-api /etc/nginx/sites-enabled/`
   - Test Nginx config: `sudo nginx -t`
   - Restart Nginx: `sudo systemctl restart nginx`

7. **SSL Setup (Recommended)**
   - Install Certbot: `sudo apt-get install -y certbot python3-certbot-nginx`
   - Obtain SSL certificate: `sudo certbot --nginx -d api.yourdomain.com`
   - Follow the prompts to complete SSL setup

8. **Monitoring and Maintenance**
   - Monitor the application: `pm2 monit`
   - View logs: `pm2 logs ticketing-api`
   - Restart if needed: `pm2 restart ticketing-api`
   - Setup log rotation: `pm2 install pm2-logrotate`

9. **Backup Strategy**
   - Set up MongoDB backups: `mongodump --uri="mongodb://localhost:27017/ticketing-system-prod" --out=/var/backups/mongodb/$(date +"%Y-%m-%d")`
   - Create a cron job for daily backups:
     ```
     sudo crontab -e
     # Add this line to run backup daily at 2 AM
     0 2 * * * mongodump --uri="mongodb://localhost:27017/ticketing-system-prod" --out=/var/backups/mongodb/$(date +\%Y-\%m-\%d)
     ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token
- `POST /api/auth/organizer-register` - Register as an event organizer

### Users

- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create a new event (organizer only)
- `PUT /api/events/:id` - Update an event (organizer only)
- `DELETE /api/events/:id` - Delete an event (organizer only)
- `GET /api/events/category/:category` - Get events by category
- `POST /api/events/:id/check-in` - Check in a ticket for an event
- `POST /api/events/:id/redeem-voucher` - Redeem a drink voucher
- `GET /api/events/organizer/my-events` - Get events created by the logged-in organizer

### Tickets

- `GET /api/tickets/my-tickets` - Get all tickets for the logged-in user
- `GET /api/tickets/:id` - Get ticket by ID
- `POST /api/tickets/purchase` - Purchase a ticket for an event
- `GET /api/tickets/validate/:qrCode` - Validate a ticket QR code

### Staff

- `GET /api/staff/event/:eventId` - Get all staff members for an event
- `POST /api/staff` - Add a staff member to an event (organizer only)
- `PUT /api/staff/:id` - Update a staff member (organizer only)
- `DELETE /api/staff/:id` - Delete a staff member (organizer only)
- `PUT /api/staff/:id/accept` - Accept a staff position

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Security Measures

- JWT authentication for all protected routes
- Password hashing using bcrypt
- Rate limiting to prevent brute force attacks
- Input validation and sanitization
- CORS configuration for frontend access
- Helmet.js for HTTP header security

## Database Models

- User - User accounts and profiles
- Event - Event details and information
- Venue - Venue information
- Ticket - Ticket purchases and check-ins
- StaffMember - Event staff and their permissions