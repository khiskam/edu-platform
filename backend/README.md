# Server

REST API для приложения управления задачами на Node.js (Express.js) и TypeScript

## Переменные окружения

Необходимо скопировать файл .env.example в .env (можно сделать, используя команду ниже)

При необходимости можно изменить значения переменных

```
  cp .env.example .env
```

## Docker

Запуск docker-контейнеров в фоновом режиме

```
docker compose up -d
```

Остановка docker-контейнеров

```
docker compose stop
```

## Установка зависимостей

```
yarn
```

## Запуск локально

```
yarn dev
```

## Сборка и запуск

```
yarn build
yarn start
```

## Запуск тестов

```
yarn test
```
