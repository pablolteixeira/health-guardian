# Use an official Node.js runtime as a base image
FROM node:20.5

RUN npm install -g npm@10.2.4

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Define the command to run your application
CMD ["npm", "start"]