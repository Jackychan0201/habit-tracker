#!/bin/bash

# Run database migrations
flask db init || echo "Database already initialized."
flask db migrate -m "initial migration"
flask db upgrade

# Start the Flask application
exec python app.py
