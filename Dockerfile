FROM node:slim
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]