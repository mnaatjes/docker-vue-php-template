# Docker Compose - Vue.js - PHP Environment

# 1. Overview

## 1.1 Directory Structure
```
.
├── docker-compose.yml
├── .docker/
│   ├── Dockerfile.php
│   ├── Dockerfile.frontend
│   └── 000-default.conf
├── src/
│   ├── public/
│   │   ├── index.php
│   │   └── ... your Vue.js build output
│   └── backend/
│       └── ... your PHP files
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.js
        └── style.scss
```


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

## 2.1 Index.html

For these files (`~/frontend/src/main.js` & `~/frontend/src/App.vue`) to work, you also need to ensure that your index.php (or index.html) file has an HTML element for the Vue app to mount to.

* The vite build process will automatically detect the entry point in main.js and inject the necessary script tags into this file when you build for production, or serve the content for development.
* **Example `~/src/public/index.html` File:**

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

## 2.2 Workflow


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
* 

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


# Appendix A: Configuration Files

## A.1 Docker-Compose
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


# Appendix B: How-To's and Commands

## B.1 Creating and Compiling Sass Styles



## B.2 Creating and Using Vue.js Components