# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the app's files into the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Add the initialization script
COPY init_backend.sh /init_backend.sh
RUN chmod +x /init_backend.sh

# Start the initialization script
ENTRYPOINT ["/init_backend.sh"]
