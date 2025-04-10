FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pm2 && \
    npm install

COPY . .

# Ensure logs directory exists
RUN mkdir -p logs

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

# Use PM2 to run the server
CMD ["pm2-runtime", "start", "server.cjs", "--name", "kelal-gateway"]