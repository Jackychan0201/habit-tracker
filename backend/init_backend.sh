#!/bin/bash


# Wait for the database to be ready
echo "Waiting for the database to be ready..."
until nc -z -v -w30 db 5432
do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 1
done
echo "PostgreSQL is up and running!"

# Run database migrations
flask db init || echo "Database already initialized."
flask db migrate -m "initial migration"
flask db upgrade

# Start the Flask application
exec python app.py
