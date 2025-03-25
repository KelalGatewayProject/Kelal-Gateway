#!/bin/bash

# Load sample data for Mobile Ticketing System

# Configuration
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-ticketing_db}
DB_USER=${DB_USER:-postgres}
DB_PASSWORD=${DB_PASSWORD:-postgres}

# Check if psql is installed
if ! command -v psql &> /dev/null; then
    echo "Error: psql is not installed. Please install PostgreSQL client tools."
    exit 1
fi

# Export password for psql
export PGPASSWORD="$DB_PASSWORD"

# Run sample data script
echo "Loading sample data..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f generate-sample-data.sql

if [ $? -ne 0 ]; then
    echo "Error: Failed to load sample data."
    exit 1
fi

echo "Sample data loaded successfully!"
