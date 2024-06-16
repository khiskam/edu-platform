#!/bin/sh
echo "RUN MIGRATION"
npx prisma migrate deploy
npx prisma db seed
echo "START NODE"
node dist/index.js