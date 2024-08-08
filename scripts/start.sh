#!/bin/bash

set -euo pipefail

# Colors and Emojis
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
CHECKMARK="\xE2\x9C\x94"
CROSS="\xE2\x9D\x8C"

# Check if .env file exists
if [ ! -f .env ]; then
  echo -e "${RED}${CROSS} .env file not found! Please create one before starting the server.${NC}"
  exit 1
fi

# check if dist/index.js file exists
if [ ! -f dist/main.js ]; then
  echo -e "${RED}${CROSS} dist/index.js file not found! Please build the project before starting the server.${NC}"
  exit 1
fi

# Start the NestJS application in production mode
echo -e "${GREEN}Starting NestJS application in production mode...${NC}"
npm run start:prod
