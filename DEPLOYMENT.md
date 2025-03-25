# Mobile Ticketing System Deployment Guide

This document provides instructions for deploying the Mobile Ticketing System to AWS.

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 18 or later
- Git

## Infrastructure Setup

### VPC and Network Configuration

1. **VPC Setup**
   - VPC CIDR: 10.0.0.0/16
   - Enable DNS hostnames

2. **Subnet Configuration**
   - Public Subnet 1: 10.0.1.0/24 (AZ-a)
   - Public Subnet 2: 10.0.2.0/24 (AZ-b)
   - Private Subnet 1: 10.0.32.0/24 (AZ-a)
   - Private Subnet 2: 10.0.33.0/24 (AZ-b)

3. **Internet Gateway**
   - Create and attach to VPC

4. **NAT Gateway**
   - Create in Public Subnet 1
   - Allocate Elastic IP

5. **Route Tables**
   - Public Route Table: Route 0.0.0.0/0 to Internet Gateway
   - Private Route Table: Route 0.0.0.0/0 to NAT Gateway

### Security Groups

1. **Web Tier Security Group**
   - Inbound: HTTP (80), HTTPS (443), SSH (22) from admin IP
   - Outbound: All traffic

2. **App Tier Security Group**
   - Inbound: Custom TCP (8080) from Web Tier SG, SSH (22) from admin IP
   - Outbound: All traffic

3. **Database Tier Security Group**
   - Inbound: PostgreSQL (5432) from App Tier SG
   - Outbound: All traffic

## Deployment Options

### Option 1: AWS Elastic Beanstalk (Recommended for simplicity)

1. Install EB CLI:
   ```
   pip install awsebcli
   ```

2. Initialize EB application:
   ```
   eb init mobile-ticketing-system --platform node.js --region eu-north-1
   ```

3. Create environment:
   ```
   eb create production-environment --instance_type t3.small --vpc.id vpc-xxx --vpc.elbsubnets subnet-xxx,subnet-yyy --vpc.ec2subnets subnet-zzz,subnet-www --vpc.elbsg sg-xxx --vpc.securitygroups sg-yyy
   ```

4. Deploy application:
   ```
   eb deploy
   ```

### Option 2: AWS EC2 with Auto Scaling

1. Create Launch Template with appropriate AMI and user data script
2. Create Auto Scaling Group using the Launch Template
3. Set up Application Load Balancer
4. Configure Target Groups and Listeners

### Option 3: AWS ECS/EKS (For containerized deployment)

1. Create ECR repository
2. Build and push Docker image
3. Create ECS Cluster or EKS Cluster
4. Define Task Definition and Service
5. Set up Application Load Balancer

### Option 4: AWS Amplify (For frontend deployment)

1. Connect GitHub repository to Amplify
2. Configure build settings
3. Deploy application

## CI/CD Pipeline

1. Set up GitHub repository
2. Configure GitHub Actions workflow (see .github/workflows/deploy.yml)
3. Add AWS credentials as GitHub Secrets
4. Push code to trigger deployment

## Database Setup

1. Create RDS PostgreSQL instance in private subnet
2. Configure security group to allow access from App Tier
3. Initialize database schema

## Monitoring and Logging

1. Set up CloudWatch Alarms for key metrics
2. Configure CloudWatch Logs for application logs
3. Set up X-Ray for distributed tracing

## Troubleshooting

- Check security group configurations
- Verify route table settings
- Review application logs in CloudWatch
- Check health check configuration