#!/bin/bash
current_dir=$(pwd)

## Prepare configuration files
cp docker-compose.local.yml docker-compose.yml
cp .env.local .env

## Setup database
docker-compose up -d postgres
docker-compose up -d data-connector-agent
docker-compose up -d graphql-engine

## Run migrations
cd ./db
make migrate-up
cd "$current_dir"

## Seed database
docker-compose up -d seed 

## Start core and frontend services
docker-compose up -d core
docker-compose up -d frontend


