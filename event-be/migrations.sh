#!/bin/bash
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL is ready!"

echo "Running migrations..."
python manage.py migrate

echo "Starting the Django server..."
python manage.py runserver 0.0.0.0:8000

exec "$@"
