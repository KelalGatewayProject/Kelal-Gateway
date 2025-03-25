#!/bin/bash

# Database initialization script for Mobile Ticketing System

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

# Check if database exists
if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo "Database $DB_NAME already exists."
else
    echo "Creating database $DB_NAME..."
    psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -c "CREATE DATABASE $DB_NAME;"
    if [ $? -ne 0 ]; then
        echo "Error: Failed to create database."
        exit 1
    fi
    echo "Database created successfully."
fi

# Run migration script
echo "Running database migration script..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f db-migration.sql

if [ $? -ne 0 ]; then
    echo "Error: Failed to run migration script."
    exit 1
fi

echo "Database initialization completed successfully!"
