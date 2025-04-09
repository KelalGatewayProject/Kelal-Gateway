FROM node:18-alpine

WORKDIR /app

# Copy all files
COPY . .

# Ensure logs directory exists
RUN mkdir -p logs

# Install dependencies with a fallback for package-lock issues
RUN npm install || npm install --no-package-lock

# Create a simple fallback route in case the app fails
RUN echo "// Fallback route" >> server.js && \
    echo "process.on('uncaughtException', err => {" >> server.js && \
    echo "  console.error('Uncaught exception:', err);" >> server.js && \
    echo "  // Keep the process running" >> server.js && \
    echo "});" >> server.js

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]