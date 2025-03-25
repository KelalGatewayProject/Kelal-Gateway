#!/bin/bash

# Cleanup script for Mobile Ticketing System

set -e

echo "=== Mobile Ticketing System Cleanup ==="
echo "This script will delete all resources created for the Mobile Ticketing System."
echo "WARNING: This action is irreversible and will result in data loss!"

# Confirm cleanup
read -p "Are you sure you want to proceed with cleanup? (yes/no): " confirm
if [[ $confirm != "yes" ]]; then
    echo "Cleanup aborted."
    exit 0
fi

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

# Delete Elastic Beanstalk environment
echo "\n=== Deleting Elastic Beanstalk Environment ==="
eb terminate --force

# Delete CloudFormation stacks
echo "\n=== Deleting CloudFormation Stacks ==="

# Delete backup stack
echo "Deleting backup stack..."
aws cloudformation delete-stack \
    --stack-name mobile-ticketing-backup \
    --region $REGION

# Delete monitoring stack
echo "Deleting monitoring stack..."
aws cloudformation delete-stack \
    --stack-name mobile-ticketing-monitoring \
    --region $REGION

# Wait for stacks to be deleted
echo "Waiting for stacks to be deleted..."
aws cloudformation wait stack-delete-complete \
    --stack-name mobile-ticketing-backup \
    --region $REGION

aws cloudformation wait stack-delete-complete \
    --stack-name mobile-ticketing-monitoring \
    --region $REGION

# Delete main infrastructure stack
echo "Deleting infrastructure stack..."
aws cloudformation delete-stack \
    --stack-name mobile-ticketing-infrastructure \
    --region $REGION

echo "Waiting for infrastructure stack to be deleted..."
aws cloudformation wait stack-delete-complete \
    --stack-name mobile-ticketing-infrastructure \
    --region $REGION

echo "\n=== Cleanup Completed Successfully! ==="
echo "All resources for the Mobile Ticketing System have been deleted."
