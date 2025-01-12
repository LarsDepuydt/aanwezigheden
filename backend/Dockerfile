FROM node:12.18-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copy package files first to utilize Docker cache
COPY package.json package-lock.json ./

# Install production dependencies and clean up
RUN npm install --production --silent

# Copy the rest of the application code
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]
