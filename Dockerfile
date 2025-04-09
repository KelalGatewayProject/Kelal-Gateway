FROM node:18-alpine as builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install express for the static file server
RUN npm install express

# Create a server file to serve the static files
RUN echo 'const express = require("express");' > server.js && \
    echo 'const path = require("path");' >> server.js && \
    echo 'const app = express();' >> server.js && \
    echo 'const PORT = process.env.PORT || 3000;' >> server.js && \
    echo 'app.use(express.static("dist"));' >> server.js && \
    echo 'app.get("*", (req, res) => {' >> server.js && \
    echo '  res.sendFile(path.resolve(__dirname, "dist", "index.html"));' >> server.js && \
    echo '});' >> server.js && \
    echo 'app.listen(PORT, () => console.log(`Server running on port ${PORT}`));' >> server.js && \
    cat server.js

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
