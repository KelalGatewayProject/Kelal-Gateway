# Complete Setup Guide for Mobile Ticketing System

This document provides a comprehensive step-by-step guide to set up the entire Mobile Ticketing System from scratch.

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 18 or later
- Git
- Elastic Beanstalk CLI (eb-cli)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/mobile-ticketing-system.git
cd mobile-ticketing-system
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Configure AWS CLI

```bash
aws configure
```

Enter your AWS Access Key ID, Secret Access Key, default region (eu-north-1), and output format (json).

## Step 4: Create the NAT Gateway

Create a NAT Gateway in the correct public subnet:

```bash
cd infrastructure
./create-nat-gateway.sh
```

This script will:
- Find the VPC with the tag name 'ticketing-app-vpc'
- Find the public subnet with the tag name 'ticketing-app-public-subnet-1'
- Check if a NAT Gateway already exists
- If it exists in the wrong subnet, offer to delete it and create a new one
- Create a new NAT Gateway in the public subnet
- Allocate an Elastic IP for the NAT Gateway
- Update the private route table to route internet traffic through the NAT Gateway

## Step 5: Deploy the Infrastructure

Deploy the CloudFormation stack for the infrastructure:

```bash
./deploy-stack.sh
```

This will create or update the following resources:
- VPC with public and private subnets
- Internet Gateway
- Route tables and routes
- Security groups for web, app, and database tiers

## Step 6: Deploy Monitoring Configuration

Deploy the CloudWatch monitoring configuration:

```bash
./deploy-monitoring.sh
```

This will set up:
- CloudWatch Dashboard
- CPU Utilization Alarms
- Database CPU Utilization Alarms
- 5XX Error Rate Alarms
- SNS Topic for Alarms
- Log Groups for Application and System Logs

## Step 7: Deploy Backup Configuration

Deploy the AWS Backup configuration:

```bash
./deploy-backup.sh
```

This will set up:
- Backup Vault
- Backup Plan with daily backups
- IAM Role for AWS Backup
- Backup Selection for the database

## Step 8: Initialize Elastic Beanstalk

Initialize Elastic Beanstalk for the application:

```bash
cd ..
eb init mobile-ticketing-system --platform node.js --region eu-north-1
```

## Step 9: Create Elastic Beanstalk Environment

Create an Elastic Beanstalk environment:

```bash
eb create production-environment \
  --instance_type t3.small \
  --vpc.id vpc-xxx \
  --vpc.elbsubnets subnet-xxx,subnet-yyy \
  --vpc.ec2subnets subnet-zzz,subnet-www \
  --vpc.elbsg sg-xxx \
  --vpc.securitygroups sg-yyy
```

Replace the placeholder values with the actual IDs from your AWS account. You can find these IDs in the AWS Console or by running:

```bash
aws ec2 describe-vpcs --filters "Name=tag:Name,Values=ticketing-app-vpc" --query "Vpcs[0].VpcId" --output text
aws ec2 describe-subnets --filters "Name=tag:Name,Values=ticketing-app-public-subnet-1,ticketing-app-public-subnet-2" --query "Subnets[*].SubnetId" --output text
aws ec2 describe-subnets --filters "Name=tag:Name,Values=ticketing-app-private-subnet-1,ticketing-app-private-subnet-2" --query "Subnets[*].SubnetId" --output text
aws ec2 describe-security-groups --filters "Name=tag:Name,Values=ticketing-app-web-sg" --query "SecurityGroups[0].GroupId" --output text
aws ec2 describe-security-groups --filters "Name=tag:Name,Values=ticketing-app-app-sg" --query "SecurityGroups[0].GroupId" --output text
```

## Step 10: Build and Deploy the Application

Build and deploy the application to Elastic Beanstalk:

```bash
npm run build
eb deploy
```

## Step 11: Set Up the Database

Create an RDS PostgreSQL instance:

```bash
aws rds create-db-instance \
  --db-instance-identifier mobile-ticketing-db \
  --db-instance-class db.t3.small \
  --engine postgres \
  --allocated-storage 20 \
  --master-username postgres \
  --master-user-password your_password \
  --vpc-security-group-ids sg-xxx \
  --db-subnet-group-name your_db_subnet_group \
  --db-name ticketing_db \
  --backup-retention-period 7 \
  --tags Key=application,Value=mobile-ticketing-system
```

Replace `sg-xxx` with the database security group ID and `your_db_subnet_group` with your DB subnet group name.

## Step 12: Initialize the Database

Initialize the database schema:

```bash
cd infrastructure
./init-db.sh
```

## Step 13: Load Sample Data (Optional)

Load sample data into the database:

```bash
./load-sample-data.sh
```

## Step 14: Update Environment Variables

Update the Elastic Beanstalk environment variables with the database connection details:

```bash
eb setenv \
  DB_HOST=your_rds_endpoint \
  DB_PORT=5432 \
  DB_NAME=ticketing_db \
  DB_USER=postgres \
  DB_PASSWORD=your_password
```

Replace `your_rds_endpoint` with the actual RDS endpoint and `your_password` with the actual password.

## Step 15: Verify Deployment

Verify that the application is running correctly:

```bash
cd ..
./check-status.sh
```

Access the application URL provided by Elastic Beanstalk:

```bash
eb open
```

## Step 16: Set Up CI/CD (Optional)

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