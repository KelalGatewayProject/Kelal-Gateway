#!/bin/bash

# Deploy CloudWatch monitoring for Mobile Ticketing System

STACK_NAME="mobile-ticketing-monitoring"
TEMPLATE_FILE="monitoring.yml"
REGION="eu-north-1"
APPLICATION_NAME="mobile-ticketing-system"

# Check if the stack exists
if aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION 2>&1 | grep -q 'Stack with id'; then
    # Update existing stack
    echo "Updating monitoring stack $STACK_NAME..."
    aws cloudformation update-stack \
        --stack-name $STACK_NAME \
        --template-body file://$TEMPLATE_FILE \
        --parameters ParameterKey=ApplicationName,ParameterValue=$APPLICATION_NAME \
        --capabilities CAPABILITY_IAM \
        --region $REGION
    
    # Wait for stack update to complete
    echo "Waiting for stack update to complete..."
    aws cloudformation wait stack-update-complete \
        --stack-name $STACK_NAME \
        --region $REGION
    
    echo "Monitoring stack update completed successfully!"
else
    # Create new stack
    echo "Creating monitoring stack $STACK_NAME..."
    aws cloudformation create-stack \
        --stack-name $STACK_NAME \
        --template-body file://$TEMPLATE_FILE \
        --parameters ParameterKey=ApplicationName,ParameterValue=$APPLICATION_NAME \
        --capabilities CAPABILITY_IAM \
        --region $REGION
    
    # Wait for stack creation to complete
    echo "Waiting for stack creation to complete..."
    aws cloudformation wait stack-create-complete \
        --stack-name $STACK_NAME \
        --region $REGION
    
    echo "Monitoring stack creation completed successfully!"
fi

# Output stack outputs
echo "Monitoring stack outputs:"
aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs" \
    --region $REGION
