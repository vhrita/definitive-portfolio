# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Production stage
FROM socialengine/nginx-spa:latest

# Copy built application from build stage
COPY --from=build /app/dist /app

# Set proper permissions
RUN chmod -R 755 /app

# Expose port 80
EXPOSE 80