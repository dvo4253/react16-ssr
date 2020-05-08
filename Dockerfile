FROM node:10.20.1

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build
EXPOSE 8000

CMD ["npm", "run", "start"]
