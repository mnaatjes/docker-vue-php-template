# Docker Compose - Vue.js - PHP Environment

# 1. Overview

This project provides a complete development environment using Docker Compose for a web application with a Vue.js frontend and a PHP backend.

* The environment is configured to facilitate a smooth development workflow with features like live compilation for Sass and hot-reloading for Vue.js. 
* The frontend and backend services run in separate Docker containers, allowing for clear separation of concerns.

## 1.1 Directory Structure
```
.
├── docker-compose.yml
│
├── .docker/
│   ├── Dockerfile.php
│   ├── Dockerfile.frontend
│   └── 000-default.conf
│
├── src/
│   ├── public/
│   │   ├── index.php
│   │   └── ... 
│   └── backend/
│       └── ... PHP files
│
├── frontend/
│   ├── node_modules/ ... Created by Dockerfile.frontend
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.js
│       ├── App.vue
│       ├── components/ ...Vue Components
│       ├── styles/
│       └── main.scss
│
├── docs/
│
├── logs/
│
└── .gitignore
```

## 1.2 Getting Started

This section outlines the minimal steps required to get the development environment up and running.

## 1.2.1 Prerequisites

Make sure you have Docker and Docker Compose installed on your system.

## 1.2.2 Installation

* **Clone Repository:** 
```bash
  git clone https://github.com/mnaatjes/docker-vue-php-template.git
  cd docker-vue-php-template
```

* **Build and Run Containers:**
```bash
  docker compose up --build -d
```
* **This command will:**
  * Build the frontend container using Dockerfile.frontend.
  * Build the php container using Dockerfile.php.
  * Start the npm run dev command in the frontend container.
  * Start the Apache server in the php container.

* **Access the application::**
  * Open your web browser and navigate to http://localhost:8085 to see the running application. 
  * The Vue.js application will be rendered inside the index.php file.


---


# 2.0 Vue.js

* **Overview and Concepts:**

## 2.1 Entry Point: Main.js

The `~/frontend/src/main.js` file is the entry point of your Vue.js application. 
* It's the first file that gets executed when the app loads. 
* Its primary job is to create the Vue app instance, import the main component (typically App.vue), and mount it to a specific HTML element in your index.php file.
* **Example `~/frontend/src/main.js` File:**

```js
  /**
   * @file ~/frontend/src/main.js
   * @description The main entry point for the Vue.js application. This file imports the root Vue component,
   * initializes the application instance, and mounts it to the DOM. It also imports the main SCSS file
   * for global styling.
   * @module Main
   */
  import { createApp } from 'vue' // Imports the function to create a Vue app
  import App from './App.vue'     // Imports the main component
  import './main.scss';           // Imports main sass file

  // Creates the Vue application instance
  const app = createApp(App);

  // Mounts the app to the HTML element with the ID 'app'
  app.mount('#app');
```

## 2.2 App.vue Root Component

The `~/frontend/src/App.vue` file is the root component of your application. 
* It acts as the container for all other components and defines the main layout and functionality of your app. 
* A Vue component file has three main sections: <template>, <script>, and <style>.
* **Example `~/frontend/src/App.vue` File:**

```vue
  <template>
    <div id="vue-app">
      <h1>Hello from Vue.js!</h1>
      <p>This is your main application component.</p>
      <button @click="incrementCount">Click me</button>
      <p>Button was clicked {{ count }} times.</p>
      
      <Table :data="tableData" />
      
    </div>
  </template>

  <script>
  import { ref } from 'vue';
  // Import the new Table component
  import Table from './components/Table.vue';

  export default {
    // Register the component
    components: {
      Table
    },
    setup() {
      const count = ref(0);
      
      // Sample data for the table
      const tableData = ref([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
      ]);
      
      const incrementCount = () => {
        count.value++;
      };

      return {
        count,
        incrementCount,
        tableData
      };
    }
  };
  </script>

  <style lang="scss">
  @use 'sass:color';

  #vue-app {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 60px;
    h1 {
      color: #42b983;
    }
    button {
      background-color: #42b983;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 0.3s;
      &:hover {
        background-color: color.adjust(#42b983, $lightness: -10%);
      }
    }
  }
  </style>
```

## 2.4 Index.php

For these files (`~/frontend/src/main.js` & `~/frontend/src/App.vue`) to work, you also need to ensure that your index.php (or index.html) file has an HTML element for the Vue app to mount to.

* The vite build process will automatically detect the entry point in main.js and inject the necessary script tags into this file when you build for production, or serve the content for development.
* **Example `~/src/public/index.php` File:**

```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Docker App</title>
  </head>
  <body>
      <div id="app"></div> <h1>Hello from PHP!</h1>
      
      <script type="module" src="http://localhost:5173/@vite/client"></script>
      <script type="module" src="http://localhost:5173/src/main.js"></script>
  </body>
  </html>
```

---


# 3.0 Sass

* **Build Process Overview:**
The frontend container uses Vite, which is a modern frontend build tool. Vite is configured to handle both Vue.js components and Sass files automatically.

* When you run npm run dev in the frontend container, Vite starts a development server.
* This server watches your frontend/src directory for changes.
* Whenever you save a .scss or .vue file, Vite automatically compiles the Sass into CSS and hot-reloads your application in the browser.
* This means you can simply write your Sass code and save the file—the build tool handles the rest. This process is called "live compilation" or "hot-reloading," which is a key benefit of using a tool like Vite.

## 3.1 Creating Sass Files
* Create Sass document within `~/frontend/styles/...` Directory (See Below)
* Import the main Sass file into Vue.js application file `~/frontend/src/main.js`

* **Example SASS Directory Structure:**

```
/frontend/
├── src/
│   ├── main.js
│   ├── App.vue
│   └── styles/
│       ├── _variables.scss
│       ├── _mixins.scss
│       └── main.scss
```


---


# 4.0 PHP Backend

This project is configured to serve PHP files using the Apache web server within the php container.

* File Location: All PHP files should be placed inside the src/backend/ directory.
* Web Root: The Apache server's document root is set to /var/www/html/src/public via the 000-default.conf file. This means files in the src/public directory are directly accessible by the web server.
* PHP Configuration: The Dockerfile.php includes common PHP extensions like pdo_mysql, gd, mbstring, and zip, along with the Composer dependency manager.


---


# Appendix A: Configuration Files

## A.1 Docker-Compose.yml
```yml
version: '3.8'

services:
  php:
    build:
      context: .
      dockerfile: ./.docker/Dockerfile.php
    container_name: php
    ports:
      - "8085:80"
    volumes:
      - ./src/public:/var/www/html
    depends_on:
      - frontend

  frontend:
    build:
      context: .
      dockerfile: ./.docker/Dockerfile.frontend
    container_name: frontend
    volumes:
      - ./frontend:/app
      - /app/node_modules # Prevents host files from overwriting the container's dependencies
    ports:
      - "5173:5173"
    command: npm run dev
    tty: true
```

## A.2 Dockerfiles and Configuration Files in .docker/

### A.2.1 Dockerfile.frontend
```bash
  FROM node:18-alpine

  WORKDIR /app

  # Copy all project files to the container
  COPY ./frontend .

  # Install project dependencies
  RUN npm install

  EXPOSE 5173

  CMD ["npm", "run", "dev"]


```

### A.2.3 Dockerfile.php
```bash
  FROM php:8.1-apache

  # Install system dependencies
  RUN apt-get update && apt-get install -y \
      git \
      libzip-dev \
      unzip \
      libpng-dev \
      libjpeg-dev \
      libonig-dev \
      libxml2-dev \
      && rm -rf /var/lib/apt/lists/*

  # Install PHP extensions
  RUN docker-php-ext-install pdo pdo_mysql gd mbstring zip

  # Install Composer
  COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

  WORKDIR /var/www/html

```

### A.2.3 000-default.conf
```bash
  <VirtualHost *:80>
      ServerAdmin webmaster@localhost
      DocumentRoot /var/www/html/src/public

      ErrorLog ${APACHE_LOG_DIR}/error.log
      CustomLog ${APACHE_LOG_DIR}/access.log combined

      <Directory /var/www/html/src/public>
          Options Indexes FollowSymLinks
          AllowOverride All
          Require all granted
      </Directory>
  </VirtualHost>

```

## A.3 Vite Configuration

## A.3.1 Vite Config File

* **Location:** `~/src/vite.config.js`

```js
  import { fileURLToPath, URL } from 'node:url'
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'

  export default defineConfig({
    plugins: [
      vue(),
    ],
    build: {
      outDir: '../src/public', // This is important!
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true, // This allows the container to be accessed from the host machine
      origin: 'http://localhost:8085'
    }
  })

```

## A.3.2 Package.json with Vite

* **Location:** `~/src/package.json`

```json
  {
    "name": "my-frontend-app",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "devDependencies": {
      "@vitejs/plugin-vue": "^4.2.3",
      "sass": "^1.66.1",
      "vite": "^4.4.5",
      "vue": "^3.3.4"
    }
  }

```


---


# Appendix B: How-To's and Help

## B.1 Changing the Port Number
Changing the port to view the application requires modifying the docker-compose.yml file. You also need to check for port conflicts and select a valid port number.


### B.1.0 Overview and Common Tasks in Workflow:
This section contains commands and file locations common to all Service port changes.

* **View all running Docker Containers and their ports:**
```bash
  docker ps 
  docker compose ps
```

* **Choose a Port Number:**
  * An acceptable range of ports to use are unregistered, non-system ports, typically ranging from 1024 to 49151. 
  * A common practice for web development is to use ports in the 3000-9000 range, such as 3000, 8000, or 8080, as they are less likely to be in use.

* **Change Port in `~/docker-compose/yml`:**
  * To change the port for your application, you need to edit the ports mapping for the php service in your docker-compose.yml file. 
  * The format is HOST_PORT:CONTAINER_PORT
  * Find the port number in the associated service
  * **Modified file:**
  ```yaml
    version: '3.8'

  services:
    php:
      build:
        context: .
        dockerfile: ./.docker/Dockerfile.php
      container_name: php
      ports:
        - "8000:80"  # <--- Change this line
    ```

### B.1.1 PHP Service Port Change

Contains files and commands specific to altering the PHP Service Port Number

  * **Modify docker-compose.yml under PHP Service:**
  ```yaml
    version: '3.8'

  services:
    php:
      build:
        context: .
        dockerfile: ./.docker/Dockerfile.php
      container_name: php
      ports:
        - "8000:80"  # <--- Change this line
    ```

* **Update the Vite Configuration:**
  * Since your frontend service (Vite dev server) depends on the php service, you must also update the vite.config.js file to reflect the new host port for hot module reloading and correct asset serving.
  * **Modified `~/frontend/vite.config.js` File:**
  ```js
    server: {
      host: true,
      origin: 'http://localhost:8000' # <--- Change this line
    }
  ```

* **Rebuild and Run Containers:**

```bash
  docker compose up --build -d
```

Your PHP Service will now be accessible at http://localhost:8000.

### B.1.1 Frontend Service Port Change
Changing port mapping in docker-compose.yml and index.php

* To change the port, simply change the first number in the ports mapping. The container port 5173 must remain unchanged as it's the internal port used by Vite. Let's change the host port to 3000.
* **Modify docker-compose.yml:**
```yml
  services:
    frontend:
      build:
        context: .
        dockerfile: ./.docker/Dockerfile.frontend
      container_name: frontend
      volumes:
        - ./frontend:/app
        - /app/node_modules # Prevents host files from overwriting the container's dependencies
      ports:
        - "3000:5173" # <--- Change this line
      command: npm run dev
      tty: true
```

* **Modify the `~/src/public/index.php` file directly** 
  * The index file references the web service port to load the Vue.js application. 
  * You must update these references to use your new port.
  * **Modified Index.php File:**
  ```html
    <body>
      <div id="app"></div> <h1>Hello from PHP!</h1>

      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/src/main.js"></script>
  </body>
  ```

* **Rebuild Application:**
```bash
  docker compose up --build -d
```

---


# Appendix C: Managing Docker Containers

## C.1 Basic Commands

* **Start Services in background:**
```bash
  docker compose up -d
```

* **Build Services in Background:**
```bash
  docker compose up --build -d
```

* **Stop Services:**
```bash
  docker compose down
```

* **View Logs:**
```bash
  docker compose logs -f
```

## C.2 Exec Commands

Runs a command in an existing, running container. The command shares the environment and filesystem of the running service.

* **Traverse Containers:**
Traverse container directories: To get an interactive shell to explore the container's filesystem, use a command like sh or bash.

```bash
  docker compose exec frontend sh
```

* **One Off List:**
This will open a shell in the frontend container, allowing you to cd and ls the directories.
  * Run a one-off command: You can execute any command inside the running service.

```bash
  docker compose exec php ls -l /var/www/html
```

* **Run as Different User:**
Run as a different user: Use the --user or -u flag to run the command as a specific user.

```bash
  docker compose exec --user root frontend npm install
```

* **Docker Compose Run:**
Starts a new, independent container for a one-time command. 
  * This is useful for tasks that are not part of the main service lifecycle, like database migrations or running tests. 
  * The new container is configured with the same volumes and network settings as the service in the docker-compose.yml file, but it doesn't expose the service's ports by default.

```bash
  # Example: run a migration script in a new container
  docker compose run --rm backend php artisan migrate  
```

## C.3 Other Useful Commands

* **List Containers and Services:**
Lists the containers and services managed by Docker Compose, showing their status, ports, and names.

```bash
  docker compose ps
  docker compose ps -a
```

* **Logs:**
Follows the log output of all services in real-time. You can also specify a service name to filter the logs.

```bash
  # View all logs
  docker compose logs -f

  # View logs for a specific service
  docker compose logs -f frontend
```

* **Build Specific Service Images:**
Builds or rebuilds the service images. This is necessary if you've made changes to a Dockerfile.

```bash
  # Build all services
  docker compose build

  # Build a specific service
  docker compose build frontend
```

* **Force Recreate:**
Forces Docker Compose to stop and recreate all containers, even if their configuration hasn't changed. This can be useful for troubleshooting.

```bash
  docker compose up --force-recreate
```