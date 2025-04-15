#!/bin/bash

# Script to check the status of all deployed resources for Mobile Ticketing System

set -e

echo "=== Mobile Ticketing System Status Check ==="

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

# Set region
REGION="eu-north-1"

# Check CloudFormation stacks
echo "\n=== CloudFormation Stacks ==="
echo "Infrastructure Stack:"
aws cloudformation describe-stacks \
    --stack-name mobile-ticketing-infrastructure \
    --query "Stacks[0].{Name:StackName,Status:StackStatus,CreationTime:CreationTime,LastUpdated:LastUpdatedTime}" \
    --output table \
    --region $REGION 2>/dev/null || echo "Infrastructure stack not found."

echo "Monitoring Stack:"
aws cloudformation describe-stacks \
    --stack-name mobile-ticketing-monitoring \
    --query "Stacks[0].{Name:StackName,Status:StackStatus,CreationTime:CreationTime,LastUpdated:LastUpdatedTime}" \
    --output table \
    --region $REGION 2>/dev/null || echo "Monitoring stack not found."

echo "Backup Stack:"
aws cloudformation describe-stacks \
    --stack-name mobile-ticketing-backup \
    --query "Stacks[0].{Name:StackName,Status:StackStatus,CreationTime:CreationTime,LastUpdated:LastUpdatedTime}" \
    --output table \
    --region $REGION 2>/dev/null || echo "Backup stack not found."

# Check Elastic Beanstalk environment
echo "\n=== Elastic Beanstalk Environment ==="
eb status 2>/dev/null || echo "Elastic Beanstalk environment not found or eb CLI not configured."

# Check NAT Gateway
echo "\n=== NAT Gateway ==="
aws ec2 describe-nat-gateways \
    --filter "Name=tag:Name,Values=ticketing-app-nat" \
    --query "NatGateways[*].{ID:NatGatewayId,State:State,PublicIP:NatGatewayAddresses[0].PublicIp,PrivateIP:NatGatewayAddresses[0].PrivateIp,SubnetID:SubnetId}" \
    --output table \
    --region $REGION 2>/dev/null || echo "NAT Gateway not found."

# Check Route Tables
echo "\n=== Route Tables ==="
echo "Public Route Table:"
aws ec2 describe-route-tables \
    --filters "Name=tag:Name,Values=ticketing-app-public-rt" \
    --query "RouteTables[*].{ID:RouteTableId,VPC:VpcId,Routes:Routes[*].{Destination:DestinationCidrBlock,Target:GatewayId||NatGatewayId||TransitGatewayId||VpcPeeringConnectionId||NetworkInterfaceId||InstanceId}}" \
    --output table \
    --region $REGION 2>/dev/null || echo "Public route table not found."

echo "Private Route Table:"
aws ec2 describe-route-tables \
    --filters "Name=tag:Name,Values=ticketing-app-private-rt" \
    --query "RouteTables[*].{ID:RouteTableId,VPC:VpcId,Routes:Routes[*].{Destination:DestinationCidrBlock,Target:GatewayId||NatGatewayId||TransitGatewayId||VpcPeeringConnectionId||NetworkInterfaceId||InstanceId}}" \
    --output table \
    --region $REGION 2>/dev/null || echo "Private route table not found."

# Check CloudWatch Alarms
echo "\n=== CloudWatch Alarms ==="
aws cloudwatch describe-alarms \
    --alarm-name-prefix "mobile-ticketing" \
    --query "MetricAlarms[*].{Name:AlarmName,State:StateValue,Metric:MetricName,Threshold:Threshold,Statistic:Statistic}" \
    --output table \
    --region $REGION 2>/dev/null || echo "No CloudWatch alarms found."

# Check AWS Backup
echo "\n=== AWS Backup ==="
aws backup list-backup-plans \
    --query "BackupPlansList[?BackupPlanName=='mobile-ticketing-system-backup-plan'].{ID:BackupPlanId,Name:BackupPlanName,Version:VersionId,CreationDate:CreationDate}" \
    --output table \
    --region $REGION 2>/dev/null || echo "No backup plans found."

echo "\n=== Status Check Completed ==="