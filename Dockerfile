FROM node:13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm audit fix
COPY . .
EXPOSE 80
CMD [ "npm", "run", "deploy" ]