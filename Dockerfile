FROM node:20 as build

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm install --production

COPY . .

RUN npm run build

#run server
FROM nginx

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]