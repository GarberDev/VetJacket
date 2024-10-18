FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY vetjacket-app/package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

RUN npm audit fix --force
# Copy the rest of the app
COPY vetjacket-app/ .

# Build the React app
RUN npm run build

# Serve the app (You may need to install 'serve' globally if it's not in your package.json)
RUN npm install -g serve

# Serve the app
CMD ["npx", "serve", "-s", "build"]
