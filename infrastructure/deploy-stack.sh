#!/bin/bash

# Deploy CloudFormation stack for Mobile Ticketing System infrastructure

STACK_NAME="mobile-ticketing-infrastructure"
TEMPLATE_FILE="cloudformation.yml"
REGION="eu-north-1"

# Check if the stack exists
if aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION 2>&1 | grep -q 'Stack with id'; then
    # Update existing stack
    echo "Updating stack $STACK_NAME..."
    aws cloudformation update-stack \
        --stack-name $STACK_NAME \
        --template-body file://$TEMPLATE_FILE \
        --capabilities CAPABILITY_IAM \
        --region $REGION
    
    # Wait for stack update to complete
    echo "Waiting for stack update to complete..."
    aws cloudformation wait stack-update-complete \
        --stack-name $STACK_NAME \
        --region $REGION
    
    echo "Stack update completed successfully!"
else
    # Create new stack
    echo "Creating stack $STACK_NAME..."
    aws cloudformation create-stack \
        --stack-name $STACK_NAME \
        --template-body file://$TEMPLATE_FILE \
        --capabilities CAPABILITY_IAM \
        --region $REGION
    
    # Wait for stack creation to complete
    echo "Waiting for stack creation to complete..."
    aws cloudformation wait stack-create-complete \
        --stack-name $STACK_NAME \
        --region $REGION
    
    echo "Stack creation completed successfully!"
fi

# Output stack resources
echo "Stack resources:"
aws cloudformation describe-stack-resources \
    --stack-name $STACK_NAME \
    --region $REGION

# Output stack outputs
echo "Stack outputs:"
aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs" \
    --region $REGION