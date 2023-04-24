FROM node:16-alpine
WORKDIR /app/backend

COPY ./backend/package.json ./
RUN npm install && npm cache clean --force

# WORKDIR /app/backend/dev

COPY ./backend/tsconfig.json ./
COPY ./backend/src ./src

RUN npm run build
CMD ["npm", "run", "start"]


