FROM node:18-alpine

WORKDIR /app

# Copy all files
COPY . .

# Ensure logs directory exists
RUN mkdir -p logs

# Install dependencies with a fallback for package-lock issues
RUN npm install || npm install --no-package-lock

# Add error handling to server.js
RUN echo "// Error handling" >> server.js && \
    echo "process.on('uncaughtException', err => {" >> server.js && \
    echo "  console.error('Uncaught exception:', err);" >> server.js && \
    echo "  // Keep the process running" >> server.js && \
    echo "});" >> server.js

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start the application with experimental modules flag
CMD ["node", "--experimental-modules", "server.js"]