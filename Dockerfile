# Use the official Node.js image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --include=dev

# Copy the rest of the project files to the container
COPY . .

# Build the TypeScript code
RUN npm run tsc

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
