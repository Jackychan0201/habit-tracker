# Step 1: Use a Node.js base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the frontend source code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Install a simple server to serve the built app
RUN npm install -g serve

# Step 8: Expose the port where the React app will run
EXPOSE 3000

# Step 9: Start the app using the 'serve' package
CMD ["serve", "-s", "build", "-l", "3000"]
