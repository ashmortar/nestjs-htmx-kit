#!/bin/bash

set -euo pipefail

# Colors and Emojis
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
CHECKMARK="\xE2\x9C\x94"
CROSS="\xE2\x9D\x8C"

# Progress dots function
progress_dots() {
  local pid=$!
  while kill -0 $pid 2>/dev/null; do
    printf "${GREEN}.${NC}"
    sleep 1
  done
  echo
}

# Check if .env.example file exists before copying
if [ ! -f .env.example ]; then
  echo -e "${RED}${CROSS} .env.example file not found!${NC}"
  exit 1
fi

# Copy the example environment file to the .env file
echo -e "${GREEN}Copying .env.example to .env...${NC}"
cp .env.example .env

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm ci > /dev/null 2>&1 & progress_dots

# Run database migrations
echo -e "${GREEN}Running database migrations...${NC}"
npm run migrate:deploy

# Seed the database
echo -e "${GREEN}Seeding the database...${NC}"
npm run prisma:seed

# Prompt the user to start the server
echo -e "${GREEN}${CHECKMARK} Setup complete. Start the server?${NC}"

while true; do
  read -p "Press y to continue, or any other key to exit... " -n1 -s key
  echo # move to a new line

  if [ "$key" = "y" ]; then
    echo -e "${GREEN}Starting the development server...${NC}"
    npm run start:dev
    break
  else
    echo -e "${RED}${CROSS} Exiting...${NC}"
    exit 0
  fi
done
