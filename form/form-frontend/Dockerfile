# Stage 1: Build React app
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the built app
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
