#!/bin/bash

# Script to update private route table to route internet traffic through NAT Gateway

# Configuration
NAT_GATEWAY_ID="nat-01c78ab32f08899a7"
REGION="eu-north-1"

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

# Use the specific private route table ID
echo "Using specified private route table..."
PRIVATE_ROUTE_TABLES="rtb-01140cb50883e6f78" # ticketing-app-vpc-rtb-public

if [ -z "$PRIVATE_ROUTE_TABLES" ]; then
    echo "Error: Private route table ID is not set."
    exit 1
fi

# Update each private route table
for ROUTE_TABLE_ID in $PRIVATE_ROUTE_TABLES; do
    echo "Updating route table $ROUTE_TABLE_ID to route internet traffic through NAT Gateway $NAT_GATEWAY_ID..."
    
    # Check if the route already exists
    EXISTING_ROUTE=$(aws ec2 describe-route-tables \
        --route-table-ids $ROUTE_TABLE_ID \
        --query "RouteTables[0].Routes[?DestinationCidrBlock=='0.0.0.0/0']" \
        --output text \
        --region $REGION)
    
    if [ -n "$EXISTING_ROUTE" ]; then
        echo "Route already exists. Replacing it..."
        aws ec2 replace-route \
            --route-table-id $ROUTE_TABLE_ID \
            --destination-cidr-block 0.0.0.0/0 \
            --nat-gateway-id $NAT_GATEWAY_ID \
            --region $REGION
    else
        echo "Creating new route..."
        aws ec2 create-route \
            --route-table-id $ROUTE_TABLE_ID \
            --destination-cidr-block 0.0.0.0/0 \
            --nat-gateway-id $NAT_GATEWAY_ID \
            --region $REGION
    fi
    
    if [ $? -eq 0 ]; then
        echo "Route table $ROUTE_TABLE_ID updated successfully."
    else
        echo "Error: Failed to update route table $ROUTE_TABLE_ID."
        exit 1
    fi
done

# Verify the route tables
echo "Verifying route tables..."
for ROUTE_TABLE_ID in $PRIVATE_ROUTE_TABLES; do
    echo "Routes for $ROUTE_TABLE_ID:"
    aws ec2 describe-route-tables \
        --route-table-ids $ROUTE_TABLE_ID \
        --query "RouteTables[0].Routes" \
        --output table \
        --region $REGION
done

echo "Private route tables have been updated to route internet traffic through NAT Gateway $NAT_GATEWAY_ID."