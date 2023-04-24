# Build React static files
FROM node:16-alpine as build

WORKDIR /app/frontend/

COPY ./docker /app/docker

COPY ./frontend/package*.json /app/frontend/
RUN npm install

COPY ./frontend /app/frontend/
RUN npm run build

# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]


