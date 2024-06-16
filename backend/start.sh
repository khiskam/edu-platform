#!/bin/sh
echo "RUN MIGRATION"
npx prisma migrate deploy
echo "START NODE"
node dist/index.js