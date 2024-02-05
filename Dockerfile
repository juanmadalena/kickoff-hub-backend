# Use last node version
FROM node:latest

# workdir
WORKDIR /usr

# Copy dependency files and configuration file
COPY package*.json ./
COPY tsconfig.json ./

# COPY .env .env

# Install dependencies
RUN npm install

# Copy all the files
COPY . .

# Compile typescript files to javascript
RUN npm run tsc

# Expose the port where the application runs
EXPOSE 8020

# Run the application
CMD ["npm", "start"]
