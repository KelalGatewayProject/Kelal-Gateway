#!/bin/bash

# Deploy AWS Backup configuration for Mobile Ticketing System

STACK_NAME="mobile-ticketing-backup"
TEMPLATE_FILE="backup.yml"
REGION="eu-north-1"
APPLICATION_NAME="mobile-ticketing-system"
BACKUP_RETENTION_DAYS=30

# Check if the stack exists
if aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION 2>&1 | grep -q 'Stack with id'; then
    # Update existing stack
    echo "Updating backup stack $STACK_NAME..."
    aws cloudformation update-stack \
        --stack-name $STACK_NAME \
        --template-body file://$TEMPLATE_FILE \
        --parameters \
            ParameterKey=ApplicationName,ParameterValue=$APPLICATION_NAME \
            ParameterKey=BackupRetentionDays,ParameterValue=$BACKUP_RETENTION_DAYS \
        --capabilities CAPABILITY_IAM \
        --region $REGION
    
    # Wait for stack update to complete
    echo "Waiting for stack update to complete..."
    aws cloudformation wait stack-update-complete \
        --stack-name $STACK_NAME \
        --region $REGION
    
    echo "Backup stack update completed successfully!"
else
    # Create new stack
    echo "Creating backup stack $STACK_NAME..."
    aws cloudformation create-stack \
        --stack-name $STACK_NAME \
        --template-body file://$TEMPLATE_FILE \
        --parameters \
            ParameterKey=ApplicationName,ParameterValue=$APPLICATION_NAME \
            ParameterKey=BackupRetentionDays,ParameterValue=$BACKUP_RETENTION_DAYS \
        --capabilities CAPABILITY_IAM \
        --region $REGION
    
    # Wait for stack creation to complete
    echo "Waiting for stack creation to complete..."
    aws cloudformation wait stack-create-complete \
        --stack-name $STACK_NAME \
        --region $REGION
    
    echo "Backup stack creation completed successfully!"
fi

# Output stack outputs
echo "Backup stack outputs:"
aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --query "Stacks[0].Outputs" \
    --region $REGION
