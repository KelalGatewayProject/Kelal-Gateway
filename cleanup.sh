#!/bin/bash

# This script cleans up temporary files and build artifacts

echo "Starting cleanup process..."

# Remove build artifacts
echo "Removing build artifacts..."
rm -rf dist

# Remove node_modules (optional)
read -p "Do you want to remove node_modules? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Removing node_modules..."
    rm -rf node_modules
    echo "node_modules removed."
fi

# Clean npm cache (optional)
read -p "Do you want to clean npm cache? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleaning npm cache..."
    npm cache clean --force
    echo "npm cache cleaned."
fi

echo "Cleanup complete!"
