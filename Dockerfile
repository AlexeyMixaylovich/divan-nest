FROM node:18.14-alpine

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

RUN npm prune --production

ENV PORT 3000
ENV MONGO_HOST "host.docker.internal"



EXPOSE $PORT

CMD npm run start:prod


# e PORT=3000
