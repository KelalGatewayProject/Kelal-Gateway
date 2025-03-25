# Mobile Ticketing System

A comprehensive mobile application that allows event organizers to create events, sell tickets, and validate attendees through QR code scanning, while providing attendees with a seamless ticket purchasing and event check-in experience.

## Features

- **Event Creation Dashboard** - Allow organizers to create events with details, pricing tiers, and capacity limits
- **Ticket Purchase Flow** - Simple checkout process with secure payment integration
- **QR Code Generation** - Unique QR codes for each ticket that can be saved to device wallet
- **Scanner Interface** - Camera-based QR scanner for event staff to quickly validate tickets
- **Attendee Management** - Track check-ins, manage guest lists, and view attendance analytics

## Architecture

The Mobile Ticketing System is deployed on AWS with the following components:

- **VPC** with public and private subnets across multiple availability zones
- **NAT Gateway** for private subnet internet access
- **Security Groups** for web, app, and database tiers
- **Elastic Beanstalk** for application deployment
- **RDS PostgreSQL** for database
- **CloudWatch** for monitoring and alarms
- **AWS Backup** for database backups

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 18 or later
- Git
- Elastic Beanstalk CLI (eb-cli)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/mobile-ticketing-system.git
cd mobile-ticketing-system
```

### Install Dependencies

```bash
npm install
```

### Configure AWS CLI

```bash
aws configure
```

### Initialize Elastic Beanstalk

```bash
eb init mobile-ticketing-system --platform node.js --region eu-north-1
```

## Deployment

### Option 1: Automated Deployment

Use the master deployment script to deploy the entire infrastructure and application:

```bash
./deploy.sh
```

This script will:
1. Deploy the infrastructure using CloudFormation
2. Deploy monitoring configuration
3. Deploy backup configuration
4. Build the application
5. Deploy the application to Elastic Beanstalk
6. Initialize the database (optional)
7. Load sample data (optional)

### Option 2: Manual Deployment

#### 1. Deploy Infrastructure

```bash
cd infrastructure
./deploy-stack.sh
```

#### 2. Deploy Monitoring

```bash
cd infrastructure
./deploy-monitoring.sh
```

#### 3. Deploy Backup

```bash
cd infrastructure
./deploy-backup.sh
```

#### 4. Build and Deploy Application

```bash
npm ci
npm run build
eb deploy
```

#### 5. Initialize Database

```bash
cd infrastructure
./init-db.sh
```

#### 6. Load Sample Data (Optional)

```bash
cd infrastructure
./load-sample-data.sh
```

## Local Development

### Start Development Server

```bash
npm run dev
```

### Using Docker Compose

```bash
docker-compose up
```

This will start the application and a PostgreSQL database.

## Cleanup

To delete all resources created for the Mobile Ticketing System:

```bash
./cleanup.sh
```

**WARNING**: This action is irreversible and will result in data loss!

## Documentation

- [Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
- [Infrastructure Setup](src/infrastructure/network-setup.md) - Network infrastructure setup details

## License

This project is licensed under the MIT License - see the LICENSE file for details.