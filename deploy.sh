#!/bin/bash

# Master deployment script for Mobile Ticketing System

set -e

echo "=== Mobile Ticketing System Deployment ==="
echo "This script will deploy the entire infrastructure and application."

# Check for AWS CLI
if ! command -v aws &> /dev/null; then
    echo "Error: AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check for AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "Error: AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

# Deploy infrastructure
echo "\n=== Deploying Infrastructure ==="
cd infrastructure
./deploy-stack.sh
cd ..

# Deploy monitoring
echo "\n=== Deploying Monitoring Configuration ==="
cd infrastructure
./deploy-monitoring.sh
cd ..

# Deploy backup
echo "\n=== Deploying Backup Configuration ==="
cd infrastructure
./deploy-backup.sh
cd ..

# Build application
echo "\n=== Building Application ==="
npm ci
npm run build

# Create deployment package
echo "\n=== Creating Deployment Package ==="
rm -f deploy.zip
zip -r deploy.zip dist package.json package-lock.json

# Deploy to Elastic Beanstalk
echo "\n=== Deploying to Elastic Beanstalk ==="
eb deploy

# Initialize database (if needed)
read -p "Do you want to initialize the database? (y/n): " init_db
if [[ $init_db == "y" || $init_db == "Y" ]]; then
    echo "\n=== Initializing Database ==="
    cd infrastructure
    ./init-db.sh
    cd ..
fi

# Load sample data (if needed)
read -p "Do you want to load sample data? (y/n): " load_data
if [[ $load_data == "y" || $load_data == "Y" ]]; then
    echo "\n=== Loading Sample Data ==="
    cd infrastructure
    ./load-sample-data.sh
    cd ..
fi

echo "\n=== Deployment Completed Successfully! ==="
echo "Your Mobile Ticketing System has been deployed with the following components:"
echo "- VPC with public and private subnets"
echo "- NAT Gateway for private subnet internet access"
echo "- Security groups for web, app, and database tiers"
echo "- Application deployed to Elastic Beanstalk"
echo "- Database initialized with schema"
echo "- CloudWatch monitoring and alarms configured"
echo "- AWS Backup configured for database backups"
echo "\nAccess your application at the Elastic Beanstalk URL provided above."
