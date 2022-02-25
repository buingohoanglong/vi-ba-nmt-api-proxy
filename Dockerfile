FROM node:17.6.0-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci --production && npm cache clean --force

COPY . .

EXPOSE $PORT

CMD ["node", "app.js"]