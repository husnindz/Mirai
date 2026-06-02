# Use official Node.js alpine base image
FROM node:20-alpine

# Set environment variables
ENV NODE_ENV=production

# Set work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only (no devDependencies)
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Expose backend port
EXPOSE 3000

# Command to run database migrations and then start the server
CMD ["sh", "-c", "npm run db:up && npm run start"]
