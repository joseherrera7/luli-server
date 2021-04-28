FROM node:latest as node

WORKDIR /usr/src/app

COPY package*.json ./

# Instala y construye el Angular App
RUN npm install --production
#RUN npm run build --prod
#RUN mv /app/dist/${APP}/* /app/dist/

COPY . .

# Angular app construida, la vamos a hostear un server production, este es Nginx

#FROM nginx:1.13.8-alpine

CMD [ "node", "bin/www" ]

#COPY --from=node /app/dist/ /usr/share/nginx/html
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf