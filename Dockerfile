FROM node:18-alpine

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Create a simple express server 
RUN npm install express

# Try to build, but continue even if it fails
RUN mkdir -p dist && \
    echo '<!DOCTYPE html><html><head><title>Kelal Gateway</title></head><body><h1>Kelal Gateway</h1><p>Frontend placeholder. Build may be in progress.</p></body></html>' > dist/index.html && \
    (npm run render-build || true)

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Create server.cjs with ES module imports
RUN echo 'import express from "express";' > server.cjs && \
    echo 'import path from "path";' >> server.cjs && \
    echo 'import { fileURLToPath } from "url";' >> server.cjs && \
    echo 'const __filename = fileURLToPath(import.meta.url);' >> server.cjs && \
    echo 'const __dirname = path.dirname(__filename);' >> server.cjs && \
    echo 'const app = express();' >> server.cjs && \
    echo 'const PORT = process.env.PORT || 3000;' >> server.cjs && \
    echo 'app.use(express.static("dist"));' >> server.cjs && \
    echo 'app.get("*", (req, res) => {' >> server.cjs && \
    echo '  res.sendFile(path.resolve(__dirname, "dist", "index.html"));' >> server.cjs && \
    echo '});' >> server.cjs && \
    echo 'app.listen(PORT, () => console.log(`Server running on port ${PORT}`));'

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.cjs"]
