#!/bin/bash

# Script to create a NAT Gateway in the correct public subnet

set -e

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

# Get VPC ID
echo "Fetching VPC..."
VPC_ID=$(aws ec2 describe-vpcs \
    --filters "Name=tag:Name,Values=ticketing-app-vpc" \
    --query "Vpcs[0].VpcId" \
    --output text \
    --region $REGION)

if [ -z "$VPC_ID" ]; then
    echo "Error: VPC 'ticketing-app-vpc' not found."
    exit 1
fi

echo "Found VPC: $VPC_ID"

# Get public subnet ID
echo "Fetching public subnet..."
PUBLIC_SUBNET_ID=$(aws ec2 describe-subnets \
    --filters "Name=vpc-id,Values=$VPC_ID" "Name=tag:Name,Values=ticketing-app-public-subnet-1" \
    --query "Subnets[0].SubnetId" \
    --output text \
    --region $REGION)

if [ -z "$PUBLIC_SUBNET_ID" ]; then
    echo "Error: Public subnet 'ticketing-app-public-subnet-1' not found."
    exit 1
fi

echo "Found public subnet: $PUBLIC_SUBNET_ID"

# Check if NAT Gateway already exists
echo "Checking for existing NAT Gateway..."
EXISTING_NAT=$(aws ec2 describe-nat-gateways \
    --filter "Name=vpc-id,Values=$VPC_ID" "Name=state,Values=available,pending" \
    --query "NatGateways[0].NatGatewayId" \
    --output text \
    --region $REGION)

if [ "$EXISTING_NAT" != "None" ] && [ -n "$EXISTING_NAT" ]; then
    echo "NAT Gateway already exists: $EXISTING_NAT"
    
    # Check if it's in the correct subnet
    NAT_SUBNET=$(aws ec2 describe-nat-gateways \
        --nat-gateway-ids $EXISTING_NAT \
        --query "NatGateways[0].SubnetId" \
        --output text \
        --region $REGION)
    
    if [ "$NAT_SUBNET" == "$PUBLIC_SUBNET_ID" ]; then
        echo "NAT Gateway is already in the correct public subnet."
    else
        echo "WARNING: Existing NAT Gateway is in subnet $NAT_SUBNET, not in the public subnet $PUBLIC_SUBNET_ID."
        echo "To fix this, you need to delete the existing NAT Gateway and create a new one in the public subnet."
        
        read -p "Do you want to delete the existing NAT Gateway and create a new one? (y/n): " confirm
        if [[ $confirm == "y" || $confirm == "Y" ]]; then
            echo "Deleting NAT Gateway $EXISTING_NAT..."
            aws ec2 delete-nat-gateway \
                --nat-gateway-id $EXISTING_NAT \
                --region $REGION
            
            echo "Waiting for NAT Gateway to be deleted..."
            aws ec2 wait nat-gateway-deleted \
                --nat-gateway-ids $EXISTING_NAT \
                --region $REGION
            
            echo "NAT Gateway deleted successfully."
            EXISTING_NAT=""
        else
            echo "Keeping existing NAT Gateway. Exiting."
            exit 0
        fi
    fi
fi

if [ -z "$EXISTING_NAT" ]; then
    # Allocate Elastic IP
    echo "Allocating Elastic IP..."
    ALLOCATION_ID=$(aws ec2 allocate-address \
        --domain vpc \
        --tag-specifications "ResourceType=elastic-ip,Tags=[{Key=Name,Value=ticketing-app-nat-eip}]" \
        --query "AllocationId" \
        --output text \
        --region $REGION)
    
    echo "Allocated Elastic IP with allocation ID: $ALLOCATION_ID"
    
    # Create NAT Gateway
    echo "Creating NAT Gateway in public subnet $PUBLIC_SUBNET_ID..."
    NAT_GATEWAY_ID=$(aws ec2 create-nat-gateway \
        --subnet-id $PUBLIC_SUBNET_ID \
        --allocation-id $ALLOCATION_ID \
        --tag-specifications "ResourceType=natgateway,Tags=[{Key=Name,Value=ticketing-app-nat}]" \
        --query "NatGateway.NatGatewayId" \
        --output text \
        --region $REGION)
    
    echo "NAT Gateway creation initiated: $NAT_GATEWAY_ID"
    echo "Waiting for NAT Gateway to become available..."
    
    # Wait for NAT Gateway to be available
    aws ec2 wait nat-gateway-available \
        --nat-gateway-ids $NAT_GATEWAY_ID \
        --region $REGION
    
    echo "NAT Gateway $NAT_GATEWAY_ID is now available."
    
    # Update private route table
    echo "Updating private route table..."
    PRIVATE_ROUTE_TABLE_ID=$(aws ec2 describe-route-tables \
        --filters "Name=vpc-id,Values=$VPC_ID" "Name=tag:Name,Values=ticketing-app-private-rt" \
        --query "RouteTables[0].RouteTableId" \
        --output text \
        --region $REGION)
    
    if [ -z "$PRIVATE_ROUTE_TABLE_ID" ]; then
        echo "Error: Private route table 'ticketing-app-private-rt' not found."
        exit 1
    fi
    
    echo "Found private route table: $PRIVATE_ROUTE_TABLE_ID"
    
    # Check if the route already exists
    EXISTING_ROUTE=$(aws ec2 describe-route-tables \
        --route-table-ids $PRIVATE_ROUTE_TABLE_ID \
        --query "RouteTables[0].Routes[?DestinationCidrBlock=='0.0.0.0/0']" \
        --output text \
        --region $REGION)
    
    if [ -n "$EXISTING_ROUTE" ]; then
        echo "Route already exists. Replacing it..."
        aws ec2 replace-route \
            --route-table-id $PRIVATE_ROUTE_TABLE_ID \
            --destination-cidr-block 0.0.0.0/0 \
            --nat-gateway-id $NAT_GATEWAY_ID \
            --region $REGION
    else
        echo "Creating new route..."
        aws ec2 create-route \
            --route-table-id $PRIVATE_ROUTE_TABLE_ID \
            --destination-cidr-block 0.0.0.0/0 \
            --nat-gateway-id $NAT_GATEWAY_ID \
            --region $REGION
    fi
    
    echo "Private route table updated successfully."
fi

# Display NAT Gateway details
echo "\nNAT Gateway Details:"
aws ec2 describe-nat-gateways \
    --filter "Name=vpc-id,Values=$VPC_ID" "Name=state,Values=available,pending" \
    --query "NatGateways[*].{ID:NatGatewayId,State:State,PublicIP:NatGatewayAddresses[0].PublicIp,PrivateIP:NatGatewayAddresses[0].PrivateIp,SubnetID:SubnetId}" \
    --output table \
    --region $REGION

echo "\nNAT Gateway setup completed successfully!"
echo "You can now proceed with deploying the rest of the infrastructure."