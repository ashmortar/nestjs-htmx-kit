#!/bin/bash

set -euo pipefail

# Colors and Emojis
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
CHECKMARK="\xE2\x9C\x94"
CROSS="\xE2\x9D\x8C"

# Check if .env.example file exists before copying
if [ ! -f .env.example ]; then
  echo -e "${RED}${CROSS} .env.example file not found!${NC}"
  exit 1
fi

# Run database migrations
echo -e "${GREEN}Running database migrations...${NC}"
npm run migrate:deploy > /dev/null

# Seed the database
echo -e "${GREEN}Seeding the database...${NC}"
npm run prisma:seed > /dev/null

# Start the NestJS application in development mode
echo -e "${GREEN}Starting NestJS application in development mode...${NC}"
npm run start:dev

