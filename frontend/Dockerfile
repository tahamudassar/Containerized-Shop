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

# Copy the rest of your application files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["sh", "-c", "BROWSER=none npm start"]