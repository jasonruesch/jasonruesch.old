FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npx", "nx", "serve", "portfolio", "--host", "0.0.0.0"]
