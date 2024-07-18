FROM node:20.15.0-alpine3.19
RUN mkdir /home/app
COPY . /home/app
WORKDIR /home/app
RUN npm install
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "start"]
