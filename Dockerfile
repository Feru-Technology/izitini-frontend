FROM node:14.18.1-alpine
WORKDIR /usr/src/izitini_front-end
COPY . .
RUN npm install yarn
RUN yarn
RUN yarn run build
EXPOSE 4001
CMD ["yarn", "start"]
