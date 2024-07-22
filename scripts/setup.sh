# usr/bin/sh

cp .env.example .env

npm ci

npx prisma db push

npx prisma db seed