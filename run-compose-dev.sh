#!/bin/bash

# These environment variables are consumed by the docker-compose file.
# We can supply explicit defaults that are checked in with source code 
# since they are only used for local development.
export SECRET_KEY=weather123
export DEBUG=True
export POSTGRES_DB=weather_app_db
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
export API_KEY=$1


docker-compose -f docker_compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec myweatherapp-weather-api-1  python /src/manage.py makemigrations 
docker exec myweatherapp-weather-api-1  python /src/manage.py migrate