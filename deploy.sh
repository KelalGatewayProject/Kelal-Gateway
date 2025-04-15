#!/bin/bash

# This script deploys the application without AWS dependencies

echo "Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js before deploying."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm before deploying."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Error: Build failed. Please check the logs for more information."
    exit 1
fi

echo "Build successful!"

# Start the application
echo "Starting the application..."
npm start

echo "Deployment complete! The application is now running."
