FROM node:latest
WORKDIR /usr/src/izitini
COPY . .
RUN yarn install
RUN yarn run build
EXPOSE 3000
CMD ["yarn", "start"]
