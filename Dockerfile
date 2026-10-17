FROM node:26.12.0

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build
EXPOSE 8000

CMD ["npm", "run", "start"]
