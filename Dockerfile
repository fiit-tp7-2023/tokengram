FROM node:20.10.0

RUN npm install -g pnpm

RUN mkdir -p /usr/local/team07/tokengram/frontend
WORKDIR /usr/local/team07/tokengram/frontend

COPY . .

RUN pnpm install
RUN pnpm build

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]
