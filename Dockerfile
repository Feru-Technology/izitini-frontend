FROM node:latest
WORKDIR /usr/src/izitini
COPY . .
RUN yarn install
RUN yarn run build
EXPOSE 4000
CMD ["yarn", "start"]
