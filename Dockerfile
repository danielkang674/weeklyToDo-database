FROM node:8.11

WORKDIR /weekly

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

ENV PORT 3001
EXPOSE 3001

CMD ["npm", "run", "prod"]