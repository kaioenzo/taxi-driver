# Stage 1: Building the app
FROM node:22-alpine AS builder

# Set the working directory in the Docker container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm ci

COPY . .

ARG GOOGLE_API_KEY
ARG NEXT_PUBLIC_BACKEND_URL # Add this line

# Append the variables to .env.production
RUN echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${GOOGLE_API_KEY}" >> .env.production
RUN echo "NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}" >> .env.production # Append the backend URL

# Build the Next.js application
RUN npm run build

# Stage 2: Run the app in production mode
FROM node:22-alpine AS runner
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/app ./app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port Next.js runs on
EXPOSE 3001

# Command to run the app
CMD ["npm", "start"]