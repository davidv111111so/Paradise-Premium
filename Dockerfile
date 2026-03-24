# Use an official Node runtime as a parent image
FROM node:20-slim

# Install a lightweight static file server
RUN npm install -g serve

# Set the working directory to the dist folder
WORKDIR /app/dist

# Copy the build output
COPY dist /app/dist

# Expose port
EXPOSE 8080

# Command to run the static server from the current directory
CMD ["serve", "-s", ".", "-l", "8080"]
