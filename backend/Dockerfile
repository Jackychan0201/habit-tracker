FROM python:3.9-slim

# Install necessary utilities
RUN apt-get update && apt-get install -y netcat-openbsd dos2unix

# Set the working directory
WORKDIR /app

# Copy all files into the container
COPY . .

# Ensure line endings are converted to LF for init_backend.sh
RUN dos2unix /app/init_backend.sh

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the application port
EXPOSE 5000

# Grant execute permissions for the entrypoint script
RUN chmod +x /app/init_backend.sh

# Set the entrypoint
ENTRYPOINT ["/app/init_backend.sh"]
