# Mobile Ticketing System Setup Guide

This document provides a step-by-step guide to set up the Mobile Ticketing System infrastructure and deploy the application.

## Step 1: Update the Private Route Table

First, update the private route table to route internet traffic through the NAT Gateway:

```bash
cd infrastructure
./update-route-table.sh
```

This script will:
- Find the private route table with the tag name 'ticketing-app-private-rt'
- Create or replace a route for '0.0.0.0/0' pointing to the NAT Gateway
- Verify the route table configuration

## Step 2: Deploy the Infrastructure

Deploy the CloudFormation stack for the infrastructure:

```bash
cd infrastructure
./deploy-stack.sh
```

This will create or update the following resources:
- VPC with public and private subnets
- Internet Gateway and NAT Gateway
- Route tables and routes
- Security groups for web, app, and database tiers

## Step 3: Deploy Monitoring Configuration

Deploy the CloudWatch monitoring configuration:

```bash
cd infrastructure
./deploy-monitoring.sh
```

This will set up:
- CloudWatch Dashboard
- CPU Utilization Alarms
- Database CPU Utilization Alarms
- 5XX Error Rate Alarms
- SNS Topic for Alarms
- Log Groups for Application and System Logs

## Step 4: Deploy Backup Configuration

Deploy the AWS Backup configuration:

```bash
cd infrastructure
./deploy-backup.sh
```

This will set up:
- Backup Vault
- Backup Plan with daily backups
- IAM Role for AWS Backup
- Backup Selection for the database

## Step 5: Build and Deploy the Application

Build and deploy the application to Elastic Beanstalk:

```bash
npm ci
npm run build
eb deploy
```

## Step 6: Initialize the Database

Initialize the database schema:

```bash
cd infrastructure
./init-db.sh
```

## Step 7: Load Sample Data (Optional)

Load sample data into the database:

```bash
cd infrastructure
./load-sample-data.sh
```

## Step 8: Verify Deployment

Verify that the application is running correctly:

```bash
eb status
eb health
```

Access the application URL provided by Elastic Beanstalk.

## Step 9: Set Up CI/CD (Optional)

Set up CI/CD with GitHub Actions:

1. Push the code to a GitHub repository
2. Add AWS credentials as GitHub Secrets:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
3. Uncomment the deployment step in .github/workflows/deploy.yml

## Cleanup

To delete all resources when they are no longer needed:

```bash
./cleanup.sh
```

**WARNING**: This action is irreversible and will result in data loss!