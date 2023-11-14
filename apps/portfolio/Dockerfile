FROM node:lts-alpine AS base

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

FROM base AS build

RUN npx nx build portfolio

FROM nginx:stable-alpine AS production

ENV NODE_ENV=production

WORKDIR /usr/share/nginx/html

# Remove default nginx static resources
RUN rm -rf ./*

COPY --from=build /app/dist/apps/portfolio .
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM base AS development

EXPOSE 4200

CMD ["npx", "nx", "serve", "portfolio", "--host", "0.0.0.0"]
