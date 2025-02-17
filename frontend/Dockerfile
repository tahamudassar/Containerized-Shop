# Use the latest LTS version of Node.js
FROM node:18-alpine

# Install xdg-utils to handle xdg-open
RUN apk add --no-cache xdg-utils

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files (public and src should be included here)
COPY ./public ./public
COPY ./src ./src

# Build the app for production
RUN npm run build

# Install serve globally to serve the build
RUN npm install -g serve

# Expose the port your app runs on
EXPOSE 3000

# Define the command to serve the built app
CMD ["serve", "-s", "build", "-l", "3000"]
