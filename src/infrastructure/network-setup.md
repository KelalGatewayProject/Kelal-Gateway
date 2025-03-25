# Network Infrastructure Setup for Mobile Ticketing System

## VPC Configuration

1. **Create a new VPC**
   - Name: `ticketing-app-vpc`
   - CIDR Block: `10.0.0.0/16`
   - Enable DNS hostnames: Yes

2. **Create Subnets**
   - Public Subnet 1: `10.0.1.0/24` (AZ-a)
   - Public Subnet 2: `10.0.2.0/24` (AZ-b)
   - Private Subnet 1: `10.0.32.0/24` (AZ-a)
   - Private Subnet 2: `10.0.33.0/24` (AZ-b)

3. **Create Internet Gateway**
   - Name: `ticketing-app-igw`
   - Attach to VPC: `ticketing-app-vpc`

4. **Create Route Tables**
   - Public Route Table:
     - Name: `ticketing-app-public-rt`
     - Routes:
       - `10.0.0.0/16` -> `local`
       - `0.0.0.0/0` -> `Internet Gateway`
     - Associate with public subnets
   
   - Private Route Table:
     - Name: `ticketing-app-private-rt`
     - Routes:
       - `10.0.0.0/16` -> `local`
     - Associate with private subnets

5. **Create NAT Gateway** (for private subnets to access internet)
   - Name: `ticketing-app-nat`
   - Subnet: **Public Subnet 1** (IMPORTANT: NAT Gateway must be in a public subnet, not Private Subnet 1)
   - Connectivity type: Public
   - Allocate Elastic IP
   - Add route in private route table: `0.0.0.0/0` -> `NAT Gateway`

   > **CRITICAL NOTE**: The NAT Gateway MUST be created in a public subnet (e.g., Public Subnet 1), NOT in a private subnet. This is because the NAT Gateway needs direct internet access through the Internet Gateway to allow instances in private subnets to access the internet while remaining protected from direct internet access.

## Security Configuration

1. **Create Security Groups**
   - Web Tier Security Group:
     - Name: `ticketing-app-web-sg`
     - Inbound Rules:
       - HTTP (80) from anywhere (0.0.0.0/0)
       - HTTPS (443) from anywhere (0.0.0.0/0)
       - SSH (22) from admin IP only (specify your admin IP, e.g., 203.0.113.1/32)
     - Outbound Rules:
       - All traffic to anywhere (0.0.0.0/0)

   - App Tier Security Group:
     - Name: `ticketing-app-app-sg`
     - Inbound Rules:
       - Custom TCP (8080) from Web Tier SG only (source: ticketing-app-web-sg)
       - SSH (22) from admin IP only (same as above)
     - Outbound Rules:
       - All traffic to anywhere (0.0.0.0/0)

   - Database Tier Security Group:
     - Name: `ticketing-app-db-sg`
     - Inbound Rules:
       - PostgreSQL (5432) from App Tier SG only (source: ticketing-app-app-sg)
     - Outbound Rules:
       - All traffic to anywhere (0.0.0.0/0)

## Network ACLs

1. **Public Subnet NACL**
   - Name: `ticketing-app-public-nacl`
   - Inbound Rules:
     - Allow HTTP/HTTPS from anywhere
     - Allow ephemeral ports from anywhere
   - Outbound Rules:
     - Allow all traffic to anywhere

2. **Private Subnet NACL**
   - Name: `ticketing-app-private-nacl`
   - Inbound Rules:
     - Allow traffic from VPC CIDR
   - Outbound Rules:
     - Allow all traffic to anywhere

## VPC Endpoints

For secure access to AWS services without going through the internet:

1. **S3 Gateway Endpoint**
   - Name: `ticketing-app-s3-endpoint`
   - Service: S3
   - Route Tables: Both public and private

2. **DynamoDB Gateway Endpoint** (if using DynamoDB)
   - Name: `ticketing-app-dynamodb-endpoint`
   - Service: DynamoDB
   - Route Tables: Both public and private

## Monitoring and Logging

1. **Enable VPC Flow Logs**
   - Log Destination: CloudWatch Logs
   - Log Group: `/vpc/ticketing-app-flow-logs`
   - Retention: 30 days

## Deployment Architecture

The application will be deployed across multiple tiers:

1. **Web Tier** (Public Subnets)
   - Load Balancer
   - Web Servers

2. **Application Tier** (Private Subnets)
   - App Servers
   - Cache Servers

3. **Database Tier** (Private Subnets)
   - Database Servers
   - Backup Systems

This network architecture provides security, scalability, and high availability for the mobile ticketing application.