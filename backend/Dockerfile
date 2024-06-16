
FROM node:21-alpine AS development

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
RUN apk add g++ make py3-pip

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY ./prisma/ ./prisma/
COPY tsconfig*.json ./
COPY ./src ./src

RUN yarn prisma generate
RUN yarn build

FROM node:21-alpine AS production

WORKDIR /app

RUN apk add g++ make py3-pip

COPY ./prisma/ ./prisma/
COPY package.json ./ 
COPY start.sh ./
RUN chmod +x /app/start.sh
COPY yarn.lock ./
RUN yarn

COPY --from=development /app/dist/ ./dist/

EXPOSE 3000

CMD [ "./start.sh" ]